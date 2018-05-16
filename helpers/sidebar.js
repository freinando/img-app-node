var Stats = require('./stats'),
   Images = require('./images'),
   Comments = require('./comments');


module.exports = async function(viewModel){
	var results = await Promise.all([Stats(), Images.popular(), Comments.newest()]);
	viewModel.sidebar = {
							stats: results[0],
							popular: results[1],
							comments: results[2]
						};
	return viewModel;
};