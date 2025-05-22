import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <ul className={styles['footer__list']}>
        <li className={styles['footer__list-item']}>text</li>
        <li className={styles['footer__list-item']}>text</li>
        <li className={styles['footer__list-item']}>text</li>
      </ul>
    </footer>
  )
}

export default Footer
