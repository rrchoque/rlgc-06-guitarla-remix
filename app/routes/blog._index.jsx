import { useLoaderData } from "@remix-run/react"
import { getPosts } from "../models/posts.server"
import ListadoPost from "../components/listado-post";

export function meta() {
  return [
      { title: "GuitarLA - Nuestro Blog" },
      { description: 'GuitarLA, Venta de guitarras, blog de música' }
  ];
}

export async function loader() {
  const posts = await getPosts()
  return posts.data
}

function Blog() {
  const posts = useLoaderData()

  return (
      <ListadoPost 
        posts={posts}
      />
  )
}

export default Blog
