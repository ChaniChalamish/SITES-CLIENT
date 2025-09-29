import axios from "axios";

const API_URL = "http://localhost:3009/sites";

export const fetchSites = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const updateSite = async (id, updatedData) => {
  return axios.put(`${API_URL}/${id}`, updatedData);
};

export const deleteSite = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};