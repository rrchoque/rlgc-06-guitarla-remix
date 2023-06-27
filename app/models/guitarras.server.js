export async function getGuitarras(params) {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
    const resultado = await respuesta.json()
    return resultado;
}