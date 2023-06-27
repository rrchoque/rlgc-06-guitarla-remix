import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
  return [
      { title: "GuitarLA - Sobre Nostros" },
      { description: 'Venta de guitarras, blog de música' }
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />

        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto possimus sunt obcaecati molestias eos excepturi, illo asperiores eius atque similique magnam odio modi. At dolores, excepturi itaque alias et repudiandae, Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aliquid repellat ut veritatis repellendus odit, consequatur quibusdam earum. Velit perspiciatis voluptates corporis eaque magni commodi consequuntur aspernatur ab quas adipisci!.
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corporis perspiciatis pariatur. Ut sint eveniet odit, est eligendi unde velit facilis beatae excepturi delectus ullam minima veniam molestiae, deleniti libero?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quis quisquam blanditiis libero doloribus? Eos veniam earum, veritatis asperiores repellendus mollitia. Maxime libero tempore provident eligendi, molestiae nobis similique neque.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
