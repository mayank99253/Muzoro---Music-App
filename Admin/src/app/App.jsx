import { useEffect, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router'
import { router } from './api.route'
import { Toaster } from "react-hot-toast"
import { useSelector } from 'react-redux';
import { useAdmin } from './admin/hook/useAdmin.js';
import PageLoader from "../app/components/loader/PageLoader"

export const App = () => {
  const { admin } = useSelector((state) => state.admin)
  const { handleGetAdmin } = useAdmin()
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    (async () => {
      await handleGetAdmin();
      setAuthChecked(true);
    })();
  }, [handleGetAdmin]);

  if (!authChecked) return <PageLoader />

  return (
    <main>
      <RouterProvider router={router(admin)} />
      <Toaster />
    </main>
  )
}

