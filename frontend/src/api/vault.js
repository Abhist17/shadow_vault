import axios from "axios";

const API = "http://localhost:5000";

export async function generateCommitment(data) {
  const res = await axios.post(`${API}/deposit`, data);
  return res.data;
}

export async function depositToStellar(data) {
  const res = await axios.post(`${API}/deposit-stellar`, data);
  return res.data;
}

export async function generateProof() {
  const res = await axios.post(`${API}/proof`);
  return res.data;
}

export async function verifyProof() {
  const res = await axios.post(`${API}/verify`);
  return res.data;
}

export async function withdraw(data) {
  const res = await axios.post(`${API}/withdraw`, data);
  return res.data;
}