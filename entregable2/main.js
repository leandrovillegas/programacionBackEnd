const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');



//contenedor.save({title: 'Lo que no te contaron', price: 200.17, thumbnail: 'https://contentv2.tap-commerce.com/cover/large/9789502809489_1.jpg?id_com=1113'});  
//contenedor.retornarId(1);
contenedor.getAll();
contenedor.deleteById(1); 
contenedor.deleteAll();