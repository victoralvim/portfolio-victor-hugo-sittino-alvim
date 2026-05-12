"use client";

import * as React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = React.createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user && pathname !== "/login") {
        router.push("/login");
      }
    });
    return unsubscribe;
  }, [router, pathname]);

  if (loading) return <div>Carregando...</div>;

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
