import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]
// le pasamos el timestamp a esta funcion
const obtenerDiferenciaFechas = (timestamp) => {
  // lo primero que hacemos es recuperar el timestamp de este momento
  const ahora = Date.now()
  // calcular tiempo transcurrido
  const tiempoTranscurrido = (timestamp - ahora) / 1000 // asi sacamos los milisegundos
  // Recorremos las unidades de date_units para ver que magnitud es la que separa ahora con timestamp
  for (const [unidad, segundosEnLaUnidad] of DATE_UNITS) {
    if (
      Math.abs(tiempoTranscurrido) > segundosEnLaUnidad ||
      unidad === 'second'
    ) {
      const valor = Math.round(tiempoTranscurrido / segundosEnLaUnidad)
      return { valor, unidad }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() =>
    obtenerDiferenciaFechas(timestamp)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeago = obtenerDiferenciaFechas(timestamp)
      setTimeago(newTimeago)
    }, 5000)
    return () => clearInterval(interval)
  }, [timestamp])
  const { valor, unidad } = timeago
  const relativeTimeFormat = new Intl.RelativeTimeFormat('es', {
    style: 'long',
  })
  return relativeTimeFormat.format(valor, unidad)
}
