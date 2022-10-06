import { useState, useEffect } from 'react'
import { onAuthStateChange } from '../firebase/client'
import { useRouter } from 'next/router'

export const USER_STATE = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
}

export default function useUser() {
  const [usuario, setUsuario] = useState(USER_STATE.NOT_KNOW)
  const router = useRouter()
  useEffect(() => {
    onAuthStateChange(setUsuario)
  }, [])

  useEffect(() => {
    usuario === USER_STATE.NOT_LOGGED && router.push('/')
  }, [usuario])
  return usuario
}
