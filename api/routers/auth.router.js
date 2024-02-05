/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - firebase_token
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         firebase_token:
 *           type: string
 *           description: Firebase token of the user
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 *       example:
 *         id: 1
 *         name: Test User
 *         email: testuser@bootesnull.com
 *         firebase_token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ZjM4ODM0NjhmYzY1OWF
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
 * 
 * tags:
 *   name: Auth
 *   description: API endpoints for authentication
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
const { createUser } = require("../controllers/users/user.controller");
const userMiddleware = require("../middleware/auth");
const errorResponse = require("../services/errorResponse.service");
const dateTime = require("node-datetime");
const dt = dateTime.create();
const created = dt.format("Y-m-d H:M:S");
const collect = require("collect.js");
// const acl = require('express-acl');
// let collection = collect(acl);
// collection.dd();
const config = require("../../config/config");

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *                example: Test User
 *               email:
 *                type: string
 *                example: testuser@bootesnull.com
 *               firebase_token:
 *                type: string
 *                example: eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ZjM4ODM0NjhmYzY1OWF
 *     responses:
 *       201:
 *         description: On successful signup.
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
 *                example: Employee created successfully
 *               data:
 *                type: object
 *                properties:
 *                  name:
 *                   type: string
 *                   example: Test User
 *                  email:
 *                   type: string
 *                   example: testuser@bootesnull.com
 *                  token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJhbnZlZXJra2sxQGJvb3Rlc251bGwuY29tIiwidXNlcklkIjo5LCJyb2xlIjozLCJpYXQiOjE3MDY4NTg1NTgsImV4cCI6MTcwNzQ2MzM1OH0.fPPB0isWs761XXKPI4Q3WS3OAQDJx5d-4BEQbkS0twc
 *
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post("/sign-up", createUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                type: string
 *                example: testuser@bootesnull.com
 *     responses:
 *       200:
 *         description: On successful login.
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
 *               token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJhbnZlZXJrQGJvb3Rlc251bGwuY29tIiwidXNlcklkIjoxLCJyb2xlIjoxLCJpYXQiOjE3MDY4NTY4NjMsImV4cCI6MTcwNzQ2MTY2M30.UVKLnBmNQuWKgEBxxBVFyRAPMMwfC6Ntm5Ah59PSmoc
 *               user:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: When credentials are invalid.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                type: number
 *                example: 400
 *               success:
 *                type: boolean
 *                example: false
 *               message:
 *                type: message
 *                example: Invalid credentials!
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ?`,
    [req.body.email],
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return errorResponse(res, 400, false, err);
      }
      if (!result.length) {
        const message = "Invalid credentials!";
        return errorResponse(res, 400, false, message);
      }

      // check password
      if (result) {
        let roleId = 3;
        if(result[0].role) {
          roleId = +result[0].role;
        }
        const token = jwt.sign(
          {
            email: result[0].email,
            userId: result[0].id,
            role: roleId,
          },
          "SECRETKEY",
          {
            expiresIn: "7d",
          }
        );
        db.query(
          `INSERT INTO user_tokens (user_id, token, created_at,updated_at) VALUES (?,?,?,?)`,
          [result[0].id, token, created, created]
        );
        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: "success",
          token,
          user: result[0],
        });
      }
      const message = "Invalid credentials!";
      return errorResponse(res, 400, false, message);
    }
  );
});

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  return res.status(200).send({
    statusCode: 200,
    success: true,
    message: "Authorized!",
  });
});
module.exports = router;
