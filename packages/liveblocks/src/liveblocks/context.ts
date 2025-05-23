"use client";

import { Client } from "@liveblocks/client";
import { createRoomContext as __createRoomContext } from "@liveblocks/react";

import type { User } from "@swy/validators";

export const createRoomContext = (client: Client<Liveblocks["UserMeta"]>) => {
  const {
    useSelf: __useSelf,
    useOthers: __useOthers,
    ...hooks
  } = __createRoomContext(client);

  const useSelf = () => {
    const user = __useSelf<User>((me) => ({ id: me.id, ...me.info }));
    if (!user?.id)
      return { id: "fake-id", name: "Unknown", email: "", avatarUrl: "" };
    return user;
  };
  const useOthers = () =>
    __useOthers<User[]>((others) =>
      others.map((other) => ({ id: other.id, ...other.info })),
    );

  return { useSelf, useOthers, ...hooks };
};
