/**
 * @swagger
 * components:
 *   schemas:
 *     User Details:
 *       type: object
 *       required:
 *         - user_id
 *         - personal_email
 *         - phone
 *         - gender
 *         - date_of_birth
 *         - position
 *         - qualification
 *         - maritial_status
 *         - date_of_joining
 *         - blood_group
 *         - permanent_address
 *         - current_address
 *         - profile_image
 *         - document
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user detail entry
 *         personal_email:
 *           type: string
 *           description: The personal email address of the user
 *         phone:
 *           type: number
 *           description: Phone number of the user
 *         gender:
 *           type: string
 *           description: Gender of the user
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user
 *         position:
 *           type: string
 *           description: The position of the user
 *         qualification:
 *           type: string
 *           description: Qualification of the user
 *         maritial_status:
 *           type: string
 *           description: Maritial status of the user
 *         date_of_joining:
 *           type: string
 *           format: date
 *           description: Date of joining of the user
 *         blood_group:
 *           type: string
 *           description: Blood group of the user
 *         permanent_address:
 *           type: string
 *           description: Permanent Address of the user
 *         current_address:
 *           type: string
 *           description: Current Address of the user
 *         profile_imag:
 *           type: string
 *           description: User profile image URI
 *         documents:
 *           type: array
 *           items:
 *             type: string
 *           description: User profile image URI
 *       example:
 *         id: 1
 *         user_id: 1
 *         personal_email: testuser@example.com
 *         phone: 9867564567
 *         gender: Male
 *         date_of_birth: 2/2/2001
 *         position: Backend Developer
 *         qualification: MCA
 *         maritial_status: Single
 *         date_of_joining: 2/2/2018
 *         blood_group: O+
 *         permanent_address: 65/71, Haji Kasam Bldg, 2nd Kumbharwada, Kumbharwada
 *         current_address: 81/2rt, Prakash Nagar Opp Airport, Begumpet
 *         profile_imag: https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw17V1H1Y_xabPtooNB83Bfe&ust=1706939756392000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIDz6aH8i4QDFQAAAAAdAAAAABAE
 *         documents: ["document-1-uri", "document-2-uri"]
 */

const router = require("express").Router();
const middleware = require("../middleware/auth");
// const {createUser, getUserById, userLogin,userList,editUserDetails,userUpdateStatus} = require("../controllers/users/user.controller");
const userController = require("../controllers/users/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Get list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: On successfully getting a list of users.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 200
 *               success:
 *                type: boolean
 *                example: true
 *               message:
 *                type: string
 *                example: success
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/User'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get("/list", userController.userList);

/**
 * @swagger
 * /user/edit-user-details:
 *   post:
 *     summary: Edit user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User Details'
 *     responses:
 *       200:
 *         description: On successful edit of user details.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 200
 *               success:
 *                type: boolean
 *                example: true
 *               message:
 *                type: string
 *                example: User details have been edited successfully.
 *       400:
 *         description: When no user exist for the provided user ID.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 400
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: User id does not exist!
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post(
  "/edit-user-details",
  middleware.isLoggedIn,
  userController.editUserDetails
);

/**
 * @swagger
 * /user/user-update-status:
 *   post:
 *     summary: Update task status
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                type: string
 *                example: Example Project
 *               working_hours:
 *                type: number
 *                example: 5
 *               description:
 *                type: string
 *                example: Example project description.
 *               ticket_number:
 *                type: array
 *                items:
 *                  type: string
 *                  example: "T1"
 *     responses:
 *       200:
 *         description: On successful update of task status.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 200
 *               success:
 *                type: boolean
 *                example: true
 *               message:
 *                type: string
 *                example: Status has been updated successfully.
 *       400:
 *         description: When rquired values are not provided in request body.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 400
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Please provide all values.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post(
  "/user-update-status",
  middleware.isLoggedIn,
  userController.userUpdateStatus
);

/**
 * @swagger
 * /user/test-permission?permission=view:
 *   get:
 *     summary: Check if permission is granted to the user or not
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: permission
 *         required: true
 *         description: Name of the permission to check.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: If permission is granted.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 200
 *               success:
 *                type: boolean
 *                example: true
 *               message:
 *                type: string
 *                example: Permission granted.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *        description: If permission is not granted.
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get(
  "/test-permission",
  middleware.isLoggedIn,
  userController.checkPermissionTest
);

module.exports = router;
