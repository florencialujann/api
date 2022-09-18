const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares/validateToken')

const PediatricController = require('../src/pediatric/pediatric.controller')

router.post('/', validateToken, PediatricController.Register)
router.get('/', validateToken, PediatricController.getPediatric)
router.patch('/', validateToken, PediatricController.UpdatePediatric)
router.delete('/:id', validateToken, PediatricController.DeletePediatric)
module.exports = router
