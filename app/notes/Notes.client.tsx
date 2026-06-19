"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

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

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(search, page),   placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages;

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />

        <div className={css.right}>
          {totalPages && totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={(e) => setPage(e.selected + 1)}
            />
          )}

          <button onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>
      </header>

      <NoteList notes={notes} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}