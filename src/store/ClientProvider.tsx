'use client';

import React from 'react';
import { AuthProvider } from '@/store/AuthContext';

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientProvider;
