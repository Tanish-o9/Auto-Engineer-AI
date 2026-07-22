import React from 'react';
import './globals.css';

export const metadata = {
  title: 'AutoEngineer AI — Autonomous Architecture & Engineering Platform',
  description: 'Turns one-line prompts into production-ready system architectures via an 8-agent AI team.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
