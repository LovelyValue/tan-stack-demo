/* eslint-disable sort-imports */
/* eslint-disable import/order */
import type { Column, Id, Task } from '@/types/types'
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import ColumnContainer from '../ColumnContainer/ColumnContainer'
import TaskCard from '../TaskCard/TaskCard'
import styles from './KanbanBoard.module.css'

function KanbanBoard() {
  const [columns, setColumns] = useState<Array<Column>>([])
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const [tasks, setTasks] = useState<Array<Task>>([])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  )

  return (
    <div className={styles['board']}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={styles['board__inner???']}>
          <div className={styles['board__columns']}>
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className={styles['board__button']}
            onClick={() => {
              createNewColumn()
            }}
          >
            <img
              className={styles['board__button-img']}
              src="public\icon\PlusIcon.svg"
              alt="add"
            />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  )

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generatedId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    }
    setTasks([...tasks, newTask])
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task
      return { ...task, content }
    })

    setTasks(newTasks)
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generatedId(),
      title: ` ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd])
  }

  function generatedId() {
    return Math.floor(Math.random() * 10001)
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((t) => t.columnId !== id)
    setTasks(newTasks)
  }

  function deleteTask(id: Id) {
    const newTask = tasks.filter((task) => task.id !== id)
    setTasks(newTask)
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, title }
    })

    setColumns(newColumns)
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event

    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId == overColumnId) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      )

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      )

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId == overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        tasks[activeIndex].columnId = tasks[overIndex].columnId
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (isOverAColumn && isActiveATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        tasks[activeIndex].columnId = overId
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}

export default KanbanBoard
