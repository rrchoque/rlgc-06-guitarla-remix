import { useLoaderData } from "@remix-run/react"
import { getPost } from "../models/posts.server"
import { formatearFecha } from "../utils/helpers"
import styles from '~/styles/blog.css'

export function meta({data}) {

  console.log('DATA ::: ', data)

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

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}
export async function loader({params}) {
    const {postUrl} = params
    console.log(postUrl)
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
  console.log(post)

  return (
    <article className="contenedor post mt-3">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen del post ${titulo}`} />
      <div className="contenido" >
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  )
}
