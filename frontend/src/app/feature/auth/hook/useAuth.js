import { useDispatch } from "react-redux";
import { register , login , logout , getMe } from "../services/auth.api";
import { setUser , setError , setLoading } from "../auth.slice";
import toast from "react-hot-toast";
import { useCallback } from "react";

export function useAuth (){

    const dispatch = useDispatch()

    async function handleRegister({userName , email , password}) {
        try {
            dispatch(setError(null))
            dispatch(setLoading(true));
            const data = await register({userName , email , password });
            await handleGetme()
            toast.success("Register Successfully");
            return data
        } catch (error) {
            toast.error("Registration Error")
         dispatch(setError(error.response?.data?.message || "Registeration Error"))
         return null
        }finally{
            dispatch(setLoading(false))
        }
    }
    async function handleLogin({email , password}) {
        try {
            dispatch(setError(null))
            dispatch(setLoading(true));
            const data = await login({email , password });
            dispatch(setUser(data.user))
            await handleGetme()
            toast.success("Login Successfully");
            return data
        } catch (error) {
            toast.error("Login Error")
         dispatch(setError(error.response?.data?.message || "Login Error"))   
         return null
        }finally{
            dispatch(setLoading(false))
        }
    }
    async function handleLogout() {
        try {
            dispatch(setError(null))
            dispatch(setLoading(true));
            const data = await logout();
            dispatch(setUser(null))
            toast.success("Logout Successfully");
            await handleGetme()
        } catch (error) {
            toast.error("Logout Failed")
         dispatch(setError(error.response?.data?.message || "Logout Error"))   
        }finally{
            dispatch(setLoading(false))
        }
    }
    const handleGetme = useCallback(async () => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user || data));
    } catch (error) {
      toast.error("Internal Server Error");
      dispatch(setError(error.response?.data?.message || "Profile Error"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

    return {
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetme
    };
}