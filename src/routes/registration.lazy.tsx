import Form from '@/components/Form/Form'
// eslint-disable-next-line import/order
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  // Проверка валидности Email
  function validateEmail(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Некорректный email'
    }
  }

  // Проверка валидности password
  function validatePassword(value: string): Array<string> | undefined {
    const errors: Array<string> = []

    if (!/[0-9]/.test(value)) {
      errors.push('Пароль должен содержать цифру')
    }
    if (value.length < 7) {
      errors.push('Пароль должен быть больше 7 символов')
    }
    if (!/[A-z]/.test(value)) {
      errors.push('Пароль должен содержать английскую букву')
    }

    return errors.length ? errors : undefined
  }

  return (
    <Form
      textButton="Зарегистрироваться"
      textLink="Войти"
      URLLink="/login"
      validatePassword={validatePassword}
      validateEmail={validateEmail}
    />
  )
}
