var fs = require('fs'),
   path = require('path'),
   sidebar = require('../helpers/sidebar'),
   Models = require('../models'),
   md5 = require('MD5');

var sidebar = require('../helpers/sidebar');

module.exports = {
       index: async function(req, res) {
              
              // find the image by searching the filename matching the url parameter:
               var image = await Models.Image.findOne({ filename: { $regex: req.params.image_id }});
               if(image){
                  image.views = image.views + 1;
                  var viewModel = getImageDetails();
                  viewModel.image = image;
                  image.save();

                  var comments = await Models.Comment.find({ image_id: image._id},{},{ sort: {'timestamp': 1 }});
                  viewModel.comments = comments;

                  viewModel = await sidebar(viewModel);
                  res.render('image', viewModel);

               }
               else {
                     // if no image was found, simply go back to the homepage:
                    res.redirect('/');
               }
     
       },
       create: function(req, res) {
              saveImage(req, res);
       },
       like: function(req, res) {
              incrementLikes(req, res);
       },
       comment: function(req, res) {
           postComment(req, res);
       }
};


async function incrementLikes(req, res){

      var image = await Models.Image.findOne({ filename: { $regex: req.params.image_id }});
      if(image){
          image.likes = image.likes + 1;
          image.save(function(err) {
              if (err) {
                res.json(err);
              } else {
                res.json({ likes: image.likes });
              } 
          });
      }
}

async function postComment(req, res){
    var image = await Models.Image.findOne({ filename: { $regex: req.params.image_id }});
    if(image){
        var newComment = new Models.Comment(req.body);
        newComment.image_id = image._id;
        newComment.gravatar = md5(newComment.email);

        newComment.save(function(err, comment) {
            if (err) { throw err; }
            res.redirect('/images/' + image.uniqueId + '/#' + comment._id);
        });
    }else {
        res.redirect('/');
    } 

}

async function saveImage(req, res){
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
         imgUrl = '';


    for(var i = 0; i < 6; i += 1) {
         imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    /* Start new code: */
     // search for an image with the same filename by performing a find:
   var images = await Models.Image.find({ filename: imgUrl });
   if (images.length > 0) {
         // if a matching image was found, try again (start over):
        saveImage();
   } else {

        var tempPath = req.files[0].path,
             ext = path.extname(req.files[0].originalname).toLowerCase(),
             targetPath = path.resolve('./public/upload/' + imgUrl + ext);

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') 
        {
           fs.rename(tempPath, targetPath, function(err) {
               if (err) throw err;

                  // create a new Image model, populate its details:
               var newImg = new Models.Image(
                  {
                   title: req.body.title,
                   filename: imgUrl + ext,
                   description: req.body.description
                  }
              );

               // and save the new Image
              newImg.save(function(err, image) {
                    res.redirect('/images/' + image.uniqueId);
              });
           });
         } else {
             fs.unlink(tempPath, function () {
                 if (err) throw err;
                 res.json(500, {error: 'Only image files are allowed.'});
             });
        }


    }
}

function getImageDetails(){
  return {
              image: {},
              comments: []
          };
}