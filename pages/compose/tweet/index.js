import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { addTweet } from '../../../firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  ERROR: -1,
  USER_NOTKNOW: 0,
  LOADING: 1,
  SUCCES: 2,
}

export default function ComposeTweet() {
  const usuario = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOTKNOW)

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
    }).then(() => {
      router.push('/home')
    })
  }

  const buttonDissabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <div className="flex flex-col px-3">
      <strong>escribe un tweet</strong>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          placeholder="qué está pasando?"
          value={message}
          className="h-60 w-full resize-none border-0"
        ></textarea>
        <Button disabled={buttonDissabled}>Twittear</Button>
      </form>
    </div>
  )
}
