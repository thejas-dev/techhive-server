const router = require('express').Router();
const {register,login,checkExist,editImage} = require('../controllers/userControllers');
const {create,editItem,getAllItems,uploadImage,deleteItem} = require('../controllers/itemControllers');

// POST methods

router.post('/register',register);
router.post('/login',login);
router.post('/create',create);
router.post('/uploadImage',uploadImage);
router.post('/editImage/:id',editImage);

// GET methods

router.get('/checkExist/:email',checkExist);
router.get('/getAllItems',getAllItems);

// PUT methods
router.put('/editItem/:id',editItem);

// DELETE methods

router.delete('/deleteItem/:id',deleteItem)


module.exports = router;