import { AxiosInstance } from "../../../lib/axios.js"

export const addToHistory= async ({id}) => {
    try {
        const res = await AxiosInstance.post("history/v1/addtohistory/"+id)
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const getHistory= async () => {
    try {
        const res = await AxiosInstance.get("history/v1/get-history")
        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}