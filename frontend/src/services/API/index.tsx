import axios from "axios";
import fileDownload from "js-file-download";

const baseUrl = "http://localhost:3999/api"; // desenvolvimento

export const getQrcode = async () => {
  try {
    const token = getToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const endpoint = "/qrcode";
    const response = await axios.get(`${baseUrl}${endpoint}`, options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

function getToken() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer" + " " + token.slice(1, -1);
    return token;
  }
}

export async function getFile(endpoint: string, fileName) {
  try {
    const token = getToken();
    const options = {
      responseType: "blob",
    };
    const response = await axios.get(`${baseUrl}${endpoint}`, options);
    fileDownload(response.data, fileName);
  } catch (error) {
    console.error(
      "Error downloading the file:",
      error.response?.data || error.message
    );
  }
}

export const getData = async (endpoint: string, body?: any) => {
  try {
    getToken();
    const result = await axios.get(`${baseUrl}${endpoint}`, body);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postData = async (endpoint: string, data: any) => {
  try {
    if (endpoint !== "/auth/login") {
      getToken();
    }
    const result = await axios.post(`${baseUrl}${endpoint}`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const putData = async (endpoint: string, data: any) => {
  try {
    getToken();
    const result = await axios.put(`${baseUrl}${endpoint}`, data);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    getToken();
    const result = await axios.delete(`${baseUrl}${endpoint}`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const postFormData = async (endpoint: string, formData: FormData) => {
  try {
    const token = getToken();
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await axios.post(`${baseUrl}${endpoint}`, formData, options);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
