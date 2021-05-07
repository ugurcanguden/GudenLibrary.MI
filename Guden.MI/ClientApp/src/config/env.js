export const API_BASE="https://gudenapi.azurewebsites.net/api";



export const axiosConfig = { 
  headers: {
    'accept': '*/*',
    'content-type': 'application/json' 
  }
};

export const axiosConfigWithToken = { 
  headers: {
    'accept': '*/*',
    'content-type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
  }  
};

