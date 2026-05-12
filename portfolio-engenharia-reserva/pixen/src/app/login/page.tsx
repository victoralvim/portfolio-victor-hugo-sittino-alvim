"use client";

import * as React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setError("Erro ao fazer login com Google.");
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '24px' }}>Login</h1>
      <button onClick={handleGoogleSignIn} className="btn">
        Entrar com Google
      </button>
      {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}
    </div>
  );
}
