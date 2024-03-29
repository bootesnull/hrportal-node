var express = require('express')
var router = express.Router()
const usersRouter = require("../api/routers/user.router")
const authRouter = require("../api/routers/auth.router")
const checkinCheckout = require("../api/routers/checkinCheckout.router")
const leaveRouter = require("../api/routers/leave.router")
// const interviewRouter = require("../api/routers/interview.router")
const attendenceRouter = require("../api/routers/attendence.router")
// const assignRole = require("../api/routers/admin.router")
const rbac = require("../api/routers/rbac.router")

const acl = require('express-acl');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api',authRouter);

router.use('/api/checkin-checkout',checkinCheckout);
router.use('/api/attendence',attendenceRouter);

router.use('/api/rbac',rbac);

router.use("/api/user",usersRouter);

router.use("/api/leaves",leaveRouter);

// router.use("/api/interview",interviewRouter);

module.exports = router;
