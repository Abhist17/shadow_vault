import axios from "axios";

const API = "http://localhost:5000";

export async function generateCommitment(data) {
  const res = await axios.post(`${API}/deposit`, data);
  return res.data;
}