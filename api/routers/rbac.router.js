const router = require("express").Router()
const role = require("../controllers/rbac/role.controller")
const permission = require("../controllers/rbac/permission.controller")
const rolePermission = require("../controllers/rbac/role_permission.controller")
const assignRole = require("../controllers/rbac/assign_role.controller")
const userMiddleware = require('../middleware/auth')

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the role
 *         name:
 *           type: string
 *           description: Name of the role
 *         status:
 *           type: number
 *           description: Status of the role
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
 *         name: Test Role
 *         status: 1
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - permission_name
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the role
 *         permission_name:
 *           type: string
 *           description: Name of the role
 *         parent:
 *           type: number
 *           description: Parent role ID
 *         status:
 *           type: number
 *           description: Status of the role
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
 *         name: Test Role
 *         status: 1
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API endpoints for managing roles
 */

//Route for  roles 
/**
 * @swagger
 * /rbac/role/store:
 *   post:
 *     summary: Endpoint for creating a role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *                example: Test Role
 *                description: Role name
 *     responses:
 *       201:
 *         description: On successful role creation.
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
 *                example: Role has been created successfully.
 *       400:
 *         description: When no role name is sent or role with same name already exist.
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
 *                example: Role has been already created!
 *       401:
 *         description: When user's session is expired.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 401
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Your session is not valid!
 *       403:
 *         description: When logged in user is not an admin user.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 403
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Not authorized!
 *
 *       500:
 *         description: Some server error.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: number
 *                example: 500
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: message
 *                example: Something went wrong!
 *
 */
router.post('/role/store',userMiddleware.isAdmin,role.createRole);

/**
 * @swagger
 * /rbac/role/list:
 *   get:
 *     summary: Endpoint for getting a list of all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: On successfully getting a list of roles.
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
 *                example: Roles fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/Role'
 *       401:
 *         description: When user's session is expired.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 401
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Your session is not valid!
 *       403:
 *         description: When logged in user is not an admin user.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 403
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Not authorized!
 *
 *       500:
 *         description: Some server error.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: number
 *                example: 500
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: message
 *                example: Something went wrong!
 *
 */
router.get('/role/list',userMiddleware.isAdmin,role.getAllRole)

/**
 * @swagger
 * /rbac/role/edit:
 *   post:
 *     summary: Endpoint for editing a role
 *     tags: [Roles]
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
 *                description: Role ID
 *               name:
 *                type: string
 *                example: Test Role
 *                description: Role name
 *     responses:
 *       200:
 *         description: On successful edit of role.
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
 *                example: Role has been updated successfully.
 *       401:
 *         description: When user's session is expired.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 401
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Your session is not valid!
 *       403:
 *         description: When logged in user is not an admin user.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 403
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Not authorized!
 *
 *       500:
 *         description: Some server error.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: number
 *                example: 500
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: message
 *                example: Something went wrong!
 *
 */
router.post('/role/edit',userMiddleware.isAdmin,role.roleEdit)

/**
 * @swagger
 * /rbac/role/view?id=1:
 *   get:
 *     summary: Endpoint for a single role by id
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Numeric ID of the role to get.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: On successfully getting the role.
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
 *                example: Role has been fetched successfully.
 *               data:
 *                  $ref: '#/components/schemas/Role'
 *       401:
 *         description: When user's session is expired.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 401
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Your session is not valid!
 *       403:
 *         description: When logged in user is not an admin user.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 403
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Not authorized!
 *
 *       500:
 *         description: Some server error.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: number
 *                example: 500
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: message
 *                example: Something went wrong!
 *
 */
router.get('/role/view',userMiddleware.isAdmin,role.viewRoleById)

/**
 * @swagger
 * /rbac/role/update-status:
 *   put:
 *     summary: Endpoint for updating role status
 *     tags: [Roles]
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
 *                description: Role ID
 *               value:
 *                type: number
 *                example: 1
 *                description: New value for status
 *     responses:
 *       200:
 *         description: On successful update of role status.
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
 *                example: Role status has been updated successfully.
 *       401:
 *         description: When user's session is expired.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 401
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Your session is not valid!
 *       403:
 *         description: When logged in user is not an admin user.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 403
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Not authorized!
 *
 *       500:
 *         description: Some server error.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: number
 *                example: 500
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: message
 *                example: Something went wrong!
 *
 */
router.put('/role/update-status',userMiddleware.isAdmin,role.changeStatus)
// router.delete('/role/delete',userMiddleware.isAdmin,deleteRole)

 //Route for permissions 
router.post('/permission/store', userMiddleware.isAdmin, permission.storePermission)
router.get('/permission/list', userMiddleware.isAdmin, permission.permissionList)
router.get('/permission/get-by-id', userMiddleware.isAdmin, permission.permissionViewById)
router.post('/permission/edit', userMiddleware.isAdmin, permission.permissionEdit)
router.put('/permission/update-status', userMiddleware.isAdmin, permission.permissionUpdateStatus)

// //Rout role permisssion
router.get('/allow-role-permission',userMiddleware.isAdmin,rolePermission.ListRolePermission);
router.post('/allow-role-permission/store',userMiddleware.isAdmin,rolePermission.storeRolePermission);
router.get('/allow-role-permission/view',userMiddleware.isAdmin,rolePermission.viewRolePermission);
router.post('/allow-role-permission/edit',userMiddleware.isAdmin,rolePermission.editRolePermission);
router.put('/allow-role-permission/update-status',userMiddleware.isAdmin,rolePermission.updateStatusRolePermission);
// router.delete('/allow-role-permission/delete',userMiddleware.isAdmin,deleteAllowRolePermission);


// //Route for assign role of users
router.post("/assign-role/assign", userMiddleware.isAdmin,assignRole.assignRoleToUser)
router.get("/assign-role/edit-role", userMiddleware.isAdmin,assignRole.editAssignRole)
// router.delete("/remove-role", userMiddleware.isAdmin,removeRole)


module.exports = router; 