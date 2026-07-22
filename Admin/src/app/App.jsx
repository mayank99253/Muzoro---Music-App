import { useEffect } from 'react';
import { RouterProvider } from 'react-router'
import { router } from './api.route'
import { Toaster } from "react-hot-toast"
import { useSelector } from 'react-redux';
import { useAdmin } from './admin/hook/useAdmin.js';
import PageLoader from "../app/components/loader/PageLoader"

export const App = () => {
  const { checkAuth} = useSelector((state) => state.admin)
  const { handleGetAdmin } = useAdmin()

  useEffect(() => {
    handleGetAdmin();
  }, [handleGetAdmin]);

  if (!checkAuth) return <PageLoader />

  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  )
}

