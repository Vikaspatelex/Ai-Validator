import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

export async function createIdea(payload) {
  const { data } = await api.post("/ideas", payload);
  return data;
}

export async function fetchIdeas() {
  const { data } = await api.get("/ideas");
  return data;
}

export async function fetchIdeaById(id) {
  const { data } = await api.get(`/ideas/${id}`);
  return data;
}

export async function deleteIdeaById(id) {
  await api.delete(`/ideas/${id}`);
}
