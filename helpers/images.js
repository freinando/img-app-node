var models = require('../models');

module.exports = {
    popular: async function() {
        var images = await models.Image.find({}, {}, { limit: 9, sort: { likes: -1 }});
        return images;
    }
};