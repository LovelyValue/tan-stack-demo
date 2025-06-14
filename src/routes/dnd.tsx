/* eslint-disable no-shadow */
/* eslint-disable import/order */
import Column from '@/components/Column/Column'
import Input from '@/components/Input/Input'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import styles from '../styles/dnd.module.css'

export const Route = createFileRoute('/dnd')({
  component: RouteComponent,
})

// Тип задачи
interface Task {
  id: number
  title: string
}

function RouteComponent() {
  const [tasks, setTasks] = useState<Array<Task>>([
    { id: 1, title: 'text 1' },
    { id: 2, title: 'text 2' },
    { id: 3, title: 'text 3' },
  ])

  const addTask = (title: string) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }])
  }

  const getTaskPos = (id: number | string) =>
    tasks.findIndex((task) => task.id === Number(id))

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id)
      return arrayMove(tasks, originalPos, newPos)
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <div className={styles['container']}>
      <h1>My Tasks</h1>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  )
}
