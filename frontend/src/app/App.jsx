import { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router'
import { router } from './api.route'
import { Toaster } from "react-hot-toast"
import { useSelector } from 'react-redux';
import { useAuth } from './feature/auth/hook/useAuth.js';
import PageLoader from "../app/components/loader/PageLoader"
import { useProfile } from './feature/profile/hook/useProfile.js';

const App = () => {
  const { checkAuth , user} = useSelector((state) => state.auth)
  const { handleGetme } = useAuth()
  const { artist} = useSelector((state) => state.profile)
  const { handleGetArtist } = useProfile()

  useEffect(() => {
    handleGetme();
    handleGetArtist()
  }, [handleGetme,handleGetArtist]);

  if (!checkAuth) return <PageLoader />

  return (
    <main className='h-[100%] w-[100%]'>
      <RouterProvider router={router(user, artist)} />
      <Toaster />
    </main>
  )
}



export default App