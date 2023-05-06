import express from "express";
import {
  getClientsContact,
  addClientsContact,
  getFooterContact,
  addFooterContact
} from "../controllers/client.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/clientsContact", checkAuth('superadmin'), getClientsContact);
router.post("/clientsContact", addClientsContact);

router.get("/footerContact", checkAuth('superadmin'), getFooterContact);
router.post("/footerContact", addFooterContact);

export default router;