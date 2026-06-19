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

export const fetchNotes = async ({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
}): Promise<NotesResponse> => {
  const { data } = await api.get("/notes", {
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

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};