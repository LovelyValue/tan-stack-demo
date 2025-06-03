import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './Task.module.css'

interface TaskProps {
  id: number
  title: string
}

const Task: React.FC<TaskProps> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      className={styles['task']}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <input className={styles['checkbox']} type="checkbox" />
      {title}
    </div>
  )
}

export default Task
