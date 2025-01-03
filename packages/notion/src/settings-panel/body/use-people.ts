"use client";

import { useEffect, useState } from "react";

import { Role } from "@swy/validators";

import { GuestRow, MemberRow } from "../../tables";
import { WorkspaceMemberships } from "../index.types";
import { useSettings } from "../settings-context";

export const usePeople = () => {
  const {
    settings: { memberships },
    people: { load },
  } = useSettings();
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [guests, setGuests] = useState<GuestRow[]>([]);

  useEffect(() => {
    if (Object.keys(memberships).length > 0) {
      const data = Object.values(memberships).reduce<WorkspaceMemberships>(
        (acc, mem) =>
          mem.role === Role.GUEST
            ? { members: acc.members, guests: [...acc.guests, mem] }
            : { members: [...acc.members, mem], guests: acc.guests },
        { members: [], guests: [] },
      );
      setMembers(data.members);
      setGuests(data.guests);
      return;
    }
    load?.()
      .then((data) => {
        setMembers(data.members);
        setGuests(data.guests);
      })
      .catch((e) => console.log(`[settings:people] Error`, e));
  }, [load, memberships]);

  return { members, guests };
};
