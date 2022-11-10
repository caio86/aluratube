import React from "react"
import { ColorModeContext } from "../src/components/Menu/components/ColorMode"
import Head from "next/head"

export default function Video() {
  const contexto = React.useContext(ColorModeContext)

  return (
    <div>
      <Head>
        <title>Videos</title>
      </Head>
      Video!
      {contexto.mode}
      <button onClick={() => contexto.toggleMode()}>
        Trocar modo
      </button>
    </div>
  )
}