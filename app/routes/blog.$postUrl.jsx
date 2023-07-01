import { useLoaderData } from "@remix-run/react"
import { getPost } from "../models/posts.server"
import { formatearFecha } from "../utils/helpers"

export function meta({data}) {

  if (!data) {
    return [
      { title: `GuitarLA - Entrada No Encontrada` },
      { description: `Guitarras, venta de guitarras, guitarra no encontrada` }
    ];
  }

  return [
      { title: `GuitarLA - Entrada: ${data.titulo}` },
      { description: `Guitarras, venta de guitarras, guitarra ${data.titulo}` }
      
  ];
}

export async function loader({params}) {
    const {postUrl} = params
    const post  = await getPost(postUrl)

    if (post.data.length === 0) {
      throw new Response('', {
        status: 404,
        statusText: 'Posyt No Encontrado'
      })
    }
  
    return post.data[0].attributes
}

export default function Post() {
  
  const post = useLoaderData()
  const {contenido, titulo, imagen, url, publishedAt} =  post

  return (
    <article className="post mt-3">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen del post ${titulo}`} />
      <div className="contenido" >
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  )
}
