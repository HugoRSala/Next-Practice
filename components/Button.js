export default function Button({ children, onClick }) {
    return (
        <>
            <button onClick={onClick} className="bg-black text-white px-5 py-1 mt-3 rounded-2xl hover:opacity-70 transition duration-500">
                {children}
            </button>
        </>
    )

}