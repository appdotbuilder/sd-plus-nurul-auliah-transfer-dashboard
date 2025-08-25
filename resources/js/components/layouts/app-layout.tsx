import React from 'react';
import { AppShell } from '@/components/app-shell';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return <AppShell>{children}</AppShell>;
}