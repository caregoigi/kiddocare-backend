import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      id: null, // Add the 'id' property
      setToken: (data) =>
        set(() => ({
          token: data,
        })),
      setId: (data) =>
        set(() => ({
          id: data,
        })), // Action to set the user ID
      resetToken: () =>
        set(() => ({
          token: null,
        })),
      resetId: () =>
        set(() => ({
          id: null,
        })), // Action to reset the user ID
    }),
    {
      name: 'AuthStorage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useAuthStore

// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       token: null,
//       setToken: (data) => set(() => ({ token: data })),
//       resetToken: () => set(() => ({ token: null })),
//     }),
//     {
//       name: 'AuthStorage',
//       storage: createJSONStorage(() => sessionStorage),
//     },
//   ),
// )

// export default useAuthStore
