import {
  createCloudMidiRepository,
  createCloudSongDataRepository,
  createCloudSongRepository,
  createUserRepository,
} from "/imports/signal/packages/api/src"
import { auth, firestore, functions } from "../firebase/firebase"

export const cloudSongRepository = createCloudSongRepository(firestore, auth)
export const cloudSongDataRepository = createCloudSongDataRepository(
  firestore,
  auth
)
export const cloudMidiRepository = createCloudMidiRepository(
  firestore,
  functions
)
export const userRepository = createUserRepository(firestore, auth)
