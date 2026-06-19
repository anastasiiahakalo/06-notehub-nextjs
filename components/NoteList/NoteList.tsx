"use client";

import css from "./NoteList.module.css";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div style={{ display: "flex", gap: 8 }}>
              <Link className={css.link} href={`/notes/${note.id}`}>
                View details
              </Link>

              <button
                className={css.button}
                onClick={() => deleteMutation.mutate(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}