'use client';

import React, { useState } from 'react';
import { LayoutDashboard, QrCode, Scan, FileText, LogOut, Menu, X } from 'lucide-react';
import QRGenerator from './QRGenerator';
import QRReader from './QRReader';
import ImageToPDF from './ImageToPDF';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type Tab = 'dashboard' | 'qr-gen' | 'qr-read' | 'img-pdf';

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'qr-gen', label: 'Gerar QR Code', icon: QrCode },
    { id: 'qr-read', label: 'Ler QR Code', icon: Scan },
    { id: 'img-pdf', label: 'Imagem para PDF', icon: FileText },
  ] as const;

  const handleNavClick = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-primary)]">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-component)] backdrop-blur-md sticky top-0 z-20">
        <h1 className="font-orbitron font-bold text-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-transparent bg-clip-text">
          MultiTool
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text-primary)]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-[var(--bg-component)] backdrop-blur-xl border-r border-[var(--border-subtle)] flex flex-col transition-transform duration-300 z-10
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:block">
          <h1 className="font-orbitron font-bold text-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-transparent bg-clip-text">
            MultiTool
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 md:py-0 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-syne font-semibold transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_4px_16px_var(--shadow-blue)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[rgba(0,85,255,0.05)] hover:text-[var(--text-primary)]'
                  }
                `}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border-subtle)]">
          <div className="px-4 py-2 mb-2">
            <p className="font-dm-sans text-xs text-[var(--text-secondary)] truncate">Logado como:</p>
            <p className="font-syne font-bold text-sm text-[var(--text-primary)] truncate">{userEmail}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-syne font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-syne font-bold text-3xl mb-2 text-[var(--text-primary)]">Bem-vindo, {userEmail.split('@')[0]}!</h2>
            <p className="font-dm-sans text-[var(--text-secondary)] mb-8">Selecione uma ferramenta no menu para começar.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navItems.filter(item => item.id !== 'dashboard').map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="bg-[var(--bg-component)] backdrop-blur-md border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 cursor-pointer transition-all hover:shadow-[0_8px_32px_var(--shadow-blue)] hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[rgba(0,229,255,0.1)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-[var(--accent-primary)]" size={24} />
                    </div>
                    <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-2">{item.label}</h3>
                    <p className="font-dm-sans text-sm text-[var(--text-secondary)]">
                      Acesse a ferramenta de {item.label.toLowerCase()} de forma rápida e fácil.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'qr-gen' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QRGenerator />
          </div>
        )}

        {activeTab === 'qr-read' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QRReader />
          </div>
        )}

        {activeTab === 'img-pdf' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ImageToPDF />
          </div>
        )}
      </main>
    </div>
  );
}
