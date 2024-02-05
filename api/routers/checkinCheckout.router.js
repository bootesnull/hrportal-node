const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const userMiddleware = require('../middleware/auth');
const {userCheckIn,userCheckOut} = require('../controllers//users/checkInCheckout.controller');
// const collect = require('collect.js');

/**
 * @swagger
 * tags:
 *   name: Checkin Checkout
 *   description: API endpoints for checkin and checkout
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
 *                example: Session expired!
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
 * /checkin-checkout/checkin:
 *   post:
 *     summary: Checkin
 *     tags: [Checkin Checkout]
 *     responses:
 *       201:
 *         description: On successful checkin.
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
 *                example: Checkin successful
 *               checkInTime:
 *                type: string
 *                example: 14:23:03
 *       401:
 *        $ref: '#/components/responses/Unauthenticated'                
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/checkin', userMiddleware.isLoggedIn, userCheckIn);

/**
 * @swagger
 * /checkin-checkout/checkout:
 *   post:
 *     summary: Checkout
 *     tags: [Checkin Checkout]
 *     responses:
 *       201:
 *         description: On successful checkout.
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
 *                example: Checkout successful
 *               checkoutTime:
 *                type: string
 *                example: 17:23:03
 *       401:
 *        $ref: '#/components/responses/Unauthenticated' 
 *                
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post('/checkout', userMiddleware.isLoggedIn, userCheckOut);

module.exports = router; 