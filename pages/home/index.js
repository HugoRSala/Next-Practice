import { useState, useEffect } from 'react'
import Tweet from 'components/Tweet'
import useUser from 'hooks/useUser'
import { listenRealTime } from '../../firebase/client'
import Create from 'icons/Create'
import Link from 'next/link'
import Search from 'icons/Search'
import Home from 'icons/Home'
import Head from 'next/head'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const usuario = useUser()

  useEffect(() => {
    if (usuario) {
      listenRealTime((newTweets) => {
        setTimeline(newTweets)
      })
    }
    /*  usuario && fetchLastTweets().then(setTimeline) */
  }, [usuario])

  return (
    <>
      <Head>
        <title>Home / Devter</title>
      </Head>

      <div className="xs:h-full relative">
        <header className="w-full flex items-center fixed xs:sticky top-0 h-12 border-b border-solid bg-slate-50 xs:border-none">
          <h1 className="ml-2">Inicio</h1>
        </header>
        <section className="mt-12 xs:mt-0 flex-1 flex-row">
          {timeline.map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                img={tweet.img}
                content={tweet.content}
                avatar={tweet.avatar}
                userName={tweet.userName}
                createdAt={tweet.createdAt}
                id={tweet.id}
                likesCount={tweet.likesCount}
                sharedCount={tweet.sharedCount}
              ></Tweet>
            )
          })}
        </section>
        <nav className="w-full bottom-0 sticky flex justify-around items-center h-12 border-t border-solid bg-slate-50">
          <Link href="/">
            <a>
              <Search width={32} height={32} />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Home width={32} height={32} />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} />
            </a>
          </Link>
        </nav>
      </div>
    </>
  )
}
