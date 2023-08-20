import { Router } from "express";

import plants from "./plants.route";

const router = Router();

router.use("/plants", plants);

export default router;
