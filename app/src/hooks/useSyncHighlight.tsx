import React, { createContext, useContext } from "react"

const SyncHighlightContext = createContext<ReadonlySet<number>>(new Set())

export function SyncHighlightProvider({
  noteIds,
  children,
}: {
  noteIds: ReadonlySet<number>
  children: React.ReactNode
}) {
  return (
    <SyncHighlightContext.Provider value={noteIds}>
      {children}
    </SyncHighlightContext.Provider>
  )
}

export function useSyncHighlightedNoteIds(): ReadonlySet<number> {
  return useContext(SyncHighlightContext)
}
