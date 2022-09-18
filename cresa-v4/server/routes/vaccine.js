const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares/validateToken')

const VaccineController = require('../src/vaccine/vaccine.controller')

router.post('/', validateToken, VaccineController.Registervaccine)
router.get('/', validateToken, VaccineController.getVaccines)
router.patch('/', validateToken, VaccineController.Update)
router.delete('/:id', validateToken, VaccineController.Delete)

module.exports = router
