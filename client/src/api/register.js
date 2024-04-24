import axios from 'axios'

export const registerUser = async(userData)=>{
    const URL = import.meta.env.VITE_BACKEND_URL
    try{
        const userResponse = await axios.post(`${URL}/register`,userData)
        if(!userResponse){
            throw new Error('Registration Failed');
        }
        const registerToken = userResponse.data.registerToken
        localStorage.setItem("registerToken",registerToken)
        return userResponse.data
    }catch(err){
        console.log(err)
    }

}