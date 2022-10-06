export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`bg-black text-white w-fit px-5 py-1 mt-3 rounded-2xl hover:opacity-70 transition duration-500 select-none ${
          disabled && 'opacity-25 pointer-events-none'
        }`}
      >
        {children}
      </button>
    </>
  )
}
