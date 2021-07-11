import { authServices } from "../services/authServices";

export default async function handleResponse(response) {
    //console.log("Response: ", response);
    const data = response.data;
    //console.log("Data: ", data);
    if (!(response.statusText === "OK")) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        await authServices.logout();
        refreshPage();
      }
      const error = (data && data.message) || response.statusText;
      console.log("Error ", error);
      throw new Error(error);
    }
    return data;
  }
  
  const refreshPage = () => {
    window.location.reload();
  };
  