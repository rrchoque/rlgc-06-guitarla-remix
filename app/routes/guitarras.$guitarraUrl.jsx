import { useLoaderData, useOutletContext } from "@remix-run/react"
import { getGuitarra } from "../models/guitarras.server"
import { useState } from "react";

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

  return {id: guitarra.data[0].id, ...guitarra.data[0].attributes}
}

function Guitarra() {
  const {agregarCarrito} = useOutletContext();

  const [cantidad, setCantidad] = useState(0)

  const guitarra = useLoaderData()
  const {id, nombre, descripcion, precio, imagen} = guitarra

  const handleSubmit = e => {
    e.preventDefault();

    if (cantidad < 1) {
      alert('La cantidad minima es uno (1)')
      return
    }

    const guitarraSeleccionada = {
      id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada)
  }

  return (
    <div className="contenedor guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select 
            name="cantidad" 
            id="cantidad"
            onChange={e => setCantidad(parseInt(e.target.value))}
          >
            <option value="0">-- Seleccione --</option>
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
