import { type StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"

interface PersonState {
    firstName: string
    lastName: string
}

interface Actions {
    setFirstName: ( value: string ) => void
    setLastName: ( value: string ) => void
}

type PersonStore = PersonState & Actions

const storeApi: StateCreator<PersonStore> = (set) => ({ // * El StateCreator lo usamos para separar el store de los middlewares
    firstName: '',
    lastName: '',
    setFirstName: ( value: string ) => set({firstName: value}),
    setLastName: ( value: string ) => set({lastName: value})
})

export const usePersonStore = create<PersonStore>()(
    persist(
    storeApi, //* Aquí va el store que está separado
    { name: 'person-storage' })

)