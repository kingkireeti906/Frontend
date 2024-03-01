import axios from "axios";

// const backendUrl = `http://localhost:3001`;
const backendUrl =`https://protaskmanager.onrender.com`;
export const registeruser = async ({ name, email, password, confirmPassword }) => {
  try {
    const reqUrl = `${backendUrl}/api/v1/auth/register`;  // Corrected the URL
    const reqPayload = { name, email, confirmPassword, password };  // Corrected the payload
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response)
    return response.data;
   
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
    console.log(response.data)
   
   return response.data;
  } catch (error) {
    console.error(error);
   
    throw error;
    
  }

}

export const  updatepassword= async({name,oldpassword,newpassword})=> {

 try {
  const reqUrl = `${backendUrl}/api/v1/auth/updatepassword`; 
  const reqPayload={name,oldpassword,newpassword};
  const token = localStorage.getItem("token");
      
  axios.defaults.headers.common["Authorization"] = token;
  const response = await axios.put(reqUrl, reqPayload);
  console.log(response);
  return response;

  
  
 } catch (error) {
  console.error(error);
  
 }

}

