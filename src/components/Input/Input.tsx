import { useState } from 'react'
import styles from './Input.module.css'

interface InputProps {
  onSubmit: (value: string) => void
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('')
  const handleSubmit = () => {
    if (!input) return

    onSubmit(input)

    setInput('')
  }

  return (
    <div className={styles['container']}>
      <input
        className={styles['input']}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className={styles['button']} onClick={handleSubmit}>
        Add
      </button>
    </div>
  )
}

export default Input
