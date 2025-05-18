import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { FormErrors } from '../FormErrors/FormErrors'
import styles from './Form.module.css'
import type { FormProps } from './Form.props'

const Form: React.FC<FormProps> = ({
  textButton,
  textLink,
  URLLink,
  validatePassword,
  validateEmail,
}) => {
  // Управление формой
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
      <div className={styles['form__top']}>
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) => validateEmail(value),
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
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
              <FormErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{
            onBlur: ({ value }) => validatePassword(value),
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
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
              <FormErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>
      <div className={styles['form__bottom']}>
        <button className={styles['form__button']}>{textButton}</button>
        <Link className={styles['form__link']} to={URLLink}>
          {textLink}
        </Link>
      </div>
    </form>
  )
}

export default Form
