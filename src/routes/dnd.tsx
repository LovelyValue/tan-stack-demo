/* eslint-disable import/order */
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dnd')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <KanbanBoard />
    </div>
  )
}
