var models = require('../models');
    //async = require('async');

module.exports = {
  newest: async function() {
      var comments = await models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 }});
      //var commentsFInal = await getImageForComment(comments);
      return await getImageForComment(comments);



      /*



      var looper = async function(){
          await async
      } 


      var attachImage = await models.Image.findOne({ _id : comment.image_id});
      comment.image = image;


                    function(err, image) {
                      if (err) throw err;
                      comment.image = image;
                      next(err);
                    }
                  );

          function(err, comments){
                var attachImage = function(comment, next) {
                  models.Image.findOne({ _id : comment.image_id},
                    function(err, image) {
                      if (err) throw err;
                      comment.image = image;
                      next(err);
                    }
                  );
                };

                async.each(comments, attachImage,
                  function(err) {
                    if (err) throw err;
                    callback(err, comments);
                  }
                );
          });*/
  }
};

async function getImageForComment(comments){

    var promises = comments.map(async function(comment){
        var image = await models.Image.findOne({ _id : comment.image_id});
        comment.image = image;
    });

    await Promise.all(promises);
    /*for (var comment of comments){
        var image = await models.Image.findOne({ _id : comment.image_id});
        comment.image = image;
    }*/
    return comments;
}
