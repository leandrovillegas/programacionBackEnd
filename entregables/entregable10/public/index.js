const server = io().connect();


const renderProd = (productos) => {
    let listProd = document.querySelector('#listProd')
    if (productos.length != 0) {


        let html = productos.map(prod => {
            return `
        <tr>
        <th scope="row">${prod.id}</th>
        <td>${prod.title}</td>
        <td>${prod.price}</td>
        <td><img src=${prod.thumbnail}></td>
        </tr>`
        })
        listProd.innerHTML = html;
    }

}



const addMsj = (e) => {

    const email = document.querySelector('#email').value;
    const mensaje = document.querySelector('#msj').value;
    const nombre = document.querySelector('#name').value;
    const apellido = document.querySelector('#lastname').value;
    const edad = document.querySelector('#age').value;
    const alias = document.querySelector('#alias').value;
    const avatar = document.querySelector('#avatar').value;

    const msj = { 
        author: {email,nombre,apellido,edad,alias,avatar},
        mensaje:mensaje
     };
    server.emit('mensaje-nuevo', msj)
    return false;
}

const renderMsj = (msj) => {
    let listMsj = document.querySelector('#listMsj')
    if (msj.length !== 0) {
        let html = msj.map(mensaje => {
            return `<li class="list-group-item">
             <FONT COLOR="BLUE">${mensaje.author.email}  
             <FONT COLOR="RED">${mensaje.fyh}  
             <FONT COLOR="GREEN">: ${mensaje.mensaje}</li>
             <FONT COLOR="GREEN">: <img src=${mensaje.author.avatar}></li>`
             
        }).join(' ')
        listMsj.innerHTML = html;
    }
}

server.on('mensaje-servidor',  async (data) => {
    renderProd(data.productosGenerados)
    renderMsj(data.mensajes)
})