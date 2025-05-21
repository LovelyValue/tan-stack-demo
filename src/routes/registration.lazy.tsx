// eslint-disable-next-line import/order
import { SignUp } from '@clerk/clerk-react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}
