"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, CreditCard, CalendarCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Members', href: '/dashboard/members' },
    { icon: CalendarCheck, label: 'Attendance', href: '/dashboard/attendance' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-64 hidden md:flex flex-col">
            <div className="h-14 flex items-center px-6 border-b">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Dashboard</h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                        >
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn("w-full justify-start gap-3 mb-1", isActive && "bg-secondary")}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

        </div>
    );
}
