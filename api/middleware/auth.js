const jwt = require("jsonwebtoken");
const collect = require('collect.js');
const config = require("../../config/config");
module.exports = {
  validateRegister: (req, res, next) => {

 
    // username min length 3
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        message: 'Please enter a username with min. 3 chars'
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        message: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        message: 'Both passwords must match'
      });
    }

    next();
  },

    isLoggedIn: (req, res, next) => {
  
        try {
            const token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(
                token,
                'SECRETKEY'
                );
                req.userData = decoded;
              
            next();
            } catch (err) {
            return res.status(401).send({
              statusCode:401,
              success:false,
              message: 'Your session is not valid!'
            });
        }
    },

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     * @param {next} next 
     * @returns authorized  admin 
     * check url for admin by auth token 
     * @author sharanveer kannaujiya
     */

    isAdmin: (req, res, next) => {

      try {
          const token = req.headers.authorization.split(' ')[1];
          
          const decoded = jwt.verify(
              token,
              'SECRETKEY'
              );
              req.userData = decoded;
              let roleId = decoded.role;
              // let collection = collect(decoded.role);
              // collection.dd();
              // let authEmail = decoded.email;
              // let  configEmail = config.super_admin_email1;
              // let  configEmail = config.super_admin_email1;
              if(roleId !== 1){
                return res.status(403).send({
                  statusCode:403,
                  success:false,
                  message: 'Not authorized!'
                });
              }
              next();
          } catch (err) {
            return res.status(401).send({
              statusCode:401,
              success:false,
              message: 'Your session is not valid!'
            });
          }
    }


};