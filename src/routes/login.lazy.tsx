import Form from '@/components/Form/Form'
// eslint-disable-next-line import/order
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Form
      textButton={'Войти'}
      textLink="Зарегистрироваться"
      URLLink="/registration"
    />
  )
}
