/* eslint-disable import/order */
import type { Column, Id } from '@/types/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import styles from './ColumnContainer.module.css'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props

  const [editMod, setEditMod] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMod,
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        className={styles['column-active']}
        ref={setNodeRef}
        style={style}
      ></div>
    )
  }

  return (
    <div className={styles['column']} ref={setNodeRef} style={style}>
      <div
        className={styles['column__header']}
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMod(true)
        }}
      >
        <div className={styles['column__number']}>0</div>
        <div className={styles['column__title']}>
          {!editMod && column.title}
          {editMod && (
            <input
              className={styles['column__title-input']}
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMod(false)
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                setEditMod(false)
              }}
            />
          )}
        </div>
        <button
          className={styles['column__button']}
          onClick={() => {
            deleteColumn(column.id)
          }}
        >
          <img
            className={styles['column__img']}
            src="public\icon\TrashIcon.svg"
            alt=""
          />
        </button>
      </div>
      <div className={styles['column__content']}>Content</div>
      <div className={styles['column__footer']}>Footer</div>
    </div>
  )
}

export default ColumnContainer
