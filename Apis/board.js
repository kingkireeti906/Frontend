import axios from "axios";

const backendUrl = `http://localhost:3001`;

export const getAnalytics = async () => {
    try {
        const reqUrl = `${backendUrl}/api/v1/board/analytics`;
        const token = localStorage.getItem("token");
      
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
};
export const create = async ({title,priority,checklist,dueDate,vp}) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/board/create`;
        const reqpayload={title,priority,checklist,dueDate,vp}
        const token = localStorage.getItem("token");
      
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.post(reqUrl,reqpayload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
};
export const getdata =async(duration,section)=>{
    try {
        const reqUrl = `${backendUrl}/api/v1/board/getdata?duration=${duration}&section=${section}`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response;
        

    } catch (error) {
        
    console.log(error)
    }


};
export const updatesection =async({id,newsection})=>{
    try {
        const reqUrl = `${backendUrl}/api/v1/board/updatesection`;
        const reqpayload={id,newsection}
        const token = localStorage.getItem("token");

        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl,reqpayload);
        return response.data;
        

    } catch (error) {
        
    console.log(error)
    }


};
export const getUserData = async (_id)=>{
    try {
        console.log(_id)
        const reqUrl = `${backendUrl}/api/v1/board/edit/${_id}`;
        // const token = localStorage.getItem("token");

        
        // axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get (reqUrl);
        console.log(response)
        return response

       

    } catch (error) {
        console.log(error)
        
    }
}
export const getshareData = async (id)=>{
  try {
    
      const reqUrl = `${backendUrl}/api/v1/board/edit/${id}`;
      const token = localStorage.getItem("token");

        
        axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.get (reqUrl);
     return response;

     

  } catch (error) {
      console.log(error)
      
  }
}
export const updateEditData = async ({ _id }, { title, priority, checklist, dueDate, vp }) => {
    try {
      const reqUrl = `${backendUrl}/api/v1/board/edit/${_id}`;
      const reqPayload = { title, priority, checklist, dueDate, vp };
      const token = localStorage.getItem("token");
  
      axios.defaults.headers.common["Authorization"] = token;
  
      const response = await axios.put(reqUrl, reqPayload);
  
      if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        return response.data;
      } else {
        console.error("Failed to update data. Server returned:", response.status, response.data);
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
      throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
  };
  export const deleteData = async ( {_id }) => {
    try {
      const reqUrl = `${backendUrl}/api/v1/board/delete/${_id}`;
      
      const token = localStorage.getItem("token");
  
      axios.defaults.headers.common["Authorization"] = token;
  
      const response = await axios.delete(reqUrl);
  
      if (response.status === 200) {
        console.log("Data deleted successfully:");
        return response.data;
      } else {
        console.error("Failed to update data. Server returned:", response.status);
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
      throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
  };
// Notice the change in the function signature: parameters are now directly destructured
export const updatevp = async ({ id }, vp) => {
  try {
    const reqUrl = `${backendUrl}/api/v1/board/checkboxes/${id}`;
    const reqPayload = { vp };
    const token = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.put(reqUrl, reqPayload);

    if (response.status === 200) {
      console.log("Data updated successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to update data. Server returned:", response.status, response.data);
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.error("Failed to fetch analytics data", error);
    throw new Error("Failed to fetch analytics data"); // You can customize the error message
  }
};
