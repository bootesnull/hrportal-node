const leaveService = require("../../services/leave.service")
const errorResponse = require("../../services/errorResponse.service")
const express = require('express')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/documents' })
const collect = require('collect.js');

module.exports = {

    storeLeave: async(req,res)=>{
        let body = req.body
        if(body.leave_type_id && body.from_date && body.to_date && body.reasons && body.reasons && req.file) {
            try {
                var host = req.get('host');
                let imageUrl = `${host}/documents/${req.file.filename}`
                let imageAcceptedType = req.file.mimetype
                if(imageAcceptedType == "image/png" || imageAcceptedType == "image/jpeg" || imageAcceptedType == "image/jpg" ){
                    let userId = req.userData.userId
                    let checkIdExist = await leaveService.getLeaveType(req.body.leave_type_id)
                    if(checkIdExist){
                            let storeResponse = await leaveService.createLeave(body, imageUrl,userId)
                            
                            if(storeResponse){
                                return res.status(201).json({
                                    statusCode:201,
                                    success:true,
                                    message:"Leave has been saved successfully.",
                                });
                            }
                    }else{
                        let message = "Selected leave type does not exist!";
                        return errorResponse(res,400,false,message);
                    }
                }else{
                    let message = "Only .png, .jpg and .jpeg format allowed!";
                    return errorResponse(res,400,false,message);
                }
            } catch (error) {
                console.log(error);
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } else {
            let message = "Please provide all values.";
            return errorResponse(res,400,false,message);
        }
    },
    viewLeave : async(req,res)=>{
        if(req.query.id) {
            try {
                let id = req.query.id
                let viewResponse = await leaveService.getByLeaveId(id)
                if(viewResponse){
                    return res.status(200).json({
                        statusCode:200,
                        success:true,
                        message:"Leave data has been fetched successfully.",
                        data: viewResponse
                    });
                }else{
                    let message = `No leave with ID ${id}.`;
                    return errorResponse(res,400,false,message); 
                }
            } catch (error) {
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message); 
            }
        } else {
            let message = "Please provide leave ID.";
            return errorResponse(res,400,false,message);
        }
    },

    listLeave : async(req,res)=>{
        try {
            let listResponse = await leaveService.getLeaves()
            if(listResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"Leaves data has been fetched successfully.",
                    data: listResponse
                });
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },
    editLeave: async(req,res)=>{
        let body = req.body
        if(body.leave_id && body.leave_type_id && body.from_date && body.to_date && body.reasons && body.reasons) {
            try {
                let userId = req.userData.userId
                let checkIdExist = await leaveService.getLeaveType(req.body.leave_type_id)
                if(checkIdExist){
                    let storeResponse;
                        if(req.file){
                            var host = req.get('host');
                            imageUrl = (req.file.filename !== "") ? `${host}/documents/${req.file.filename}` : "null"
                            storeResponse = await leaveService.updateLeave(body,userId,imageUrl)
                        }else{
                            storeResponse = await leaveService.updateLeave(body,userId)
                        }

                        if(storeResponse.affectedRows){
                            return res.status(200).json({
                                statusCode:200,
                                success:true,
                                message:"Leave has been updated successfully.",
                            });
                        } else {
                            let message = `No leave with ID ${body.leave_id}.`;
                            return errorResponse(res,400,false,message);
                        }
                }else{
                    let message = "Selected leave type does not exist!";
                    return errorResponse(res,400,false,message);
                }
            } catch (error) {
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message);
            }
        } else {
            let message = "Please provide all values.";
            return errorResponse(res,400,false,message);
        }

    },
    statusChangedLeave: async(req,res)=>{
        if(req.body.id && req.body.value) {
            try {
                let checkIdexist = await leaveService.getByLeaveId(req.body.id);
                if(checkIdexist){
                    let statusChangeResponse = await leaveService.statusUdateLeaves(req.body.id,req.body.value)
                    if(statusChangeResponse){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"Leave status has been changed successfully.",
                        });
                    }
                }else{
                    let message = `No leave with ID ${req.body.id}`;
                    return errorResponse(res,400,false,message); 
                }
            } catch (error) {
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message); 
            }
        } else {
            let message = "Please provide all values.";
            return errorResponse(res,400,false,message); 
        }
    },
    approveLeave: async(req,res)=>{
        let body = req.body;
        if(body.id) {
            try {
                let checkIdexist = await leaveService.getByLeaveId(body.id);
                if(checkIdexist){
                    let userId = req.userData.userId
                    let approveResponse = await leaveService.approveByApproverLeaves(body, userId)
                    if(approveResponse){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"Leave has been approved successfully.",
                        });
                    }
                }else{
                    let message = `No leave with ID ${body.id}.`;
                    return errorResponse(res,400,false,message); 
                }
            } catch (error) {
                let message = "Something went wrong!";
                return errorResponse(res,500,false,message); 
            }
        } else {
            let message = "Please provide leave ID.";
            return errorResponse(res,400,false,message); 
        }
    },
    testUploadImage : async(req,res)=>{
        try {
            let body = req.file
            let debug = collect(req.file, req.body)
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
    },
    userByLeave: async(req,res)=>{

        try {
            let userId = req.userData.userId
            let userLeaveResponse = await leaveService.geUserByLeaves(userId)
            if(userLeaveResponse){
                return res.status(200).json({
                    statusCode:200,
                    success:true,
                    message:"User leaves has been fetched successfully.",
                    data: userLeaveResponse
                });
            }else{
                let message = "Id does not exist!";
                return errorResponse(res,400,false,message);
            }
        } catch (error) {
            let message = "Something went wrong!";
            return errorResponse(res,500,false,message); 
        }
    },

    deleteLeave: async(req,res)=>{
        try {
            let id = req.query.id
            let userId = req.userData.userId
            let checkIdExist = await leaveService.getByLeaveId(id)
            if(checkIdExist.user_id == userId){
                if(checkIdExist.leave_status == "pending"){
                    let deleteResponse = await leaveService.leaveDelete(id,userId)
                    if(deleteResponse){
                        return res.status(200).json({
                            statusCode:200,
                            success:true,
                            message:"leave has been deleted successfully.",
                        });
                    }
                }else{
                    let message = "You can`t delete the leave after rejected or approved!";
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