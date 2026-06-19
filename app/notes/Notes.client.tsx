"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";

import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(search), // ⚠️ временно без page (важно ниже)
    refetchOnMount: false,
  });

  const notes: Note[] = data?.notes ?? [];

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className={css.app}>
      {/* TOP BAR (ОДНА ЛИНИЯ) */}
      <header className={css.toolbar}>
        <SearchBox onChange={(value: string) => setSearch(value)} />

        <div className={css.right}>
          <Pagination
            pageCount={data?.totalPages ?? 1}
            forcePage={page - 1}
            onPageChange={(e) => setPage(e.selected + 1)}
          />

          <button
            className={css.button}
            onClick={() => setIsModalOpen(true)}
          >
            Create note +
          </button>
        </div>
      </header>

      {/* GRID LIST */}
      <NoteList notes={notes} />

      {/* MODAL */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}