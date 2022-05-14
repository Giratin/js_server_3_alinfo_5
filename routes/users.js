var express = require('express');
const { getAll, createUser, getUserById, updateUser, deleteUserById } = require('../controllers/users.controller');
var router = express.Router();

/**
 * @Path /users
*/

// router.get('/', getAll(req,res,next));
// router.post('/', create);

router.route('/')
  .get(getAll)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUserById);



module.exports = router;
