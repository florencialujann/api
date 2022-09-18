const Joi = require('joi')
const Pediatric = require('./pediatric.model')
exports.Register = async (req, res) => {
  const pediatric = Joi.object().keys({
    children: Joi.string().required(),
    dateofrecord: Joi.date().required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
    headdiameter: Joi.number(),
    observations: Joi.string().required(),
    prescriptiondrug: Joi.string().required(),
    medicalstudies: Joi.string().required(),
    results: Joi.string().required()
  })
  try {
    const { id } = req.decoded
    const result = pediatric.validate(req.body)
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
    const newPediatric = new Pediatric(result.value)
    await newPediatric.save()
    return res.send({ success: true, message: 'Succesfully registered' })
  } catch (error) {
    console.error('user-logout-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.getPediatric = async (req, res) => {
  try {
    const { id } = req.decoded
    let pediatric = await Pediatric.find({ userId: id })
    if (!pediatric) {
      return res.status(400).json({
        error: true,
        message: 'Please logout & Login again'
      })
    }

    return res.send({ success: true, message: 'success', pediatric: pediatric })
  } catch (error) {
    console.error('user-logout-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.UpdatePediatric = async (req, res) => {
  try {
    const {
      dateofrecord,
      _id,
      children,
      weight,
      height,
      headdiameter,
      observations,
      prescriptiondrug,
      medicalstudies,
      result
    } = req.body

    const pediatric = await Pediatric.findOne({ _id: _id })
    if (!pediatric) {
      return res.send({
        error: true,
        message: 'Error Found.'
      })
    }
    pediatric.children = children
    pediatric.dateofrecord = dateofrecord
    pediatric.weight = weight
    pediatric.height = height
    pediatric.headdiameter = headdiameter
    pediatric.observations = observations
    pediatric.prescriptiondrug = prescriptiondrug
    pediatric.medicalstudies = medicalstudies
    pediatric.result = result

    pediatric.userId = req.decoded.id
    await pediatric.save()

    return res.send({
      success: true,
      message: 'success'
    })
  } catch (error) {
    console.error('pediatric-update-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.DeletePediatric = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(403).json({
        error: true,
        message: "Couldn't process request. Please provide all mandatory fields"
      })
    }

    Pediatric.findOneAndRemove({ _id: id }, err => {
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
    console.error('pediatric-delete-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}
