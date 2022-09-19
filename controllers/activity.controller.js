const db = require('../models')
const moment = require('moment-timezone')
class ActivityController {
  async getAll (req, res, next) {
    const limit = 10
    const data = await db.activity.findAll({
      attributes:['id','title','createdAt'],
      limit:limit
    })
    const responseData = {
      limit: limit,
      skip: 0,
      data
    }
    return res.status(200).json({status:'Success',message:'Success',data:responseData})
  }
  
  async getDetail (req, res, next) {
    const data = await db.activity.findOne({where:{id:req.params.id},limit:1})
    if (data == null) {
      return res.status(404).json({status:'Not Found', message:`Activity with ID ${req.params.id} Not Found`, data:{}})
    }
    return res.status(200).json({status:'Success',message:'Success',data:data})
  }
  
  async create (req, res, next) {
    try {
      const {email, title} = req.body
      if (title == undefined) {
        return res.status(400).json({status:'Bad Request', message:`title cannot be null`, data:{}})
      }
      await db.activity.create({email, title})
      .then(async (response) => {
        return res.status(201).json({ status:'Success', message:'Success', data:response})
      })
      .catch((err) => {
        return res.status(400).json({status:'Bad Request', message:`Bad Request`, data:err.toJSON()})
      })
    } catch (error) {
      return res.status(400).json({status:'Bad Request', message:`Bad Request`, data:err.message})
    }
  }
  
  async delete (req, res, next) {
    try {
      const checkId = await db.activity.findOne({where:{id:req.params.id},limit:1})
      if (checkId == null) {
        return res.status(404).json({status:'Not Found', message:`Activity with ID ${req.params.id} Not Found`, data:{}})
      }
      await db.activity.destroy({where:{id:req.params.id}})
      return res.status(200).json({status:'Success',message:'Success',data:{}})
    } catch (error) {
      return res.status(400).json({status:'Bad request', message:error.message, data:{}})
    }
  }
  
  async update (req, res, next) {
    try {
      const {title} = req.body
      if (title == undefined) {
        throw new Error('title cannot be null')
      }
      const checkId = await db.activity.findOne({where:{id:req.params.id},limit:1})
      if (checkId == null) {
        return res.status(404).json({status:'Not Found', message:`Activity with ID ${req.params.id} Not Found`, data:{}})
      }
      const updatedData = await db.activity.update({title, updatedAt:moment()}, {
        where:{id:req.params.id}
      })
      if (updatedData == false) {
        return res.status(400).json({status:'Bad request', message:`Failed to update Activity with ID ${req.params.id}`, data:{}})
        // throw new Error(`Failed to update Activity with ID ${req.params.id}`)
      } else {
        const data = await db.activity.findOne({where:{id:req.params.id},limit:1})
        return res.json({status:'Success', message:'Success', data:data})
      }
    } catch (error) {
      return res.status(400).json({status:'Bad request', message:error.message, data:{}})
    }
  }
}
module.exports = new ActivityController()
