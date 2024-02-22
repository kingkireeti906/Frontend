import axios from "axios";

const backendUrl = `https://backenddeploys.onrender.com`;

export const registeruser = async ({ name, email, password, confirmPassword }) => {
  try {
    const reqUrl = `${backendUrl}/api/v1/auth/register`;  // Corrected the URL
    const reqPayload = { name, email, confirmPassword, password };  // Corrected the payload
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response)
    return response;
   
  } 
  catch (error) {
    console.error(error);
    // Handle the error or throw it for the calling code to handle
    throw error;
  }
};


export const loginuser= async({email,password})=>{
  try {
    const reqUrl = `${backendUrl}/api/v1/auth/login`; 
    const reqPayload={email,password};
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response.data.token)
    if(response){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.name);
    }
   
  } catch (error) {
    console.error(error);
   
    throw error;
    
  }

}

