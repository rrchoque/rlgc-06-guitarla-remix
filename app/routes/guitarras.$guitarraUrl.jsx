import { useLoaderData } from "@remix-run/react"
import { getGuitarra } from "../models/guitarras.server"

export function meta({data}) {

  if (!data) {
    return [
      { title: `GuitarLA - Guitarra No Encontrada` },
      { description: `Guitarras, venta de guitarras, guitarra no encontrada` }
    ];
  }

  return [
      { title: `GuitarLA - Guitarra ${data.nombre}` },
      { description: `Guitarras, venta de guitarras, guitarra ${data.nombre}` }
      
  ];
}

export async function loader({params}) {

  const {guitarraUrl} = params
  const guitarra = await getGuitarra(guitarraUrl)

  if (guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra No Encontrada'
    })
  }

  return guitarra.data[0].attributes
}

function Guitarra() {

  const guitarra = useLoaderData()
  const {nombre, descripcion, precio, imagen} = guitarra

  return (
    <div className="contenedor guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select name="cantidad" id="cantidad">
            <option value="">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input 
            type="submit"
            value="Agregar al carrito"
          />
        </form>
      </div>
    </div>
  )
}

export default Guitarra
