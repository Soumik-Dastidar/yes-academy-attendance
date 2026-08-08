'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markAttendance(
  batchId: string, 
  classSessionId: string, 
  studentId: string, 
  status: 'Present' | 'Absent' | 'Leave'
) {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    // Upsert the attendance record
    const { error } = await supabase
      .from('attendance_records')
      .upsert({
        class_session_id: classSessionId,
        student_id: studentId,
        status: status,
        marked_by_user_id: user.id,
        marked_at: new Date().toISOString()
      }, {
        onConflict: 'class_session_id, student_id'
      })

    if (error) throw new Error(error.message)

    // Log the action
    await supabase.from('audit_log').insert({
      user_id: user.id,
      action_type: 'MARK_ATTENDANCE',
      batch_id: batchId,
      student_id: studentId,
      detail: { status, class_session_id: classSessionId }
    })

    revalidatePath(`/dashboard/faculty/batches/${batchId}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to mark attendance' }
  }
}

export async function createClassSession(batchId: string, classNumber: number, sessionDate: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('class_sessions')
      .insert({
        batch_id: batchId,
        class_number: classNumber,
        session_date: sessionDate
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique violation
        // Session already exists, fetch it
        const { data: existing } = await supabase
          .from('class_sessions')
          .select('*')
          .eq('batch_id', batchId)
          .eq('class_number', classNumber)
          .single()
        return { success: true, data: existing }
      }
      throw new Error(error.message)
    }

    revalidatePath(`/dashboard/faculty/batches/${batchId}`)
    return { success: true, data }
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to create session' }
  }
}
