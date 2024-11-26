import axiosConfig from "../axiosConfig"

export const toggleWatchList = async (movieId) => {
    try {
        const response = await axiosConfig.post(`/watchlist/${movieId}`)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}