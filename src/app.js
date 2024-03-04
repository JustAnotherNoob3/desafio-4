import express from 'express'
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import { __dirname } from './utils.js';
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import socketServerController from './socketServerController.js';

const port = 8030;
const app = express();

//main
console.log(__dirname);
const httpServer = app.listen(port, () => console.log("running"));

//websocket
const socketServer = new Server(httpServer);
socketServerController(socketServer);
app.set('socketio', socketServer);
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', `${__dirname}/views`);
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+"/public"));


//routers
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use(viewsRouter);





