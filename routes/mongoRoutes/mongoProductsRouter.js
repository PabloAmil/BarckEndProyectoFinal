import { Router } from "express";
import ProductsDAO from "../../src/dao/mongoDbManagers/productsDbManager.js";
import upload from "../../utils/upload.middlewares.js";

const router = Router();


router.get("/", async (req, res) => {
  let withStock = req.query.stock;
  
  let products;
  
  if (withStock === undefined) {
    products = await ProductsDAO.getAll();
  } else {
    products = await ProductsDAO.getAllWithStock();
  }
  
  res.render("products", { products });
})

router.get("/admin-update/:id", async (req, res) => {

  let id = req.params.id;

  res.render("productUpdate", {id});
})

router.get("/new", (req, res) => {
  res.render("new-product");
})

router.get("/:id", async (req, res) => {

  let id = req.params.id;
  if (!id) {
    res.redirect("/");
  }
  let product = await ProductsDAO.getById(id);
  if (!product) {
    res.render("404");
  }
  res.render('product', {
    title: product.title,
    description: product.description,
    price: product.price,
    photo: product.photo,
    isStock: product.stock > 0
  });
})

router.post("/", upload.single('image'), async (req, res)=>{
  let filename = req.file.filename;
  let product = req.body; 

  await ProductsDAO.add( product.title, product.description, product.code, product.price, product.status, product.stock, product.category, filename);
  res.redirect("/");
})

router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.render("products");
    }
    await ProductsDAO.remove(id);
    res.json({ success: true, message: 'Product deletion success' });
  } catch (e) {
    console.error('Error while trying to delete product:', e);
    res.status(500).json({ success: false, message: 'Error while trying to delete product' });
  }
})



// router.put("/admin-update/:id", upload.single('image'), async (req, res) => {

//   let filename = req.file.filename;
//   let product = req.body; 
//   let id = req.params.id;

//   console.log(id)

//   let data = {
//     ...product, filename
//   };

//   console.log(data);

//   try {
//     if (!id) {
//       return res.render("products");
//     }

//     await ProductsDAO.update(id, data);
//     res.json({ success: true, message: 'Product update success' });
//   } catch (e) {
//     console.error('Error while trying to delete product:', e);
//     res.status(500).json({ success: false, message: 'Error while trying to update product' });
//   }
// })

export default router;



// https://github.com/PabloAmil/BarckEndProyectoFinal