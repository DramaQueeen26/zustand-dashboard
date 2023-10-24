import { type StateCreator, create } from "zustand"
import { StateStorage, createJSONStorage, persist } from "zustand/middleware"

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

const sessionStorage: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        console.log('getItem', name)
        return null
    },
    setItem: function (name: string, value: string): void | Promise<void> {
        console.log('setItem', {name, value})
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log('removeItem', name)
    }
}

export const usePersonStore = create<PersonStore>()(
    persist(
    storeApi, //* Aquí va el store que está separado
    { name: 'person-storage', storage: createJSONStorage(() => sessionStorage)})

)