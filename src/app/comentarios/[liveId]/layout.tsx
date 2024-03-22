export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full items-start justify-center p-8">
      {children}
    </div>
  )
}
