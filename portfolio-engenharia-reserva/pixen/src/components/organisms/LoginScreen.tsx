'use client';

import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (!password) {
      setError('A senha é obrigatória.');
      return;
    }
    setError('');
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[var(--bg-component)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-8 shadow-[0_8px_32px_var(--shadow-blue)]">
        <div className="text-center mb-8">
          <h1 className="font-orbitron font-bold text-3xl mb-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-transparent bg-clip-text">
            MultiTool
          </h1>
          <p className="font-dm-sans text-[var(--text-secondary)]">
            Faça login para acessar suas ferramentas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-dm-sans text-sm text-[var(--text-secondary)]">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-[var(--radius-pill)] border-[1.5px] border-[var(--border-subtle)] px-6 py-3 font-dm-sans bg-[var(--bg-primary)] shadow-[0_4px_16px_var(--shadow-blue)] text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-secondary)] focus:shadow-[0_0_0_4px_var(--accent-glow)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-dm-sans text-sm text-[var(--text-secondary)]">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-[var(--radius-pill)] border-[1.5px] border-[var(--border-subtle)] px-6 py-3 font-dm-sans bg-[var(--bg-primary)] shadow-[0_4px_16px_var(--shadow-blue)] text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-secondary)] focus:shadow-[0_0_0_4px_var(--accent-glow)]"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-dm-sans">{error}</p>}

          <div className="flex items-center justify-between text-sm font-dm-sans">
            <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
              <input type="checkbox" className="accent-[var(--accent-primary)]" />
              Lembrar de mim
            </label>
            <a href="#" className="text-[var(--accent-primary)] hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-[var(--radius-pill)] py-3 font-syne font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_24px_var(--accent-glow)] hover:scale-[1.02]"
          >
            Entrar <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
