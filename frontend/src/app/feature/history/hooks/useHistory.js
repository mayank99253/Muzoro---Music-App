import { useDispatch } from "react-redux";
import { setError, setHistory, setLoading } from "../history.slice.js";
import { addToHistory, getHistory } from "../services/history.api.js";
import { useCallback } from "react";

export const useHistory = () => {

    const dispatch = useDispatch()

   
    const handleGetHistory = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getHistory();
            dispatch(setHistory([...data.data]))
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed to add in history"));
        } finally {
            dispatch(setLoading(false))
        }
    }, [dispatch])

     const handleAddToHistory = async ({ id }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await addToHistory({ id });
            dispatch(setHistory([...data.history.songs]))
            await handleGetHistory()
        } catch (error) {
            dispatch(setError(error.response?.message || "Failed to add in history"));
        } finally {
            dispatch(setLoading(false))
        }
    }
    return {
        handleAddToHistory,
        handleGetHistory
    }
}