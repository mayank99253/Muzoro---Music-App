import { useDispatch } from "react-redux";
import { adminLogin, adminLogout, rejectArtist, approveArtist, adminGetAdmin, getPendingArtists, getVerifiedArtists, getAllSongs, deleteSong, banArtist, unbanArtist, getBanArtists } from '../services/admin.api.js'
import { setUser, setLoading, setError, setPendingArtist, setVerifiedArtist, setAllSongs, setBanArtist } from "../admin.slice.js";
import toast from "react-hot-toast";
import { useCallback } from "react";

export const useAdmin = () => {
    const dispatch = useDispatch()

    async function handleAdminLogin({ email, password }) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await adminLogin({ email, password });
            dispatch(setUser(data.admin))
            toast.success("Admin Login Sucessfully")
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login Error"));
        } finally {
            dispatch(setLoading(false))
        }
    }
    const handleGetAdmin = useCallback(async () => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await adminGetAdmin();
            dispatch(setUser(data))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Admin Error"));
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    const handleAdminLogout = useCallback(async () => {
        try {
            await adminLogout();
            dispatch(setUser(null));
            toast.success("Logged out");
        } catch (error) {
            toast.error("Logout failed");
        }
    }, [dispatch]);

    const handleGetPendingArtist = useCallback(async function () {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getPendingArtists();
            dispatch(setPendingArtist([...data.data]))
        } catch (error) {
            toast.error("Failed to fetch the Pending Artists")
            dispatch(setError(error.response?.data?.message || "Failed to fetch the Pending Artists"));
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch])

    const handleGetApproveArtist = useCallback(async function () {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getVerifiedArtists();
            dispatch(setVerifiedArtist([...data.data]))
        } catch (error) {
            toast.error("Failed to fetch the Approve Artists")
            dispatch(setError(error.response?.data?.message || "Failed to fetch the Approve Artists"));
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch])

    const handleGetAllSongs = useCallback(async function () {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getAllSongs();
            dispatch(setAllSongs([...data.data]))
        } catch (error) {
            toast.error("Failed to fetch the Songs")
            dispatch(setError(error.response?.data?.message || "Failed to fetch the Songs"));
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    const handleApproveArtist = useCallback(async function ({ id }) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await approveArtist({ id });
            toast.success(data.message)
            await handleGetPendingArtist();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to approve")
            dispatch(setError(error.response?.data?.message || "Failed To Approve Artist"))
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    const handleRejectArtist = useCallback(async function ({ id }) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await rejectArtist({ id });
            toast.success("Reject Artist Successfully");
            await handleGetPendingArtist()
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed To Approve Artist");
            console.error(error.response?.data?.message || "Failed To Approve Artist")
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    const handleDeleteSong = useCallback(async function ({ id }) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await deleteSong({ id });
            await handleGetAllSongs()
            toast.success("Delete Song Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed To Delete Song ");
            console.error(error.response?.data?.message || "Failed To Delete Song ")
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    const handleBanArtist = useCallback(async function ({ id }) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await banArtist({ id });
            await handleGetAllSongs()
            await handleGetApproveArtist()
            toast.success("Artist Ban Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed To Ban Artist");
            console.error(error.response?.data?.message || "Failed To Ban Artist ")
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch]);

    const handleUnbanArtist = useCallback(async function ({ id }) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));

            // 1. Call your unban API function
            const data = await unbanArtist({ id });
            await handleGetAllSongs();
            await handleGetBanArtists();
            toast.success("Artist Unbanned Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed To Unban Artist");
            console.error(error.response?.data?.message || "Failed To Unban Artist");
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetBanArtists = useCallback(async function () {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getBanArtists();
            // Storing the banned artists array into your Redux state layer
            dispatch(setBanArtist([...data.data]));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed To Fetch Banned Artists");
            console.error(error.response?.data?.message || "Failed To Fetch Banned Artists");
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        handleAdminLogin,
        handleGetAdmin,
        handleAdminLogout,
        handleGetPendingArtist,
        handleGetApproveArtist,
        handleGetAllSongs,
        handleApproveArtist,
        handleRejectArtist,
        handleDeleteSong,
        handleBanArtist,
        handleUnbanArtist,
        handleGetBanArtists
    }
}