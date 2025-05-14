import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { FormErrors } from '../FormErrors/FormErrors'
import styles from './Form.module.css'
import type { FormProps } from './Form.props'

const Form: React.FC<FormProps> = ({ textButton, textLink, URLLink }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      console.log(value.email, value.password)
    },
  })

  return (
    <form
      className={styles['form']}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            console.log(value)
          },
        }}
      >
        {(field) => (
          <div className={styles['form__name']}>
            <label className={styles['form__label']} htmlFor={field.name}>
              Email
            </label>
            <input
              className={styles['form__input']}
              placeholder="Введите Email"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
            />
          </div>
        )}
      </form.Field>
      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const errors = []
            if (!/[A-Z]/.test(value))
              errors.push('Пароль должен содержать заглавную букву')
            if (!/[0-9]/.test(value))
              errors.push('Пароль должен содержать цифру')
            if (value.length < 10) errors.push('Пароль слишком короткий')
            return errors.length ? errors : undefined
          },
        }}
      >
        {(field) => (
          <div className={styles['form__password']}>
            <label className={styles['form__label']} htmlFor={field.name}>
              Password
            </label>
            <input
              className={styles['form__input']}
              placeholder="Введите пароль"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
            />
            <FormErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>
      <button className={styles['form__button']}>{textButton}</button>
      <Link className={styles['form__link']} to={URLLink}>
        {textLink}
      </Link>
    </form>
  )
}

export default Form
