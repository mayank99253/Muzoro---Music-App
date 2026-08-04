import { useDispatch } from "react-redux";
import { setMoodLoading, setMoodSuccess } from "../expression.slice.js";
import toast from "react-hot-toast";
import { moodPlaylist } from "../services/expression.api.js";
import { setMoodError } from "../expression.slice.js";

export const useExpression = () => {
  const dispatch = useDispatch();

  const handleMoodPlaylist = async (expression) => {
      try {
        dispatch(setMoodError(null))
        dispatch(setMoodLoading(true));
      const data = await moodPlaylist(expression);
      dispatch(setMoodSuccess({ mood: data.playlist.mood, songs: [...data.songs] }));
      toast.success("Mood playlist ready!");
    } catch (error) {
      dispatch(setMoodError(error?.response?.data?.message || "Failed to generate playlist"));
      toast.error("Failed to generate mood playlist");
    }finally{
        dispatch(setMoodLoading(false))
    }
  };

  return { handleMoodPlaylist };
};