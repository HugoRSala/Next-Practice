import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import Like from 'icons/Like'
import Retweet from 'icons/Retweet'

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
  const timeago = useTimeAgo(createdAt)

  return (
    <article className="w-full flex flex-col py-3 px-3 border-b" key={id}>
      <div className="flex w-full">
        <div className="min-w-fit">
          <Avatar src={avatar} alt={userName}></Avatar>
        </div>
        <section>
          <div className="flex">
            <strong>{userName}</strong>
            <span className="text-gray-500 text-sm">. {timeago}</span>
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
