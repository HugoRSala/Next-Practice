export default function AppLayout({ children }) {
  return (
    <div className="w-100 grid place-items-center h-screen">
      <main className="bg-white w-full max-w-lg h-full grid xs:w-11/12 xs:h-90v xs:rounded-lg xs:shadow-md xs:overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
