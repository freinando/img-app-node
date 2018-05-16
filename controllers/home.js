var sidebar = require('../helpers/sidebar'),
   ImageModel = require('../models').Image;

module.exports = {
       index: async function(req, res){

         	var images = await ImageModel.find({}, {}, { sort: { timestamp: -1 }, limit: 6});

          var viewModel = getViewModel();
          viewModel.images = images;

          viewModel = await sidebar(viewModel);
          res.render('index', viewModel);
       }
};




function getViewModel(){
	return  {
   				images: []
    		};
}
