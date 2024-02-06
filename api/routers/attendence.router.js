const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/auth');
const attendenceController = require("../controllers/attendence/attendence.controller")

/**
 * @swagger
 * components:
 *   tags:
 *    name: Attendance
 *    description: API endpoints for managing attendance
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Date of attendance
 *         checkin:
 *           type: string
 *           format: date
 *           description: Date and time of checkin
 *         checkout:
 *           type: string
 *           format: date
 *           description: Date and time of checkout
 *         hours:
 *           type: number
 *           description: Total number of hours
 *       example:
 *         date: 2024-02-05T18:30:00.000Z
 *         checkin: 2024-02-06 13:23:21
 *         checkout: 2024-02-06 14:25:05
 *         hours: 1
 */

/**
 * @swagger
 * /attendence/attendence-per-user:
 *   get:
 *     summary: Get currently logged in user's attendance
 *     tags: [Attendance]
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
 *                example: User's attendence fetched successfully.
 *               data:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/Attendance'
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.get('/attendence-per-user', userMiddleware.isLoggedIn, attendenceController.userAttendence);

module.exports = router; 