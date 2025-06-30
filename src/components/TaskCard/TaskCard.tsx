/* eslint-disable import/order */
import type { Id, Task } from '@/types/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import styles from './TaskCard.module.css'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return (
      <div
        className={styles['task__card-active']}
        ref={setNodeRef}
        style={style}
      ></div>
    )
  }

  if (editMode) {
    return (
      <div
        className={styles['task__card']}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <textarea
          className={styles['task__card-area']}
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) toggleEditMode()
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    )
  }

  return (
    <div
      className={styles['task__card']}
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={toggleEditMode}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <p className={styles['task__card-content']}>{task.content}</p>
      {mouseIsOver && (
        <button
          className={styles['task__card-button']}
          onClick={() => {
            deleteTask(task.id)
          }}
        >
          <img src="public\icon\TrashIcon.svg" alt="delete" />
        </button>
      )}
    </div>
  )
}

export default TaskCard
