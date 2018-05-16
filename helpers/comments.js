var models = require('../models');
    //async = require('async');

module.exports = {
  newest: async function() {
      var comments = await models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 }});
      return await getImageForComment(comments);
  }
};

async function getImageForComment(comments){

    var promises = comments.map(async function(comment){
        var image = await models.Image.findOne({ _id : comment.image_id});
        comment.image = image;
    });

    await Promise.all(promises);
    return comments;
}
