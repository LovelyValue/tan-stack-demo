interface FormErrorsProps {
  errors: string[]
}

export function FormErrors({ errors }: FormErrorsProps) {
  if (!errors || errors.length === 0) {
    return null
  }

  return (
    <ul style={{ color: 'red', marginTop: '5px' }}>
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  )
}
