import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from '../Task/Task'
import styles from './Column.module.css'

interface TaskType {
  id: number
  title: string
}

interface ColumnProps {
  tasks: Array<TaskType>
}

const Column: React.FC<ColumnProps> = ({ tasks }) => {
  return (
    <div className={styles['column']}>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  )
}

export default Column
