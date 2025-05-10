import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import styles from '../styles/root.module.css'

export const Route = createRootRoute({
  component: () => (
    <div className={styles['root__wrapper']}>
      <ul className={styles['root__nav']}>
        <li className={styles['root__nav-top']}>
          <Link to="/">TanStack Demo</Link>
        </li>
        <li className={styles['root__nav-center']}>
          <Link to="/">Главная</Link>
        </li>
        <li className={styles['root__nav-bottom']}>
          <Link to="/login" className={styles['root__nav-bottom']}>
            Вход
          </Link>
          <Link to="/registration" className={styles['root__nav-bottom']}>
            Регистрация
          </Link>
        </li>
      </ul>
      <div className={styles['root__outlet']}>
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
})
