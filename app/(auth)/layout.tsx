export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-center h-full bg-[#0b090a]">
            {children}
        </div>
    )
}
