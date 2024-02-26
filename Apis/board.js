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
export const create = async ({title,priority,checklist,dueDate}) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/board/create`;
        const reqpayload={title,priority,checklist,dueDate}
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
