const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares/validateToken')

const ChilderenController = require('../src/children/children.controller')

router.post('/', validateToken, ChilderenController.Register)
router.get('/', validateToken, ChilderenController.getChildren)
router.patch('/', validateToken, ChilderenController.UpdateChildren)
router.delete('/:id', validateToken, ChilderenController.DeleteChildren)

module.exports = router
