import express from 'express';
import { userRegisteration, userLogin, userLogout } from '../controllers/index.js';
import { authSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { userRegisterationSchema, userLoginSchema } = authSchemas;
const { BODY } = REQUEST_PROPERTY;

router.post('/register', JoiValidator(userRegisterationSchema, BODY), userRegisteration);
router.post('/login', JoiValidator(userLoginSchema, BODY), userLogin);
router.post('/logout', userLogout);

export const authRouter = router;
