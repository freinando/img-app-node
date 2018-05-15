module.exports = {
       newest: function() {
           var comments = [
               {
                  image_id:   1,
                  email:      'testing@fpl.com',
                  name:       'Joan',
                  gravatar:  'http://lorempixel.com/75/75/animals/1',
                  comment:   'This is a test comment...',
                  timestamp:  Date.now(),
                  image: {
                            uniqueId:   1,
                           title:       'SAmpl 1',
                           description: 'descroibe this',
                           filename:    'Sample1.jpeg',
                           views:       0,
                           likes:       0,
                           timestamp:   Date.now()
                         }
                 }
             ];
         return comments;
       }
}