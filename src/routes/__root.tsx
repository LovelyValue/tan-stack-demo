import { UserButton, useAuth } from '@clerk/clerk-react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import styles from '../styles/root.module.css'

const RootComponent = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className={styles['root']}>
      <nav className={styles['root__nav']}>
        <ul className={styles['root__list']}>
          <li className={styles['root__list-item']}>
            <Link className={styles['root__list-link']} to="/">
              Logo
            </Link>
          </li>
          <li className={styles['root__list-item']}>
            <Link className={styles['root__list-link']} to="/">
              Главная
            </Link>
          </li>
          <li className={styles['root__list-item']}>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link className={styles['root__list-link']} to="/login">
                Войти
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className={styles['root__outlet']}>
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
