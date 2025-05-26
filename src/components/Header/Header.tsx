import { UserButton, useAuth } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import styles from './Header.module.css'

const Header = () => {
  const { isSignedIn } = useAuth()
  return (
    <header className={styles['header']}>
      <nav className={styles['header__nav']}>
        <ul className={styles['header__list']}>
          <li className={styles['header__list-item']}>
            <Link className={styles['header__list-link']} to="/">
              Logo
            </Link>
          </li>
          <li className={styles['header__list-item']}>
            <Link className={styles['header__list-link']} to="/">
              Главная
            </Link>
          </li>
          <li className={styles['header__list-item']}>
            <Link className={styles['header__list-link']} to="/dnd">
              DND
            </Link>
          </li>
          <li className={styles['header__list-item']}>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link className={styles['header__list-link']} to="/login">
                Войти
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
