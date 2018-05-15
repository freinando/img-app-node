var path = require('path'),
       routes = require('./routes'),
       exphbs = require('express-handlebars'),
       express = require('express'),
       bodyParser = require('body-parser'),
       cookieParser = require('cookie-parser'),
       morgan = require('morgan'),
       methodOverride = require('method-override'),
       errorHandler = require('errorhandler'),
       moment = require('moment'),
       multer = require('multer');

module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(multer({ dest: path.join(path.join(__dirname, '../'),
                  'public/upload/temp')}).any());
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));

	app.use('/public/', express.static(path.join(__dirname,'../public')));

	if ('development' === app.get('env')) {
	  app.use(errorHandler());
	}

	routes(app);

	app.engine('html', buildHandlebars(app).engine);
    app.set('view engine', 'html');

	return app;
};


function buildHandlebars(app){

	return exphbs.create(
				{
			       defaultLayout: 	'main',
			       extname:         '.html',
			       layoutsDir: 		app.get('views') + '/layouts',
			       partialsDir: 	[app.get('views') + '/partials'],
			       helpers: {
			           timeago: function(timestamp) {
			               return moment(timestamp).startOf('minute').fromNow();
					   } 
				   }
		    	}
		    );
}

