import React from "react"
import { useRouter } from "next/router"
import { StyledRegisterVideo } from "./styles"
import { db } from "/src/firebaseInit"
import { collection, addDoc } from "firebase/firestore"

// WhiteBoarding
// Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)
  return {
    values,
    handleChange: (e) => {
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

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "", playlist: "" },
  })
  const [formVisivel, setFormVisivel] = React.useState(false)
  const router = useRouter()
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
          onSubmit={(e) => {
            e.preventDefault()
            console.log(formCadastro.values)

            // Contrato entre o nosso front e o BackEnd
            const videosCollection = collection(db, "videos")
            const docRef = addDoc(videosCollection, {
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: formCadastro.values.playlist,
            })
              .then((oqueVeio) => {
                console.log("Sucesso: ", oqueVeio)
                console.log(docRef)
                router.reload()
              })
              .catch((err) => {
                console.log("Erro: ", err)
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
            <input placeholder="Playlist" name="playlist" value={formCadastro.values.playlist} onChange={formCadastro.handleChange} />
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
