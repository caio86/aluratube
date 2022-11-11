import { createClient } from "@supabase/supabase-js"
import React from "react"
import { StyledRegisterVideo } from "./styles"

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

// WhiteBoarding
// Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)
  return {
    values,
    handleChange: e => {
      const value = e.target.value
      const name = e.target.name
      setValues({
        ...values,
        [name]: value,
      })
    },
    clearForm() {
      setValues({})
    },
  }
}

const PROJECT_URL = "https://hvaccmtdargvmzjcniqy.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2YWNjbXRkYXJndm16amNuaXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTE1MDQsImV4cCI6MTk4Mzc2NzUwNH0.YHTcqKVhxwfKULvb1DidOr2eBfFUC9TGFD2f1NiOfiQ"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "FrostPunk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" },
  })
  const [formVisivel, setFormVisivel] = React.useState(false)
  /*
  ## O que precisamos para o form funcionar?
  - pegar os dados,que precisam vir do state
    - titulo
    - url do video
  - precisamos ter um onSubmit do nosso form
  - Limpar o formulário após o Submit
  */
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {/* Ternário */}
      {/* Operadores de Curto circuito */}
      {formVisivel ? (
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(formCadastro.values)

            // Contrato entre o nosso front e o BackEnd
            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos",
              })
              .then(oqueveio => {
                console.log(oqueveio)
              })
              .catch(err => {
                console.log(err)
              })

            setFormVisivel(false)
            formCadastro.clearForm()
          }}
        >
          <div>
            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
              X
            </button>
            <input placeholder="Título do vídeo" name="titulo" value={formCadastro.values.titulo} onChange={formCadastro.handleChange} />
            <input placeholder="URL" name="url" value={formCadastro.values.url} onChange={formCadastro.handleChange} />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  )
}

// [X] falta o botão para adicionar
// [X] Modal
// -> Precisamos controlar o state
// -> Formulário em si
