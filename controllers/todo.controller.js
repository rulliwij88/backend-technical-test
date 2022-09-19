const db = require('../models')
const moment = require('moment-timezone')
class TodoController {
  async getAll (req, res, next) {
    const limit = 10
    let responseData = {}
    if (req.query.activity_group_id) {
      const checkActivityGroupId = await db.activity.findOne({where:{id:req.query.activity_group_id}, limit:1})
      if (checkActivityGroupId == null) {
        return res.status(200).json({status:'Success',message:'Success',data:[]})
      }
      const data = await db.todo.findAll({
        attributes:['id','title','activity_group_id','is_active','priority'],
        where:{activity_group_id: req.query.activity_group_id},
        limit:limit
      })
      responseData = {
        limit: limit,
        skip: 0,
        data
      }
    } else {
      const data = await db.todo.findAll({
        attributes:['id','title','activity_group_id','is_active','priority'],
        limit:limit
      })
      responseData = {
        limit: limit,
        skip: 0,
        data
      }
    }
    return res.status(200).json({status:'Success',message:'Success',data:responseData})
  }
  
  async getDetail (req, res, next) {
    const data = await db.todo.findOne({where:{id:req.params.id}, limit:1})
    if (data == null) {
      return res.status(404).json({status:'Not Found', message:`Todo with ID ${req.params.id} Not Found`})
    }
    return res.status(200).json({status:'Success',message:'Success',data:data})
  }
  
  async create (req, res, next) {
    const {activity_group_id, title, priority, is_active} = req.body
    if (activity_group_id == undefined) {
      return res.status(400).json({ status:'Bad Request', message: 'activity_group_id cannot be null'})
    }
    if (title == undefined) {
      return res.status(400).json({ status:'Bad Request', message: 'title cannot be null'})
    }
    await db.todo.create({activity_group_id,title,priority,is_active
    }).then(async (response) => {
      return res.status(201).json({ status:'Success', message:'Success', data:response})
    })
    .catch((err) => {
      return res.status(400).json({status:'Bad Request', message:`Bad Request`, data:err.toJSON()})
    })
  }
  
  async delete (req, res, next) {
    try {
      const checkId = await db.todo.findOne({where:{id:req.params.id}, limit:1})
      if (checkId != null) {
        await db.todo.destroy({where:{id:req.params.id}})
        return res.status(200).json({status:'Success',message:'Success',data:{}})
      } else {
        return res.status(404).json({status:'Not Found', message:`Todo with ID ${req.params.id} Not Found`})
      }
    } catch (error) {
      return res.status(400).json({status:'Bad request', message:error.message})
    }
  }
  
  async update (req, res, next) {
    try {
      const {title, priority, is_active} = req.body
      const checkId = await db.todo.findOne({where:{id:req.params.id}, limit:1})
      if (checkId == null) {
        return res.status(404).json({status:'Not Found', message:`Todo with ID ${req.params.id} Not Found`})
      }
      const updatedData = await db.todo.update({title,priority,is_active,updatedAt:moment()}, {where:{id:req.params.id}})
      if (updatedData == false) {
        throw new Error(`Failed to update Todo with ID ${req.params.id}`)
      } else {
        const data = await db.todo.findOne({where:{id:req.params.id}, limit:1})
        return res.status(200).json({status:'Success',message:'Success',data:data})
      }
    } catch (error) {
      return res.status(400).json({status:'Bad request', message:error.message})
    }
  }
}
module.exports = new TodoController()
