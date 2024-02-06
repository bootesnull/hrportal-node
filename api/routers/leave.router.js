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
 *     Leave:
 *       type: object
 *       required:
 *         - leave_type_name
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the leave
 *         leaves_id:
 *           type: number
 *           description: ID of the leave
 *         leave_type_id:
 *           type: number
 *           description: ID of the leave type
 *         leave_type_name:
 *           type: string
 *           description: Name of the leave type
 *         user_id:
 *           type: number
 *           description: ID of the user
 *         approver:
 *           type: number
 *           description: ID of the user who approved the leave
 *         is_paid:
 *           type: string
 *           description: If the leave is paid or not, possible values "yes" or "no"
 *         allow_number_of_leaves:
 *           type: number
 *           description: Allowed number of leaves
 *         formatedFromDate:
 *           type: string
 *           format: date
 *           description: Formatted start date of the leave
 *         formatedToDate:
 *           type: string
 *           format: date
 *           description: Formatted end date of the leave
 *         formatedApplyDate:
 *           type: string
 *           format: date
 *           description: Formatted apply date of the leave
 *         from_date:
 *           type: string
 *           format: date
 *           description: Unformatted from date of the leave
 *         to_date:
 *           type: string
 *           format: date
 *           description: Unformatted to date of the leave
 *         reasons:
 *           type: string
 *           description: Reason for the leave
 *         document:
 *           type: string
 *           description: URI of the leave document
 *         approved_by:
 *           type: string
 *           description: Name of the user who approved the leave
 *         total_leaves_days:
 *           type: number
 *           description: Total number of leave days
 *         leave_status:
 *           type: string
 *           description: Status of the leave. Possible values are pending, approved and rejected
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
 *         leaves_id: 1
 *         user_id: 1
 *         approver: 5
 *         formatedFromDate: 06/02/2024
 *         formatedToDate: 07/02/2024
 *         formatedApplyDate: 06/02/2024
 *         from_date: 2024-02-05T18:30:00.000Z
 *         to_date: 2024-02-06T18:30:00.000Z
 *         reasons: Example leave reason.
 *         document: localhost:3000/documents/documents_1707195438187.png
 *         leave_type_name: Test Leave Type
 *         is_paid: yes
 *         allow_number_of_leaves: 10
 *         approved_by: Test User
 *         total_leaves_days: 1
 *         leave_status: pending
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

/**
 * @swagger
 * /leaves/leave-type/view?id=1:
 *   get:
 *     summary: Get leave type by id
 *     tags: [Leave Type]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Numeric ID of the leave type to get.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: On successfully getting the leave type.
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
 *                example: Leave type has been fetched successfully.
 *               data:
 *                  $ref: '#/components/schemas/LeaveType'
 *       400:
 *         description: When no leave type ID is sent or no leave type exist for the provided ID.
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
 *                example: Please provide leave type ID. or No leave type with id 1.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/leave-type/view', middleware.isLoggedIn, leaveTypeController.viewLeaveType)

/**
 * @swagger
 * /leaves/leave-type/edit:
 *   put:
 *     summary: Edit a leave type
 *     tags: [Leave Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                example: 1
 *                description: Leave Type ID
 *               leave_type_name:
 *                type: string
 *                example: Test Leave Type
 *                description: Leave type name
 *               is_paid:
 *                type: string
 *                example: "no"
 *                description: If the leave is paid or not, possible values "yes" or "no"
 *               allow_number_of_leaves:
 *                type: number
 *                example: 5
 *                description: Allowed number of leaves
 *     responses:
 *       200:
 *         description: On successful edit of leave type.
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
 *                example: Leave type has been updated successfully.
 *       400:
 *         description: When required values are not sent or no leave type exist for the provided ID or a leave type with the same name already exist.
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
 *                example: Please provide all values. or No leave type with id 1. or Duplicate entry 'Test Leave Type' for key 'leave_types.leave_type_name'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/leave-type/edit', middleware.isLoggedIn, leaveTypeController.editLeaveType)

/**
 * @swagger
 * /leaves/leave-type/status-change:
 *   put:
 *     summary: Update leave type status
 *     tags: [Leave Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                example: 1
 *                description: ID of the leave type
 *               value:
 *                type: number
 *                example: 1
 *                description: New value for the status
 *     responses:
 *       200:
 *         description: On successful update of leave type status.
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
 *                example: Leave type status has been changed successfully.
 *       400:
 *         description: When required values are not sent or no leave type exist for the provided ID.
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
 *                example: Please provide all values. or No leave type with id 1.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/leave-type/status-change', middleware.isLoggedIn, leaveTypeController.statusChangeLeaveType)

/**
 * @swagger
 * /leaves/leave-type/list:
 *   get:
 *     summary: Get list of all leave types
 *     tags: [Leave Type]
 *     responses:
 *       200:
 *         description: On successfully getting a list of leave types.
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
 *                example: Leave types fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/LeaveType'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/leave-type/list', middleware.isLoggedIn, leaveTypeController.listLeaveType)

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: API endpoints for managing leaves
 */

/**
 * @swagger
 * /leaves/leaves/store:
 *   post:
 *     summary: Create a new leave
 *     tags: [Leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               leave_type_id:
 *                type: number
 *                example: 1
 *                description: ID of the leave type
 *               from_date:
 *                type: string
 *                format: date
 *                example: 6/2/2024
 *                description: Start date of leave
 *               to_date:
 *                type: string
 *                format: date
 *                example: 6/2/2024
 *                description: End date of leave
 *               reasons:
 *                type: string
 *                example: Feeling sick.
 *                description: Reason for the leave
 *               documents:
 *                type: string
 *                format: binary
 *     responses:
 *       201:
 *         description: On successful leave creation.
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
 *                example: Leave has been saved successfully.
 *       400:
 *         description: When required values are not provided or When no leave type exist for the provided leave type ID or When selected file is not of .png, .jpg or .jpeg format.
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
 *                example: Please provide all values. or Selected leave type does not exist! or Only .png, .jpg and .jpeg format allowed!
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/leaves/store', middleware.isLoggedIn, upload.single('documents'), leaves.storeLeave)

/**
 * @swagger
 * /leaves/leaves/view:
 *   get:
 *     summary: Get leave by id
 *     tags: [Leaves]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Numeric ID of the leave to get.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: On successfully getting the leave.
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
 *                example: Leave data has been fetched successfully.
 *               data:
 *                  $ref: '#/components/schemas/Leave'
 *       400:
 *         description: When leave ID is not provided or When no leave exist for the provided leave ID.
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
 *                example: Please provide leave ID. or No leave with ID 100.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/leaves/view', middleware.isLoggedIn, leaves.viewLeave)

/**
 * @swagger
 * /leaves/leaves/list:
 *   get:
 *     summary: Get list of all leaves
 *     tags: [Leaves]
 *     responses:
 *       200:
 *         description: On successfully getting a list of leaves.
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
 *                example: Leaves data has been fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/Leave'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/leaves/list', middleware.isLoggedIn, leaves.listLeave)

/**
 * @swagger
 * /leaves/leaves/status-change:
 *   put:
 *     summary: Update leave status
 *     tags: [Leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                example: 1
 *                description: ID of the leave
 *               value:
 *                type: number
 *                example: 1
 *                description: New value for the status
 *     responses:
 *       200:
 *         description: On successful update of leave status.
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
 *                example: Leave status has been changed successfully.
 *       400:
 *         description: When required values are not sent or no leave exist for the provided ID.
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
 *                example: Please provide all values. or No leave with id 100.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/leaves/status-change', middleware.isLoggedIn, leaves.statusChangedLeave)

/**
 * @swagger
 * /leaves/leaves/edit:
 *   put:
 *     summary: Edit a leave
 *     tags: [Leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               leave_id:
 *                type: number
 *                example: 1
 *                description: ID of the leave
 *               leave_type_id:
 *                type: number
 *                example: 1
 *                description: ID of the leave type
 *               from_date:
 *                type: string
 *                format: date
 *                example: 6/2/2024
 *                description: Start date of leave
 *               to_date:
 *                type: string
 *                format: date
 *                example: 6/2/2024
 *                description: End date of leave
 *               reasons:
 *                type: string
 *                example: Feeling sick.
 *                description: Reason for the leave
 *               documents:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *         description: On successful leave update.
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
 *                example: Leave has been updated successfully.
 *       400:
 *         description: When required values are not provided or When no leave type exist for the provided leave type ID or When selected file is not of .png, .jpg or .jpeg format or When no leave exist for the provided leave ID.
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
 *                example: Please provide all values. or Selected leave type does not exist! or Only .png, .jpg and .jpeg format allowed! or No leave with ID 100.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/leaves/edit', middleware.isLoggedIn, upload.single('documents'), leaves.editLeave)

/**
 * @swagger
 * /leaves/leaves/leave-approve:
 *   put:
 *     summary: Approve leave
 *     tags: [Leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                type: number
 *                example: 1
 *                description: ID of the leave
 *     responses:
 *       200:
 *         description: On successful update of leave status.
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
 *                example: Leave has been approved successfully.
 *       400:
 *         description: When leave ID is not provided or no leave exist for the provided ID.
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
 *                example: Please provide leave ID. or No leave with id 100.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/leaves/leave-approve', middleware.isLoggedIn, leaves.approveLeave)
router.get('/leaves/user-by-leave', middleware.isLoggedIn, leaves.userByLeave)
router.delete('/leaves/delete-leave', middleware.isLoggedIn, leaves.deleteLeave)

router.post('/leave-type/test-upload', upload.single('documents'), leaveTypeController.testUploadImage)


module.exports = router; 