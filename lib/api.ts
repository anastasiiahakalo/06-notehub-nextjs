import axios from "axios";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? ""}`,
  },
});

export const fetchNotes = async (query = "") => {
  const { data } = await api.get("/notes", {
    params: query ? { search: query } : {},
  });

  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (body: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await api.post("/notes", body);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};