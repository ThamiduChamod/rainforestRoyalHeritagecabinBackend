import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { Role } from "../models/User";
import { bookRoom, getMyBooking } from "../controllers/booking.controller";

const route = Router()

route.post(
    "/roomBook",
    authenticate,
    requireRole([Role.ADMIN, Role.AUTHOR, Role.USER]),
    bookRoom
)

route.get(
    "/getBookings",
    authenticate,
    requireRole([Role.ADMIN, Role.AUTHOR, Role.USER]),
    getMyBooking
)
export default route