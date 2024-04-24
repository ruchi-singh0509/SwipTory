import axios from "axios"

export const fetchPosts=async(postID)=>{
    const URL = import.meta.env.VITE_BACKEND_URL;
    try{
        const payload = await axios.get(`${URL}/post/${postID}`)
        console.log(payload.data)

    }catch(err){
        console.log(err)
    }
}