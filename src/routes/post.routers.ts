import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { Role } from "../models/User";
import { saveRoom } from "../controllers/rooms.controller";
import { savePackage } from "../controllers/pacage.controller";

const route = Router()

route.post(
    "/createRoom",
    authenticate,
    requireRole([Role.ADMIN, Role.AUTHOR]),
    saveRoom
)

route.post(
    "/createPackage",
    authenticate,
    requireRole([Role.ADMIN, Role.AUTHOR]),
    savePackage
)
export default route