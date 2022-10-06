export default function Avatar({ src, alt, text }) {
  return (
    <>
      <img src={src} alt={alt} className="w-10 h-10 mr-3 rounded-full"></img>
      {text && <p>{text}</p>}
    </>
  )
}
