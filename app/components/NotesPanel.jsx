"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "personal-3d-notes";

export default function NotesPanel() {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setNotes(stored);
    }
  }, []);

  useEffect(() => {
    if (notes === "") {
      window.localStorage.removeItem(STORAGE_KEY);
      setSaved(false);
      return;
    }

    const timeout = setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, notes);
      setSaved(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [notes]);

  return (
    <section className="panel notes">
      <h2>Your Notes</h2>
      <textarea
        placeholder="Capture ideas, to-dos, or design notes for your 3D home."
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
          setSaved(false);
        }}
      />
      <div className="hint">
        {saved ? "Notes saved to this browser." : "Updates automatically."}
      </div>
    </section>
  );
}
