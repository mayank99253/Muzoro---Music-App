import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    setLoading,
    setError,
    setFollowedArtists,
    setCreatedPlaylists,
    setLikedSongs,
    setArtist,
    setArtistSongs,
} from '../profile.slice.js'; 
import {
    getMyFollowArtists,
    getMyPlaylists,
    getMyLikedSong,
    getArtist,
    getArtistSongs,
    uploadSong
} from '../services/profile.api.js'; 
import toast from 'react-hot-toast';

export const useProfile = () => {
    const dispatch = useDispatch();

    const handleGetMyFollowArtists = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getMyFollowArtists();
            dispatch(setFollowedArtists([...data.followedArtists]));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch followed artists"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetMyPlaylists = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getMyPlaylists();
            dispatch(setCreatedPlaylists(data.count));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch playlists"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetMyLikedSongs = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getMyLikedSong();
            dispatch(setLikedSongs(data.count));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch liked songs"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetArtist = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getArtist();
            dispatch(setArtist(data))
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch Artist"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleGetArtistSongs = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await getArtistSongs();
            dispatch(setArtistSongs([...data.songs]))
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch Artist songs"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleUploadSong = async (formData) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await uploadSong(formData);
            await handleGetArtistSongs()
            toast.success("Upload Song Successfully")
            return data;
        } catch (error) {
            toast.error(error.response?.message || "Failed to upload song")
            console.log(error)
            dispatch(setError(error.response?.data?.message || error.message || "Failed to Upload Song"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleGetMyFollowArtists,
        handleGetMyPlaylists,
        handleGetMyLikedSongs,
        handleGetArtist,
        handleGetArtistSongs,
        handleUploadSong
    };
};