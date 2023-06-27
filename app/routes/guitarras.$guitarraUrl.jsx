import { useLoaderData } from "@remix-run/react"
import { getGuitarra } from "../models/guitarras.server"

export async function loader({params}) {

  const {guitarraUrl} = params
  const guitarra = await getGuitarra(guitarraUrl)

  return guitarra.data[0].attributes
}

function Guitarra() {

  const guitarra = useLoaderData()
  console.log(guitarra)

  return (
    <div>
      $guitarraUrl
    </div>
  )
}

export default Guitarra
