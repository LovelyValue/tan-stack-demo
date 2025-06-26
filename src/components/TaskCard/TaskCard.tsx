/* eslint-disable import/order */
import type { Id, Task } from '@/types/types'
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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (editMode) {
    return (
      <div className={styles['task__card']}>
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
    >
      <p className={styles['task__card-content']}>{task.content}</p>
      {mouseIsOver && (
        <button
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
