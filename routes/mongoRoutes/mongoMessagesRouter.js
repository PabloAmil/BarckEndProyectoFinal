import { Router } from "express";
import MessagesDAO from "../../src/dao/mongoDbManagers/messagesDbManager.js";

const router = Router();

router.get("/", async (req, res) => {

  try {
    const messages = await MessagesDAO.getAll();
    res.render("chat", { messages });
  } catch (e) {
    console.log(`Cannot get messages`, e)
  }
})


export default router;
