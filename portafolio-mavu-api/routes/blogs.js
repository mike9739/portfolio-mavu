const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blog');
const { checkJwt,checkRole} = require('../controllers/auth')

router.get('/',blogsController.getBlogs);
router.get('/me', checkJwt,checkRole('admin'),blogsController.getBlobByUser);
router.get('/:id',blogsController.getBlogById);
router.get('s/:slug',blogsController.getBlogBySlug);


router.post('/',checkJwt,checkRole('admin'),blogsController.saveBlog);
router.patch('/:id',checkJwt,checkRole('admin'),blogsController.updateBlog);
router.delete('/:id',checkJwt,checkRole('admin'),blogsController.deleteBlog);

module.exports = router;

