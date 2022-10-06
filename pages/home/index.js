import { useState, useEffect } from 'react'
import Devit from 'components/Devit'

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <div className="w-100 grid place-items-center h-screen">
        <main className="bg-white w-full max-w-lg h-full grid xs:w-11/12 xs:h-90v xs:rounded-lg xs:shadow-md xs:overflow-y-auto">
          <div>
            <header className="w-full flex items-center fixed xs:sticky top-0 h-12 border-b border-solid bg-slate-50 xs:border-none xs:relative">
              <h1 className="ml-2">Inicio</h1>
            </header>
            <section className="mt-12 xs:mt-0 flex-row">
              {timeline.map((tweet) => {
                return (
                  <Devit
                    key={tweet.id}
                    message={tweet.message}
                    avatar={tweet.avatar}
                    username={tweet.username}
                    id={tweet.id}
                  ></Devit>
                )
              })}
            </section>
            <nav className="w-full fixed bottom-0 h-12 border-t border-solid bg-slate-50 xs:relative xs:sticky"></nav>
          </div>
        </main>
      </div>
    </>
  )
}
