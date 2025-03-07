import { jwtDecode } from "jwt-decode";
 export const BASE_API = window.BASE_API;
export const FILE_BASE = window.BASE_API//"https://api.milindawebstore.com/";
export const FILE_BASE_RECORDING = window.FILE_BASE_RECORDING;//"https://livepbxphone.us/";
// export const BASE_API = "https://api.livepbxphone.us/";



export const DecryptToken = () => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("psx_token") || "";
  }

  let decoded = {};

  if (token !== "" && token !== "undefined") {
    decoded = jwtDecode(token);
  }

  // console.log("decoded", decoded);
  return decoded;
};

// export async function ChangePasswordAPI(userId, newPassword) {
//   try {
//     const url = "change_password_endpoint"; // Change this to your actual change password endpoint
//     const params = {
//       user_id: userId,
//       new_password: newPassword
//     };
//     const response = await CallPOSTAPI(url, params);
//     return response;
//   } catch (error) {
//     return { status: false, msg: error.message, data: [] };
//   }
// }

export async function CallGETAPI(url, params = "", headers = {}) {
  try {
    let token = localStorage.getItem("psx_token");
    let AllHeaders = { ...headers };
    if (token) {
      AllHeaders = { Authorization: "Bearer " + token, ...headers };
    }
    let res = await fetch(BASE_API + url + params, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...AllHeaders,
      },
    });

    if (!res.ok) {
      return { status: false, msg: "No Data Found", data: [] };
    }
    let resultData = await res.json();
    return { status: true, msg: "", data: resultData };
  } catch (e) {
    return { status: false, msg: e.message, data: [] };
  }
}

// export async function CallPOSTAPI(url, params = [], headers = {}) {
//   try {
//     let token = localStorage.getItem("psx_token");
//     let AllHeaders = { ...headers };
//     if (token) {
//       AllHeaders = { Authorization: "Bearer " + token, ...headers };
//     }

//     let res = await fetch(BASE_API + url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", ...AllHeaders },
//       body: JSON.stringify(params),
//     });
//     let resultData = await res.json();

//     if (!res.ok) {
//       return { status: false, msg: resultData?.message || "Unknown error", data: [] };
//     }
//     return { status: true, msg: resultData?.message || "Success", data: resultData };
//   } catch (e) {
//     return { status: false, msg: e.message || "Unknown error", data: [] };
//   }
// }

export async function CallPOSTAPI(url, data, headers = {}) {
  try {
    let token = localStorage.getItem("psx_token");
    let AllHeaders = { ...headers };
    if (token) {
      AllHeaders = { Authorization: "Bearer " + token, ...headers };
    }
    let res = await fetch(BASE_API + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AllHeaders,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { status: false, data: errorData }; // Return the error data
    }

    let resultData = await res.json();
    return { status: true, data: resultData };
  } catch (e) {
    return { status: false, data: { message: e.message } }; // Return the error message
  }
}



// import { jwtDecode } from "jwt-decode";

// export const BASE_API = window.BASE_API;
// export const FILE_BASE = window.BASE_API;
// export const FILE_BASE_RECORDING = window.FILE_BASE_RECORDING;

// // Function to handle token expiration and redirect
// const handleTokenExpiration = () => {
//   // Remove token and user type from localStorage
//   localStorage.removeItem("psx_token");
//   localStorage.removeItem("user_type");
  
//   // Redirect to login page
//   window.location.href = "/";
// };

// export const DecryptToken = () => {
//   let token = "";
//   if (typeof window !== "undefined") {
//     token = localStorage.getItem("psx_token") || "";
//   }

//   let decoded = {};

//   if (token !== "" && token !== "undefined") {
//     try {
//       decoded = jwtDecode(token);
      
//       // Check if token is expired
//       const currentTime = Math.floor(Date.now() / 1000);
//       if (decoded.exp && decoded.exp < currentTime) {
//         handleTokenExpiration();
//       }
//     } catch (error) {
//       // If token decoding fails, handle it as an expired token
//       handleTokenExpiration();
//     }
//   }

//   return decoded;
// };

// export async function CallGETAPI(url, params = "", headers = {}) {
//   try {
//     let token = localStorage.getItem("psx_token");
//     let AllHeaders = { ...headers };
//     if (token) {
//       AllHeaders = { Authorization: "Bearer " + token, ...headers };
//     }
    
//     let res = await fetch(BASE_API + url + params, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...AllHeaders,
//       },
//     });

//     // Check for 403 Forbidden status
//     if (res.status === 403) {
//       handleTokenExpiration();
//       return { status: false, msg: "Session expired", data: [] };
//     }

//     if (!res.ok) {
//       return { status: false, msg: "No Data Found", data: [] };
//     }
    
//     let resultData = await res.json();
//     return { status: true, msg: "", data: resultData };
//   } catch (e) {
//     return { status: false, msg: e.message, data: [] };
//   }
// }

// export async function CallPOSTAPI(url, data, headers = {}) {
//   try {
//     let token = localStorage.getItem("psx_token");
//     let AllHeaders = { ...headers };
//     if (token) {
//       AllHeaders = { Authorization: "Bearer " + token, ...headers };
//     }
    
//     let res = await fetch(BASE_API + url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...AllHeaders,
//       },
//       body: JSON.stringify(data),
//     });

//     // Check for 403 Forbidden status
//     if (res.status === 403) {
//       handleTokenExpiration();
//       return { 
//         status: false, 
//         data: { message: "Session expired. Please login again." } 
//       };
//     }

//     if (!res.ok) {
//       const errorData = await res.json();
//       return { status: false, data: errorData };
//     }

//     let resultData = await res.json();
//     return { status: true, data: resultData };
//   } catch (e) {
//     return { status: false, data: { message: e.message } };
//   }
// }

// ... rest of your existing code remains the same

export async function CallPostFileUpload(url, params, headers = {}) {
  try {
    let token = localStorage.getItem("psx_token");

    let AllHeaders = { ...headers };
    if (token) {
      AllHeaders = { Authorization: "Bearer " + token, ...headers };
    }
    //             // headers:{'Content-Type':'application/json',...AllHeaders},

    let res = await fetch(BASE_API + url, {
      method: "POST",
      headers: AllHeaders,
      body: params,
    });

    if (!res.ok) {
      return { status: false, msg: "No Data Found", data: [] };
    }
    let resultData = await res.json();
    return { status: true, msg: "", data: resultData };
  } catch (e) {
    return { status: false, msg: e.message, data: [] };
  }
}


export const DeleteCRTByPkId =  async (id)=>{
  const res  = await CallGETAPI('api/delete-call-routing/'+id);
  return res;
}