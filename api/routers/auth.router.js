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
 *           description: The date the user was updated
 *       example:
 *         id: 1
 *         name: Test User
 *         email: testuser@example.com
 *         firebase_token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ZjM4ODM0NjhmYzY1OWF
 *         created_at: 2023-04-06T12:21:27.000Z
 *         updated_at: 2024-02-01T11:03:55.000Z
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
const config = require('../../config/config');

router.post("/sign-up", createUser);
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
        const message = "Email is incorrect!";
        return errorResponse(res, 401, false, message);
      }

      // check password
      if (result) {
        var roleId = 3;
        var configSuperAdminEmail1 = config.super_admin_email1; //"sharanveerk@bootesnull.com";
        var configSuperAdminEmail2 = config.super_admin_email2; //"sharan@bootesnull.com";
        if (
          configSuperAdminEmail1 == result[0].email ||
          configSuperAdminEmail2 == result[0].email
        ) {
          var roleId = 1;
        }
        const token = jwt.sign(
          {
            email: result[0].email,
            userId: result[0].id,
            role: roleId
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
      const message = "Email is incorrect!";
      return errorResponse(res, 401, false, message);
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
