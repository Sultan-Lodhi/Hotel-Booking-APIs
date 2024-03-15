import express from 'express';
import { userRegisteration, userLogin, userLogout } from '../controllers/index.js';
import { authSchemas } from '../schemas/index.js';
import { JoiValidator } from '../middlewares/index.js';
import { REQUEST_PROPERTY } from '../constants/index.js';

const router = express.Router();

const { userRegisterationSchema, userLoginSchema } = authSchemas;
const { BODY } = REQUEST_PROPERTY;

/**
 * @openapi
 * '/hotel/bookings/api/auth/register':
 *  post:
 *     tags:
 *     - User Auth APIs
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - userName
 *              - email
 *              - mobile
 *              - password
 *              - confirmPassword
 *              - isAdmin
 *            properties:
 *              userName:
 *                type: string
 *                default: Sultan Lodhi
 *              email:
 *                type: string
 *                default: isultanlodhi@mail.com
 *              mobile:
 *                type: string
 *                default: 789736787
 *              password:
 *                type: string
 *                default: sultan20!@
 *              confirmPassword:
 *                type: string
 *                default: sultan20!@
 *              isAdmin:
 *                type: integer
 *                default: 0
 *     responses:
 *      200:
 *        description: Ok
 *      400:
 *        description: Passwords do not match
 *      422:
 *        description: User Already Exists
 *      500:
 *        description: Internal Server Error
 */
router.post('/register', JoiValidator(userRegisterationSchema, BODY), userRegisteration);

/**
 * @openapi
 * '/hotel/bookings/api/auth/login':
 *  post:
 *     tags:
 *     - User Auth APIs
 *     summary: User Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - userEmailMobile
 *              - password
 *            properties:
 *              userEmailMobile:
 *                type: string
 *                default: isultanlodhi@gmail.com/78675453
 *              password:
 *                type: string
 *                default: sultan20!@
 *     responses:
 *      200:
 *        description: Ok
 *      401:
 *        description: Invalid Credentials
 *      404:
 *        description: User Not Found
 *      500:
 *        description: Internal Server Error
 */
router.post('/login', JoiValidator(userLoginSchema, BODY), userLogin);

router.post('/logout', userLogout);

export const authRouter = router;
