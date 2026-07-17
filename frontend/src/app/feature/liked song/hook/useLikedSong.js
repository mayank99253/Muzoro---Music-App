import { useDispatch } from "react-redux"
import { setError, setIsLiked, setLikedSong, setLoading, setPlaylist, setPlaylistSongs } from "../liked.slice.js"
import { 
    getLikedSong, 
    likeSong, 
    unlikeSong, 
    createPlaylist, 
    getPlaylist, 
    // getPlaylistSong, // Added to match fetching songs inside a playlist
    addSongToPlaylist, 
    removeSongToPlaylist
} from "../services/likedSong.api.js"
import { useCallback } from "react"
import {toast} from "react-hot-toast"

export const useLikedSong = () => {
    const dispatch = useDispatch()

    // 1. Get all liked songs
    const handleGetLikedSong = useCallback(async () => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getLikedSong();
            dispatch(setLikedSong([...data.likedSong]))
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Fetch Liked Song"))
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch])

    // 2. Like a song
    const handleLikeSong = async ({ songId }) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            await likeSong({ songId });
            dispatch(setIsLiked(true));
            await handleGetLikedSong();
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Like Song"))
        } finally {
            dispatch(setLoading(false));
        }
    }

    // 3. Unlike a song
    const handleUnlikeSong = async ({ songId }) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            await unlikeSong({ songId });
            dispatch(setIsLiked(false));
            await handleGetLikedSong();
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Remove Liked Song"))
        } finally {
            dispatch(setLoading(false));
        }
    }

    // 4. Create a new playlist
    const handleCreatePlaylist = async ({ name }) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            await createPlaylist({ name });
            toast.success("Playlist Create Successfully")
            await handleGetPlaylists();
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Create Playlist"))
        } finally {
            dispatch(setLoading(false));
        }
    }

    // 5. Get all user playlists
    const handleGetPlaylists = useCallback(async () => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getPlaylist();
            dispatch(setPlaylist([...data]))
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Fetch Playlists"))
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch])

    // 6. Get songs inside a specific playlist
    const handleGetPlaylistSongs = useCallback(async ({ playlistId }) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const data = await getPlaylistSong({ playlistId });
            dispatch(setPlaylistSongs([...data.songs || data.data]))
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Fetch Playlist Songs"))
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch])

    // 7. Add a song to a playlist
    const handleAddSongToPlaylist = async ({ playlistId, songId }) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            await addSongToPlaylist({ playlistId, songId });
            await handleGetPlaylists()
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To Add Song To Playlist"))
        } finally {
            dispatch(setLoading(false));
        }
    }
    const handleAddRemoveToPlaylist = useCallback(async ({ playlistId, songId }) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            await removeSongToPlaylist({ playlistId, songId });
            await handleGetPlaylists()
            // await handleGetPlaylistSongs({ playlistId });
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed To remove Song To Playlist"))
        } finally {
            dispatch(setLoading(false));
        }
    },[dispatch])

    return {
        handleGetLikedSong,
        handleLikeSong,
        handleUnlikeSong,
        handleCreatePlaylist,
        handleGetPlaylists,
        handleGetPlaylistSongs,
        handleAddSongToPlaylist,
        handleAddRemoveToPlaylist
    }
}