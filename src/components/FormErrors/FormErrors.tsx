import styles from './FormErrors.module.css'

interface FormErrorsProps {
  errors: Array<string | Array<string> | undefined> | undefined
}

export const FormErrors: React.FC<FormErrorsProps> = ({ errors }) => {
  const normalized = (errors ?? []).flatMap((e) =>
    !e ? [] : Array.isArray(e) ? e : [e],
  )

  if (normalized.length === 0) return null
  return (
    <ul className={styles['error__ul']}>
      {normalized.map((error, index) => (
        <li className={styles['error_li']} key={index}>
          {error}
        </li>
      ))}
    </ul>
  )
}
