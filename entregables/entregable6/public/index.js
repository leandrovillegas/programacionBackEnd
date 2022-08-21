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


const addProduct = (e) => {

    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const thumbnail = document.querySelector('#thumbnail').value;

    const producto = { title, price, thumbnail };
    server.emit('producto-nuevo', producto)
    return false;
}

const addMsj = (e) => {
    
    const email = document.querySelector('#email').value;
    const mensaje = document.querySelector('#msj').value;
    //const thumbnail= document.querySelector('#thumbnail').value;

    const msj = { email, mensaje };
    server.emit('mensaje-nuevo', msj)
    return false;
}

const renderMsj = (msj) => {
    let listMsj = document.querySelector('#listMsj')
    if (msj.length != 0) {
        let html = msj.map(mensaje => {
            return `<li class="list-group-item">
             <FONT COLOR="BLUE">${mensaje.email}  
             <FONT COLOR="RED">[${mensaje.fyh}]
             <FONT COLOR="GREEN">: ${mensaje.mensaje}</li>`
        }).join(' ')
        listMsj.innerHTML = html;
    }
}

server.on('mensaje-servidor', (data) => {
    renderProd(data.productos)
    renderMsj(data.mensajes)
})