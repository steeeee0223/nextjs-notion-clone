import type { StateCreator } from "zustand";

import type { User } from "@swy/validators";

interface UserState {
  user: User | null;
  clerkId: string | null;
}
interface UserActions {
  setClerkId: (clerkId: string) => void;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
}

export type UserSlice = UserState & UserActions;

export const initialUserState: UserState = {
  user: null,
  clerkId: null,
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  ...initialUserState,
  setClerkId: (clerkId) => set({ clerkId }),
  setUser: (user) => set({ user }),
  updateUser: (data) => set(({ user }) => ({ user: { ...user!, ...data } })),
});
