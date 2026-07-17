import { useDispatch } from "react-redux"
import { playSong, setAllSongs, setError, setLatestSongs, setLoading, setPopularSongs } from "../song.slice.js"
import { getAllSongs, getLatestSongs, getPopularSongs } from "../service/song.api.js"
import { useCallback } from "react"
import toast from "react-hot-toast"

export const useSong = () => {
    const dispatch = useDispatch()

    const handleGetLatestSongs = useCallback(async () => {
        try {
            dispatch(setError(null))
            dispatch(setLoading(true));
            const data = await getLatestSongs();
            dispatch(setLatestSongs([...data.data]));
        } catch (error) {
            toast.error(error.response?.message || "Failed to Load Songs");
            dispatch(setError(error.response?.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handlePopularSongs = useCallback(async () => {
        try {
            dispatch(setError(null))
            dispatch(setLoading(true));
            const data = await getPopularSongs();
            dispatch(setPopularSongs([...data.data]));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed Load Songs");
            dispatch(setError(error.response?.data?.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetAllSongs = useCallback(async () => {
        try {
            dispatch(setError(null))
            dispatch(setLoading(true));
            const data = await getAllSongs();
            dispatch(setAllSongs([...data.data]));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed Load Songs");
            dispatch(setError(error.response?.data?.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handlePlaySong = (song, list) => {
        dispatch(playSong({ song, list }));
    };

    return {
        handleGetLatestSongs,
        handlePopularSongs,
        handlePlaySong,
        handleGetAllSongs
    }
}