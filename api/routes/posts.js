var express = require('express');
var router = express.Router();
var User=require('../../model/User');
var bcrypt=require('bcryptjs');
var checkauth=require('../middleware/check_auth');
var Post=require('../../model/Post');
router.get('/list',checkauth,function (req,res) {
  Post.find(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        post:rtn
      })
    }

  })

})
router.post('/add',checkauth,function (req,res) {
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;
  post.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(201).json({
        message:"Post Account Created!!",

        post:rtn
      })
    }

  })

})
router.get('/:id',function (req,res) {
Post.findById(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        message:"Post Detail",
      post:rtn
      })
    }

  })

})
router.patch('/:id',function (req,res) {
var update= {};
for(var opt of req.body){
  update[opt.proName]=opt.proValue
}
Post.findByIdAndUpdate(req.params.id,{$set:update},function (err,rtn) {
  if(err){
    res.status(500).json({
      message:"Internal Server Error",
      error:err

    })
  }else {
    res.status(200).json({
      message:"Post Account Created!!"
    })
  }

})

})
router.delete('/:id',function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
      message:"Post Account Deleted!!"
      })
    }

  })

})




module.exports = router;
