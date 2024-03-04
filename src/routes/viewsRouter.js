import { Router } from "express";
import { __dirname } from "../utils.js";
import productManager from '../ProductManager.js';

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    let products = productManager.getProducts().map((x) => {
        return {id: x.id, title: x.title, pair: Object.keys(x).map((obj, i) => {return {key: toTitleCase(obj), value:Object.values(x)[i]}})}
    });
    res.render("home", {product: products});
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    let products = productManager.getProducts().map((x) => {
        return {id: x.id, title: x.title, pair: Object.keys(x).map((obj, i) => {return {key: toTitleCase(obj), value:Object.values(x)[i]}})}
    });
    res.render("realTimeProducts",{product: products});
});

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

export default viewsRouter;