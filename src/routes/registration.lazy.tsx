import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Registration</div>
}
