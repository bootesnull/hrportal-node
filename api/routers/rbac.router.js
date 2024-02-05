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
 *         permission_name: Test Permission
 *         parent: 1
 *         status: 1
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
 *     RolePermission:
 *       type: object
 *       required:
 *         - role_id
 *         - permission_id
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the RolePermission entry
 *         role_id:
 *           type: number
 *           description: ID of the role
 *         permission_id:
 *           type: number
 *           description: ID of the permission
 *         status:
 *           type: number
 *           description: Status of RolePermission entry
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the RolePermission entry was created
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the RolePermission entry was last updated
 *       example:
 *         id: 1
 *         role_id: 2
 *         permission_id: 5
 *         status: 1
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
 * 
 *   responses:
 *     Unauthenticated:
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
 *     Unauthorized:
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
 *     InternalServerError:
 *         description: Some server error.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: integer
 *                example: 500
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: string
 *                example: Something went wrong!
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
 *     summary: Create a new role
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
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/role/store',userMiddleware.isAdmin,role.createRole);

/**
 * @swagger
 * /rbac/role/list:
 *   get:
 *     summary: Get list of all roles
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
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/role/list',userMiddleware.isAdmin,role.getAllRole)

/**
 * @swagger
 * /rbac/role/edit:
 *   post:
 *     summary: Edit a role
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
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/role/edit',userMiddleware.isAdmin,role.roleEdit)

/**
 * @swagger
 * /rbac/role/view?id=1:
 *   get:
 *     summary: Get role by id
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
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/role/view',userMiddleware.isAdmin,role.viewRoleById)

/**
 * @swagger
 * /rbac/role/update-status:
 *   put:
 *     summary: Update role status
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
 *                description: New value for the status
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
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/role/update-status',userMiddleware.isAdmin,role.changeStatus)
// router.delete('/role/delete',userMiddleware.isAdmin,deleteRole)

 //Route for permissions 

 /**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: API endpoints for managing permissions
 */

/**
 * @swagger
 * /rbac/permission/store:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permission_name:
 *                type: string
 *                example: Test Permission
 *                description: Permission name
 *     responses:
 *       201:
 *         description: On successful permission creation.
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
 *                example: Permission has been created successfully.
 *       400:
 *         description: When no permission name is sent or permission with same name already exist.
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
 *                example: Permission name can not be empty! or Permission has been already created!
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/permission/store', userMiddleware.isAdmin, permission.storePermission)

/**
 * @swagger
 * /rbac/permission/list:
 *   get:
 *     summary: Get list of all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: On successfully getting a list of permissions.
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
 *                example: Permissions fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/Permission'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/permission/list', userMiddleware.isAdmin, permission.permissionList)

/**
 * @swagger
 * /rbac/permission/get-by-id?id=1:
 *   get:
 *     summary: Get permission by id
 *     tags: [Permissions]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Numeric ID of the permission to get.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: On successfully getting the permission.
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
 *                example: Permission has been fetched successfully.
 *               data:
 *                  $ref: '#/components/schemas/Permission'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/permission/get-by-id', userMiddleware.isAdmin, permission.permissionViewById)

/**
 * @swagger
 * /rbac/permission/edit:
 *   post:
 *     summary: Edit a permission
 *     tags: [Permissions]
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
 *                description: Permission ID
 *               permission_name:
 *                type: string
 *                example: Test Permission
 *                description: Permission name
 *     responses:
 *       200:
 *         description: On successful edit of permission.
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
 *                example: Permission has been updated successfully.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/permission/edit', userMiddleware.isAdmin, permission.permissionEdit)

/**
 * @swagger
 * /rbac/permission/update-status:
 *   put:
 *     summary: Update permission status
 *     tags: [Permissions]
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
 *                description: Permission ID
 *               value:
 *                type: number
 *                example: 1
 *                description: New value for the status
 *     responses:
 *       200:
 *         description: On successful update of permission status.
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
 *                example: Permission status has been changed successfully.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/permission/update-status', userMiddleware.isAdmin, permission.permissionUpdateStatus)

// Routes for role permisssion
 /**
 * @swagger
 * tags:
 *   name: Role Permission
 *   description: API endpoints for managing role permissions
 */

/**
 * @swagger
 * /rbac/allow-role-permission:
 *   get:
 *     summary: Get list of all permissions
 *     tags: [Role Permission]
 *     responses:
 *       200:
 *         description: On successfully getting a list of role permissions.
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
 *                example: Role Permission has been fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/RolePermission'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/allow-role-permission',userMiddleware.isAdmin,rolePermission.ListRolePermission);

/**
 * @swagger
 * /rbac/allow-role-permission/store:
 *   post:
 *     summary: Create a new role permission
 *     tags: [Role Permission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                type: number
 *                example: 1
 *                description: ID of the role
 *               permission_id:
 *                type: number
 *                example: 3
 *                description: ID of the permission
 *     responses:
 *       201:
 *         description: On successful role permission creation.
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
 *                example: Role Permission has been saved successfully.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/allow-role-permission/store',userMiddleware.isAdmin,rolePermission.storeRolePermission);

/**
 * @swagger
 * /rbac/allow-role-permission/view?id=1:
 *   get:
 *     summary: Get role permission by id
 *     tags: [Role Permission]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Numeric ID of the role permission to get.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: On successfully getting the role permission.
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
 *                example: Role Permission has been fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/RolePermission'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/allow-role-permission/view',userMiddleware.isAdmin,rolePermission.viewRolePermission);

/**
 * @swagger
 * /rbac/allow-role-permission/edit:
 *   post:
 *     summary: Edit a role permission
 *     tags: [Role Permission]
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
 *                description: ID of the role permission
 *               role_id:
 *                type: number
 *                example: 1
 *                description: ID of the role
 *               permission_id:
 *                type: number
 *                example: 2
 *                description: ID of the permission
 *     responses:
 *       200:
 *         description: On successful edit of role permission.
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
 *                example: Role Permission has been updated successfully.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/allow-role-permission/edit',userMiddleware.isAdmin,rolePermission.editRolePermission);

/**
 * @swagger
 * /rbac/allow-role-permission/update-status:
 *   put:
 *     summary: Update role permission status
 *     tags: [Role Permission]
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
 *                description: ID of the role permission
 *               value:
 *                type: number
 *                example: 1
 *                description: New value for the status
 *     responses:
 *       200:
 *         description: On successful update of role permission status.
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
 *                example: Role Permission status has been changed successfully.
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       403:
 *        $ref: '#/components/responses/Unauthorized'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.put('/allow-role-permission/update-status',userMiddleware.isAdmin,rolePermission.updateStatusRolePermission);
// router.delete('/allow-role-permission/delete',userMiddleware.isAdmin,deleteAllowRolePermission);


// //Route for assign role of users
router.post("/assign-role/assign", userMiddleware.isAdmin,assignRole.assignRoleToUser)
router.get("/assign-role/edit-role", userMiddleware.isAdmin,assignRole.editAssignRole)
// router.delete("/remove-role", userMiddleware.isAdmin,removeRole)


module.exports = router; 