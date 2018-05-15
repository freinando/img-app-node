module.exports = {
    popular: function() {
        var images = [
            {
                uniqueId:   1,
                title:      'Sample imag',
                description:'Ahi nama',
                filename:   'SAmple1.jpeg',                  
                views:      0,
                likes:      0,
                timestamp:  Date.now()
            }, {
                uniqueId:   2,
                title:      'Another samle',
                description:'Que se yo',
                filename:   'Sample2.jpeg',
                views:      0,
                likes:      0,
                timestamp:  Date.now()
            }
        ];
        return images;

    }
}