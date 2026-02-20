import React, { createContext, useContext } from "react"

const HighlightedNotesContext = createContext<ReadonlySet<number>>(new Set())

export function HighlightedNotesProvider({
  noteIds,
  children,
}: {
  noteIds: ReadonlySet<number>
  children: React.ReactNode
}) {
  return (
    <HighlightedNotesContext.Provider value={noteIds}>
      {children}
    </HighlightedNotesContext.Provider>
  )
}

export function useHighlightedNoteIds(): ReadonlySet<number> {
  return useContext(HighlightedNotesContext)
}
