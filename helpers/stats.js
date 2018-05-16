var models = require('../models');
//async = require('async');

module.exports = async function() {

	var results = await Promise.all([getImgCount(), getCommentCount(), getViewsCount(), getLikes()]);
	return {
			images: results[0],
			comments: results[1],
			views: results[2],
			likes: results[3]
		};


		/*
	async.parallel([
		function(next) {
			models.Image.count({}, next);
		},
		function(next) {
			models.Comment.count({}, next);
		},
		function(next) {
			models.Image.aggregate([{ $group : {
				_id : '1',
				viewsTotal : { $sum : '$views' }}}], function(err, result) {
					var viewsTotal = 0;
					if (result.length > 0) {
						viewsTotal += result[0].viewsTotal;
					}
				next(null, viewsTotal);
			});
		},
		function(next) {
			models.Image.aggregate([{ $group : {
				_id : '1',
				likesTotal : { $sum : '$likes' }
				}}], function (err, result) {
					var likesTotal = 0;
					if (result.length> 0) {
						likesTotal += result[0].likesTotal;
					}
				next(null, likesTotal);
			});
		}
	], function(err, results){
		callback(null, {
			images: results[0],
			comments: results[1],
			views: results[2],
			likes: results[3]
		});
	});*/
};

async function getImgCount(){
	return await models.Image.count({});
}

async function getCommentCount(){
	return await models.Comment.count({});
}

async function getViewsCount(){
	var result = await models.Image.aggregate([{ $group : {
				_id : '1',
				viewsTotal : { $sum : '$views' }}}])

	var viewsTotal = 0;
	if (result.length > 0) {
		viewsTotal += result[0].viewsTotal;
	}
	return viewsTotal;
			
}

async function getLikes(){
	var result = await models.Image.aggregate([{ $group : {
				_id : '1',
				likesTotal : { $sum : '$likes' }
				}}]); 

	var likesTotal = 0;
	if (result.length> 0) {
		likesTotal += result[0].likesTotal;
	}
	return likesTotal;
}