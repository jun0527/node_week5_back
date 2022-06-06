const express = require('express');
const Post = require('../models/posts');
const User = require('../models/users');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const { getPosts, createdPosts, deleteAllPosts, deleteOnePosts, editPosts } = require('../controller/posts');
// 建立router實體
const router = express.Router();

router.get('/posts', handleErrorAsync(async (req, res, next) => {
  await getPosts(req, res, next);
}))
router.post('/post', handleErrorAsync(async (req, res, next) => {
  await createdPosts(req, res, next);
}))
router.delete('/posts', handleErrorAsync(async (req, res, next) => {
  await deleteAllPosts(req, res, next);
}))
router.delete('/post/:id', handleErrorAsync(async (req, res, next) => {
  await deleteOnePosts(req, res, next);
}))
router.patch('/post/:id', handleErrorAsync(async (req, res, next) => {
  await editPosts(req, res, next);
}))

module.exports = router;