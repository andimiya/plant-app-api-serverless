import { Router } from "express";
import plants from "./plants.route";
import books from "./books.route";
const router = Router();

router.use("/books", books);

router.use("/plants", plants);

export default router;
