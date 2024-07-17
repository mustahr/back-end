"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
    className,
}: React.HTMLAttributes<HTMLElement>) {


    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/`,
            label: 'Overview',
            active: pathname === `/`
        },
        {
            href: `/trips`,
            label: 'Trips',
            active: pathname === `/trips`
        },
        {
            href: `/reservations`,
            label: 'Reservations',
            active: pathname === `/reservations`
        },
        {
            href: `/contact`,
            label: 'Contact',
            active: pathname === `/contact`
        },
        {
            href: `/blogs`,
            label: 'Blogs',
            active: pathname === `/blogs`
        }
    ];

    return (
        <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover-text-primary hover:text-black dark:hover:text-white",
                        route.active ? "text-black dark:text-white " : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </div>
    )
}