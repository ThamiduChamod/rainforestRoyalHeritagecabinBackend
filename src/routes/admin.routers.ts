import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { Role } from "../models/User";
import { authorRegister } from "../controllers/Admin.controller";
import { saveRoom } from "../controllers/rooms.controller";

const route = Router()

route.post(
    "/registerAuthor",
    authenticate,
    requireRole([Role.ADMIN]),
    authorRegister
)



export default route