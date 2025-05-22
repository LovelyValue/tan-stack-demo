/* eslint-disable import/order */
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import styles from '../styles/root.module.css'

export const Route = createRootRoute({
  component: () => (
    <div className={styles['root']}>
      <Header />
      <div className={styles['root__outlet']}>
        <Outlet />
      </div>
      <Footer />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
})
