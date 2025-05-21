import { SignIn } from '@clerk/clerk-react'
// eslint-disable-next-line import/order
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignIn />
}
