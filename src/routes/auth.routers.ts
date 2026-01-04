import { Router } from "express"
import { getMyDetails, handelRefreshToken, logIn, register, sendOTP, verifyOTP } from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"



const router = Router()

router.post("/register", register)
router.post("/sendOTP",sendOTP)
router.post("/verifyOTP",verifyOTP)
router.post("/logIn", logIn)
router.post("/refresh", handelRefreshToken)
router.get("/me", authenticate, getMyDetails)


export default router