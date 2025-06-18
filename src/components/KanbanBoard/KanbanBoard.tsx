/* eslint-disable sort-imports */
/* eslint-disable import/order */
import type { Column, Id } from '@/types/types'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
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
import styles from './KanbanBoard.module.css'

function KanbanBoard() {
  const [columns, setColumns] = useState<Array<Column>>([])
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

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
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  )

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generatedId(),
      title: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd])
  }

  function generatedId() {
    return Math.floor(Math.random() * 10001)
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)
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
  }

  function onDragEnd(event: DragEndEvent) {
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
}

export default KanbanBoard
