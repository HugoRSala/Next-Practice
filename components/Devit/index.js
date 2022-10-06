import Avatar from 'components/Avatar'

export default function Devit({ username, message, id, avatar }) {
  return (
    <article className="w-full flex py-3 px-3 border-b" key={id}>
      <div className="min-w-fit">
        <Avatar src={avatar} alt={username}></Avatar>
      </div>
      <section>
        <strong>{username}</strong>
        <p>{message}</p>
      </section>
    </article>
  )
}
