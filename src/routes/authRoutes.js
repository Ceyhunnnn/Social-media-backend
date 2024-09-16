const router = require("express").Router();
const {
  register,
  login,
  userInformations,
  userProfileUpdate,
} = require("./../controllers/authControllers");
const { getUserDataWithToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/login:
 *  post:
 *    description: This api for is login process
 *    summary: login to app
 *    requestBody:
 *      description: Optional description in *Markdown*
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    tags:
 *      - Auth
 *    responses:
 *      '200':
 *        description: login successfully
 */
/**
 * @swagger
 * /api/register:
 *  post:
 *    description: This api for is login process
 *    summary: register to app
 *    requestBody:
 *      description: Optional description in *Markdown*
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    tags:
 *      - Auth
 *    responses:
 *      '200':
 *        description: login successfully
 */
router.post("/login", login);
router.post("/register", register);
router.get("/userInformations", getUserDataWithToken, userInformations);
router.post("/userProfileUpdate/:id", userProfileUpdate);

module.exports = router;
