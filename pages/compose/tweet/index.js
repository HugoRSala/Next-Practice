import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { addTweet, subirImagen } from '../../../firebase/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { getDownloadURL } from 'firebase/storage'
import Avatar from 'components/Avatar'
import AppLayout from 'components/AppLayout'

const COMPOSE_STATES = {
  ERROR: -1,
  USER_NOTKNOW: 0,
  LOADING: 1,
  SUCCES: 2,
}

const DRAG_IMAGE_STATES = {
  ERROR: 1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOAD: 2,
  COMPLETE: 3,
}
export default function ComposeTweet() {
  const usuario = useUser()
  const router = useRouter()

  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOTKNOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  // archivo que será el q arrastremos e imagen será cargada para hacer la preview
  const [imagenURL, setImagenURL] = useState(null)

  useEffect(() => {
    if (task) {
      let onProgess = () => {}
      let onError = () => {}
      let onComplete = () => {
        console.log('onComplete')
        getDownloadURL(task.snapshot.ref).then((imageURL) => {
          setImagenURL(imageURL)
        })
      }
      task.on('state-changed', onProgess, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTweet({
      avatar: usuario.avatar,
      content: message,
      userId: usuario.uid,
      userName: usuario.nombre,
      screenName: usuario.userName,
      img: imagenURL,
    }).then(() => {
      router.push('/home')
    })
  }

  const handlerDragEnter = (e) => {
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handlerDragLeave = (e) => {
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handlerDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    // acceder al primer elemento del array, sino da undefined (asincronía)
    const task = subirImagen(e.dataTransfer.files[0])
    setTask(task)
  }

  const buttonDissabled =
    (message.length === 0 && imagenURL === null) ||
    status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crea un nuevo tweet</title>
      </Head>
      <div>
        <header className="h-12 border-b-2 border-gray-300 flex items-center">
          <Link href="/home">
            <a>
              <span className="ml-3">volver</span>
            </a>
          </Link>
        </header>
        <div className="flex flex-col px-3">
          <strong className="m-3">escribe un tweet</strong>
          <form className="flex" onSubmit={handleSubmit}>
            {usuario && <Avatar src={usuario.avatar} />}

            <div className="w-full flex flex-col">
              <textarea
                onDragEnter={handlerDragEnter}
                onDragLeave={handlerDragLeave}
                onDrop={handlerDrop}
                onChange={handleChange}
                placeholder="qué está pasando?"
                value={message}
                className={`h-60 w-full resize-none p-2 ${
                  drag === DRAG_IMAGE_STATES.DRAG_OVER
                    ? 'border-2 border-black border-dashed rounded-lg'
                    : 'border-2 border-transparent rounded-lg'
                }`}
              ></textarea>
              {imagenURL && (
                <div className="relative">
                  <img
                    className="w-full h-auto rounded-xl"
                    src={imagenURL}
                    alt="imagen a subir"
                  ></img>
                  <button
                    onClick={() => setImagenURL(null)}
                    className="absolute text-white w-7 h-7 top-3 right-3 bg-black/30 rounded-full "
                  >
                    x
                  </button>
                </div>
              )}

              <Button disabled={buttonDissabled}>Twittear</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
