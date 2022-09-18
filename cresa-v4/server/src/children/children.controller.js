const Joi = require('joi')
const Children = require('./children.model')
exports.Register = async (req, res) => {
  const children = Joi.object().keys({
    name: Joi.string().required(),
    dateofbirth: Joi.date().required(),
    gender: Joi.string().required(),
    chronicdieses: Joi.string().required(),
    bloodgroup: Joi.string().required()
  })
  try {
    const { id } = req.decoded
    const result = children.validate(req.body)
    if (result.error) {
      console.log(result.error.message)
      return res.json({
        error: true,
        status: 400,
        message: result.error.message
      })
    }
    result.value.userId = id
    console.log('result.value', result.value)
    const newChildren = new Children(result.value)
    await newChildren.save()
    return res.send({ success: true, message: 'Succesfully registered' })
  } catch (error) {
    console.error('register-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.getChildren = async (req, res) => {
  try {
    const { id } = req.decoded
    let children = await Children.find({ userId: id })
    if (!children) {
      return res.status(400).json({
        error: true,
        message: 'Please logout & Login again'
      })
    }

    return res.send({ success: true, message: 'success', children: children })
  } catch (error) {
    console.error('user-logout-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.UpdateChildren = async (req, res) => {
  const childrenV = Joi.object().keys({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    dateofbirth: Joi.date().required(),
    gender: Joi.string().required(),
    userId: Joi.string().required(),
    bloodgroup: Joi.string().required(),
    chronicdieses: Joi.string().required(),
    __v: Joi.string().required()
  })
  try {
    // const { _id, name, dateofbirth, gender } = req.body
    const result = childrenV.validate(req.body)
    console.log({ result })
    const children = await Children.findOne({ _id: result.value._id })
    if (!children) {
      return res.send({
        error: true,
        message: 'Error Found.'
      })
    }

    children.name = result.value.name
    children.dateofbirth = result.value.dateofbirth
    children.gender = result.value.gender
    children.userId = req.decoded.id

    const rez = await children.save()
    return res.send({
      success: true,
      message: 'success'
    })
  } catch (error) {
    console.error('children-update-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.DeleteChildren = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(403).json({
        error: true,
        message: "Couldn't process request. Please provide all mandatory fields"
      })
    }
    // const children = await Children.findOneAndRemove({ _id: id })

    Children.findOneAndRemove({ _id: id }, err => {
      if (err) {
        return res.send({
          error: true,
          message: 'Error Found.'
        })
      }
    })

    return res.send({
      success: true,
      message: 'success'
    })
  } catch (error) {
    console.error('children-delete-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}
