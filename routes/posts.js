const express = require('express');
const Post = require('../models/posts');
const User = require('../models/users');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
// 建立router實體
const router = express.Router();

router.get('/', handleErrorAsync(async (req, res, next) => {
  const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
  const search = {};
  search.content = new RegExp(req.query.q);
  const post = await Post.find(search).populate({
    path: 'user',
    select: 'name photo',
  }).sort(timeSort);
  res.status(200).json({
    'status': 'success',
    'data': post,
  })
}))
router.post('/', handleErrorAsync(async (req, res, next) => {
  const data = req.body;
  const newPost = await Post.create(data);
  res.status(200).json({
    'status': 'success',
    'data': newPost,
  })
}))
router.delete('/', handleErrorAsync(async (req, res, next) => {
  const newPost = await Post.deleteMany({});
  res.status(200).json({
    'status': 'success',
    'data': await Post.find(),
  })
}))
router.delete('/:id', handleErrorAsync(async (req, res, next) => {
  const id = req.params.id;
  const newPost = await Post.findByIdAndDelete(id);
  if (newPost === null) {
    return appError(400, '查無此id', next);
  }
  res.status(200).json({
    'status': 'success',
    'data': await Post.find(),
  })
}))
router.patch('/:id', handleErrorAsync(async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const newPost = await Post.findByIdAndUpdate(id, data, {
    runValidators: true
  });
  if (newPost === null) {
    return appError(400, '查無此id', next);
  }
  res.status(200).json({
    'status': 'success',
    'data': await Post.find(),
  })
}))

module.exports = router;