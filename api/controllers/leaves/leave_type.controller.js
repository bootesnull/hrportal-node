const leaveService = require("../../services/leave.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/documents' })
const collect = require('collect.js');

module.exports = {

    storeLeaveType: async(req,res)=>{
        try {
            let body = req.body
            if(body.leave_type_name && body.is_paid && body.allow_number_of_leaves){
                let storeResponse = await leaveService.createLeaveType(body)
               
                if(storeResponse){
                    return res.status(201).json({
                        statusCode:201,
                        success:true,
                        message:"Leave type has been saved successfully.",
                    });
                }
            }else{
                let message = "Please provide all values.";
                return errorResponse(res,400,false,message);
            }
        } catch (error) {
            console.log(error);
            let message = error.sqlMessage || "Something went wrong!";
            const statusCode = error.code === 'ER_DUP_ENTRY' ? 400 : 500;
            return errorResponse(res,statusCode,false,message);
        }
    },
    viewLeaveType : async(req,res)=>{
        try {
            let id = req.query.id
            if(id){
                let viewLeaveTypeResponse = await leaveService.getLeaveType(id)
               
                if(viewLeaveTypeResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"Leave type has been fetched successfully.",
                        data: viewLeaveTypeResponse
                    });
                }else{
                    let message = `No leave type with id ${id}.`;
                    return errorResponse(res,400,false,message); 
                }
            }else{
                let message = "Please provide leave type ID.";
                return errorResponse(res,400,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    editLeaveType: async(req,res)=>{
        try {
            let body = req.body
            if(body.id && body.leave_type_name && body.is_paid && body.allow_number_of_leaves){
                let checkIdExist = await leaveService.getLeaveType(body.id)
                if(checkIdExist){
                    let editLeaveTypeResponse = await leaveService.updateLeaveType(body)
                    if(editLeaveTypeResponse){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"Leave type has been updated successfully.",
                        });
                    }else{
                        let message = "Something went wrong!";
                        return errorResponse(res,500,false,message); 
                    }
                }else{
                    let message = `No leave type with id ${body.id}.`;
                    return errorResponse(res,400,false,message); 
                }
            } else {
                let message = "Please provide all values.";
                return errorResponse(res,400,false,message);
            }

        } catch (error) {
            console.log(error);
            let message = error.sqlMessage || "Something went wrong!";
            const statusCode = error.code === 'ER_DUP_ENTRY' ? 400 : 500;
            return errorResponse(res,statusCode,false,message); 
        }
    },
    listLeaveType : async(req,res)=>{
    try {
            let viewLeaveTypeResponse = await leaveService.getLeaveType()
            if(viewLeaveTypeResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"leave type has been fetched successfully.",
                    data: viewLeaveTypeResponse
                });
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,500,false,message); 
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    statusChangeLeaveType : async(req,res)=>{
        try {
                let body = req.body
                if(body.id && body.value !== undefined){
                    let statusUpdateResponse = await leaveService.statusUpdateLeaveType(body)
                    if(statusUpdateResponse.affectedRows){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"Leave type status has been changed successfully.",
                        });
                    }else{
                        let message = `No leave type with id ${body.id}.`;
                        return errorResponse(res,400,false,message); 
                    }
                }else{
                    let message = "Please provide all values.";
                    return errorResponse(res,400,false,message); 
                }
            } catch (error) {
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message); 
            }
        },

        testUploadImage : async(req,res)=>{
            try {
                // let body = req.file
                var host = req.get('host');
                let imageUrl = `${host}/public/document/${req.file.filename}`
                let debug = collect(imageUrl)
                debug.dd()
                if(body.id){
                    let statusUpdateResponse = await leaveService.statusUpdateLeaveType(body)
                    if(statusUpdateResponse !== null){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"leave type status has been changed successfully.",
                        });
                    }else{
                        let message = "Id does not exist!";
                        return errorResponse(res,500,false,message); 
                    }
                }else{
                    let message = "Id does not exist!";
                    return errorResponse(res,500,false,message); 
                }
            } catch (error) {
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message); 
            }
        }
}