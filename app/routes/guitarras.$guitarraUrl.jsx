import { useLoaderData } from "@remix-run/react"
import { getGuitarra } from "../models/guitarras.server"
import styles from '~/styles/guitarras.css'

export function meta({data}) {

  console.log(data)

  return [
      { title: `GuitarLA - Guitarra ${data.nombre}` },
      { description: `Guitarras, venta de guitarras, guitarra ${data.nombre}` }
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

  const {guitarraUrl} = params
  const guitarra = await getGuitarra(guitarraUrl)

  return guitarra.data[0].attributes
}

function Guitarra() {

  const guitarra = useLoaderData()
  const {nombre, descripcion, precio, imagen} = guitarra

  return (
    <main className="contenedor guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
      </div>
    </main>
  )
}

export default Guitarra
