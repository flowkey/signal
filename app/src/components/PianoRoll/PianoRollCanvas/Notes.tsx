import Color from "color"
import { vec4 } from "gl-matrix"
import { GLFallback } from "@ryohey/webgl-react"
import { FC } from "react"
import { colorToVec4 } from "../../../gl/color"
import { useNoteColor } from "../../../hooks/useNoteColor"
import { usePianoRoll } from "../../../hooks/usePianoRoll"
import { useSettings } from "../../../hooks/useSettings"
import { useTrack } from "../../../hooks/useTrack"
import { useSyncHighlightedNoteIds } from "../../../hooks/useSyncHighlight"
import { LegacyNotes } from "./lagacy/LegacyNotes"
import { NoteCircles } from "./NoteCircles"
import { NoteLabels } from "./NoteLabels"
import { NoteRectangles } from "./NoteRectangles"

const SYNC_GREEN: vec4 = colorToVec4(Color("#22C55E"))
const SYNC_GREEN_LIGHT: vec4 = colorToVec4(Color("#22C55E").lighten(0.7))

export interface NotesProps {
  zIndex: number
}

export const Notes: FC<NotesProps> = (props) => {
  return <GLFallback component={_Notes} fallback={LegacyNotes} {...props} />
}

const _Notes: FC<{ zIndex: number }> = ({ zIndex }) => {
  const { notes, selectedTrackId } = usePianoRoll()
  const { isRhythmTrack } = useTrack(selectedTrackId)
  const { borderColor, inactiveColor, activeColor, selectedColor } =
    useNoteColor()
  const { showNoteLabels } = useSettings()
  const syncHighlightedIds = useSyncHighlightedNoteIds()

  const normalNotes =
    syncHighlightedIds.size > 0
      ? notes.filter((n) => !syncHighlightedIds.has(n.id))
      : notes
  const syncNotes =
    syncHighlightedIds.size > 0
      ? notes.filter((n) => syncHighlightedIds.has(n.id))
      : []

  return (
    <>
      {isRhythmTrack && (
        <>
          <NoteCircles
            strokeColor={borderColor}
            rects={normalNotes}
            inactiveColor={inactiveColor}
            activeColor={activeColor}
            selectedColor={selectedColor}
            zIndex={zIndex}
          />
          {syncNotes.length > 0 && (
            <NoteCircles
              strokeColor={borderColor}
              rects={syncNotes}
              inactiveColor={SYNC_GREEN}
              activeColor={SYNC_GREEN}
              selectedColor={SYNC_GREEN_LIGHT}
              zIndex={zIndex + 0.05}
            />
          )}
        </>
      )}
      {!isRhythmTrack && (
        <>
          <NoteRectangles
            strokeColor={borderColor}
            inactiveColor={inactiveColor}
            activeColor={activeColor}
            selectedColor={selectedColor}
            rects={normalNotes}
            zIndex={zIndex + 0.1}
          />
          {syncNotes.length > 0 && (
            <NoteRectangles
              strokeColor={borderColor}
              inactiveColor={SYNC_GREEN}
              activeColor={SYNC_GREEN}
              selectedColor={SYNC_GREEN_LIGHT}
              rects={syncNotes}
              zIndex={zIndex + 0.15}
            />
          )}
          {showNoteLabels && <NoteLabels rects={notes} zIndex={zIndex + 0.2} />}
        </>
      )}
    </>
  )
}
