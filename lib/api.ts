import axios from "axios";
import type { Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  search: string = "",
  page: number = 1
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: { search, page },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (body: Omit<Note, "id" | "createdAt">) => {
  const { data } = await api.post<Note>("/notes", body);
  return data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};