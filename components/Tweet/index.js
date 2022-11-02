import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import Like from 'icons/Like'
import Retweet from 'icons/Retweet'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Tweet({
  userName,
  content,
  id,
  img,
  avatar,
  likesCount,
  sharedCount,
  createdAt,
}) {
  const router = useRouter()
  const timeago = useTimeAgo(createdAt)

  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  return (
    <article
      onClick={handleClick}
      className="w-full flex flex-col py-3 px-3 border-b"
      key={id}
    >
      <div className="flex w-full">
        <div className="min-w-fit">
          <Avatar src={avatar} alt={userName}></Avatar>
        </div>
        <section>
          <div className="flex">
            <strong>{userName}</strong>
            <Link href={`/status/${id}`}>
              <a>
                <span className="text-gray-500 text-sm">. {timeago}</span>
              </a>
            </Link>
          </div>
          <p className="p-2">{content}</p>
          {{ img } && (
            <div>
              <img src={img}></img>
            </div>
          )}
        </section>
      </div>
      <div className="flex w-4/6 justify-around p-1 ml-9">
        <span className="mr-3 flex">
          <Like />
          {likesCount}
        </span>
        <span className="flex">
          <Retweet /> {sharedCount}
        </span>
      </div>
    </article>
  )
}
