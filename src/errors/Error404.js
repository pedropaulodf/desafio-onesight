import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div>
      <h1>404 Error!</h1>
      <h2>Página não encontrada!</h2>
      <Link to="/">Voltar par a home</Link>
    </div>
  )
}
