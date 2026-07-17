import { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router'
import { router } from './api.route'
import { Toaster } from "react-hot-toast"
import { useSelector } from 'react-redux';
import { useAuth } from './feature/auth/hook/useAuth.js';
import { useAdmin } from './admin/hook/useAdmin.js';
import PageLoader from "../app/components/loader/PageLoader"

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { handleGetme } = useAuth();
  const { admin } = useSelector((state) => state.admin)
  const { handleGetAdmin } = useAdmin()

  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const appRouter = useMemo(() => router(user, admin), [user, admin]);
  
  useEffect(() => {
    if (!admin && isAdminRoute) {
      handleGetAdmin();
    }
  }, [admin, handleGetAdmin, isAdminRoute]);

  useEffect(() => {
    if (!user && !isAdminRoute) {
      handleGetme();
    }
  }, [user, handleGetme, isAdminRoute]);

  if (loading) {
    return <PageLoader />
  }
  return (
    <main>
      <RouterProvider router={appRouter} />
      <Toaster />
    </main>
  )
}

export default App