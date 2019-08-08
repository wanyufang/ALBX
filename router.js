// 引入express
const express = require('express');
// 引入router
const router = express.Router();
// 引入页面返回控制器
const pagesController = require('./controllers/pagesController');
const userController = require('./controllers/userController');
const postsController = require('./controllers/postsController');
const cateController = require('./controllers/cateController');

// 配置路由
// 前台页面
router.get('/',pagesController.getIndexPage);
router.get('/detail',pagesController.getDetailPage);
router.get('/list',pagesController.getListPage);

// 后台页面
router.get('/admin/categories',pagesController.getAdminCategoriesPage);
router.get('/admin/comments',pagesController.getAdminCommentsPage);
router.get('/admin/index',pagesController.getAdminIndexPage);
router.get('/admin/login',pagesController.getAdminLoginPage);
router.get('/admin/nav-menus',pagesController.getAdminNavPage);
router.get('/admin/password',pagesController.getAdminPasswordPage);
router.get('/admin/post-add',pagesController.getAdminPostaddPage);
router.get('/admin/posts',pagesController.getAdminPostsPage);
router.get('/admin/profile',pagesController.getAdminProfilePage);
router.get('/admin/settings',pagesController.getAdminSettingsPage);
router.get('/admin/slides',pagesController.getAdminSlidesPage);
router.get('/admin/users',pagesController.getAdminUsersPage);


// 业务处理路由
router.post('/login',userController.login);
router.get('/getAllPost',postsController.getAllPost);
router.get('/getAllCate',cateController.getAllCate);


// 暴露router
module.exports = router;