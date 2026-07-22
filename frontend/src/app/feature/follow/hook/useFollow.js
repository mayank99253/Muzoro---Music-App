import { useDispatch } from "react-redux"
import { setAllArtist, setError, setLoading, setArtistSong } from "../follow.slice.js"
import { getAllArtist, followArtist, unfollowArtist, getArtistSong } from "../services/follow.api.js"
import { useCallback } from "react";

export const useFollow = () => {

    const dispatch = useDispatch();

    const handleGetAllArtist = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getAllArtist();
            dispatch(setAllArtist([...data.allArtist]));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch all artists"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleFollowArtist = async ({ artistId }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await followArtist({ artistId });
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to follow artist"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleUnfollowArtist = async ({ artistId }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await unfollowArtist({ artistId });
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to unfollow artist"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetArtistSong = useCallback(async ({artistId}) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getArtistSong({artistId});
            dispatch(setArtistSong([...data]));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch all artists"));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        handleGetAllArtist,
        handleFollowArtist,
        handleUnfollowArtist,
        handleGetArtistSong
    };
};