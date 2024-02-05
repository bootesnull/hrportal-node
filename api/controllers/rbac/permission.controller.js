const { json } = require("express/lib/response");
const pool = require("../../../config/database");
const config = require("../../../config/config");
const rbacServices = require("../../services/rbac.service");
const errorResponse = require("../../services/errorResponse.service");
const successResponse = require("../../services/successResponse.service");

const collect = require("collect.js");

module.exports = {
  storePermission: async (req, res) => {
    if (req.body.permission_name) {
      let body = req.body;
      rbacServices.permissionNameExist(
        req.body.permission_name,
        async (err, results) => {
          if (err) {
            const message = "Something went wrong!";
            return errorResponse(res, 500, false, message);
          }
          if (results) {
            const message = "Permission has been already created!";
            return errorResponse(res, 400, false, message);
          } else {
            try {
              await rbacServices.storePermissionService(body);
              return res.status(201).json({
                statusCode: 201,
                success: true,
                message: "Permission has been created successfully.",
              });
            } catch (error) {
              const message = "Something went wrong!";
              return errorResponse(res, 500, false, message);
            }
          }
        }
      );
    } else {
      const message = "Permission name can not be empty!";
      return errorResponse(res, 400, false, message);
    }
  },

  permissionList: async (req, res) => {
    try {
      const dataResponse = await rbacServices.permissionListService();
      if (dataResponse) {
        return res.status(200).json({
          statusCode: 200,
          success: true,
          message: "Permissions fetched successfully.",
          data: dataResponse,
        });
      } else {
        const message = "Something went wrong!";
        return errorResponse(res, 500, false, message);
      }
    } catch (error) {
      const message = "Something went wrong!";
      return errorResponse(res, 500, false, message);
    }
  },
  permissionViewById: async (req, res) => {
    try {
      let id = req.query.id;
      const viewResponse = await rbacServices.permissionViewService(id);
      if (viewResponse) {
        return res.status(200).json({
          statusCode: 200,
          success: true,
          message: "Permission has been fetched successfully.",
          data: viewResponse,
        });
      } else {
        const message = "Something went wrong!";
        return errorResponse(res, 500, false, message);
      }
    } catch (error) {
      const message = "Something went wrong!";
      return errorResponse(res, 500, false, message);
    }
  },
  permissionEdit: async (req, res) => {
    try {
      let body = req.body;
      const editResopnse = await rbacServices.permissionUpdateService(body);
      if (editResopnse) {
        return res.status(201).json({
          statusCode: 201,
          success: true,
          message: "Permission has been updated successfully.",
        });
      } else {
        const message = "Something went wrong!";
        return errorResponse(res, 500, false, message);
      }
    } catch (error) {
      const message = error.sqlMessage || "Something went wrong!";
      return errorResponse(res, 500, false, message);
    }
  },

  permissionUpdateStatus: async (req, res) => {
    try {
      let body = req.body;
      const statusResponse = await rbacServices.permissionChangeStatus(body);

      if (statusResponse) {
        return res.status(200).json({
          statusCode: 200,
          success: true,
          message: "Permission status has been changed successfully.",
        });
      } else {
        const message = "Something went wrong!";
        return errorResponse(res, 500, false, message);
      }
    } catch (error) {
      const message = "Something went wrong!";
      return errorResponse(res, 500, false, message);
    }
  },
};
