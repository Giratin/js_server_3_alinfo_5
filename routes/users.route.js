const express = require("express");
const router = express.Router();

const { getAll, createUser, getUserById, updateUser, deleteUserById, createUserAsync } = require('../controllers/users.controller');

router.route('/')
  .get(getAll)
  .post(createUser);

  router.post('/create', createUserAsync)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUserById);



module.exports = router;