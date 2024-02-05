const router = require("express").Router()
const leaveTypeController = require("../controllers/leaves/leave_type.controller")
const leaves = require("../controllers/leaves//leave.controller")
const middleware = require("../middleware/auth")
const path = require("path")
const multer  = require('multer')

const storage = multer.diskStorage({

    destination: './public/documents',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)   
    }
})

const upload = multer({
    storage: storage
})

/**
 * @swagger
 * components:
 *   tags:
 *     name: Leave Type
 *     description: API endpoints for managing roles
 *   schemas:
 *     LeaveType:
 *       type: object
 *       required:
 *         - leave_type_name
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the leave type
 *         leave_type_name:
 *           type: string
 *           description: Name of the leave type
 *         is_paid:
 *           type: string
 *           description: If the leave is paid or not, possible values "yes" or "no"
 *         allow_number_of_leaves:
 *           type: number
 *           description: Allowed number of leaves
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the role was created
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the role was last updated
 *       example:
 *         id: 1
 *         leave_type_name: Test Leave Type
 *         is_paid: yes
 *         allow_number_of_leaves: 10
 *         status: 1
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
 */

//Route for  roles 
/**
 * @swagger
 * /leaves/leave-type/store:
 *   post:
 *     summary: Create a new leave type
 *     tags: [Leave Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leave_type_name:
 *                type: string
 *                example: Test Leave Type
 *                description: Leave type name
 *               is_paid:
 *                type: string
 *                example: no
 *                description: If the leave is paid or not, possible values "yes" or "no"
 *               allow_number_of_leaves:
 *                type: number
 *                example: 10
 *                description: Allowed number of leaves
 *     responses:
 *       201:
 *         description: On successful leave type creation.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 201
 *               success:
 *                type: boolean
 *                example: true
 *               message:
 *                type: string
 *                example: Leave type has been saved successfully.
 *       400:
 *         description: When a leave type with the same name already exist.
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
 *                example: Duplicate entry 'Test Leave Type' for key 'leave_types.leave_type_name'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/leave-type/store', middleware.isLoggedIn, leaveTypeController.storeLeaveType)
router.get('/leave-type/view', middleware.isLoggedIn, leaveTypeController.viewLeaveType)
router.put('/leave-type/edit', middleware.isLoggedIn, leaveTypeController.editLeaveType)
router.put('/leave-type/status-change', middleware.isLoggedIn, leaveTypeController.statusChangeLeaveType)
router.get('/leave-type/list', middleware.isLoggedIn, leaveTypeController.listLeaveType)

router.post('/leaves/store', middleware.isLoggedIn, upload.single('documents'), leaves.storeLeave)
router.get('/leaves/view', middleware.isLoggedIn, leaves.viewLeave)
router.get('/leaves/list', middleware.isLoggedIn, leaves.listLeave)
router.put('/leaves/status-change', middleware.isLoggedIn, leaves.statusChangedLeave)
router.put('/leaves/edit', middleware.isLoggedIn, upload.single('documents'), leaves.editLeave)
router.put('/leaves/leave-approve', middleware.isLoggedIn, leaves.approveLeave)
router.get('/leaves/user-by-leave', middleware.isLoggedIn, leaves.userByLeave)
router.delete('/leaves/delete-leave', middleware.isLoggedIn, leaves.deleteLeave)

router.post('/leave-type/test-upload', upload.single('documents'), leaveTypeController.testUploadImage)


module.exports = router; 