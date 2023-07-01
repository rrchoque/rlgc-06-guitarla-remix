import { getGuitarras } from '~/models/guitarras.server';
import { getPosts } from '~/models/posts.server';
import { useLoaderData } from '@remix-run/react';
import ListadoGuitarras from '~/components/listado-guitarras';
import ListadoPost from '~/components/listado-post';
import stylesGuitarras from '~/styles/guitarras.css'
import stylesBlog from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'
import { getCurso } from '~/models/curso.server';
import Curso from '~/components/curso';

export function meta() {
  return [
      { title: `GuitarLA - Inicio` },
      { description: `Guitarras, venta de guitarras` }
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesBlog
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader() {

  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])

  return {
    guitarras : guitarras.data, 
    posts: posts.data,
    curso: curso.data.attributes
  }
}

function Index() {

  const {guitarras, posts, curso} = useLoaderData();

  return (
    <>
    | <main className="contenedor">
        <ListadoGuitarras 
          guitarras={guitarras}
        />
      </main>

      <Curso 
        curso={curso}
      />

      <section className="contenedor">
        <ListadoPost
          posts={posts}
        />
      </section>
    </>
  )
}

export default Index
