/* eslint-disable import/order */
import type { Task } from '@/types/types'
import styles from './TaskCard.module.css'

interface Props {
  task: Task
}

function TaskCard({ task }: Props) {
  return <div className={styles['task__card']}>{task.content}</div>
}

export default TaskCard
