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
 *         profile_image:
 *           type: string
 *           description: User profile image URI
 *         document:
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

router.get("/list", userController.userList);
router.post(
  "/edit-user-details",
  middleware.isLoggedIn,
  userController.editUserDetails
);
router.post(
  "/user-update-status",
  middleware.isLoggedIn,
  userController.userUpdateStatus
);
router.get(
  "/test-permission",
  middleware.isLoggedIn,
  userController.checkPermissionTest
);

module.exports = router;
