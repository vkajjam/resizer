var gm = require('gm')
  , fs = require('fs')
  , imageMagick = gm.subClass({ imageMagick: true });
var async = require('async');

module.exports = function (path, dest, callback) {
	console.log("Calling code in the module");
  function magick (size, cb) {
    // the uploaded file can be found as `req.files.image` and the
    imageMagick(path)
      .resize(size, size)
      .stream('png', function (err, stdout, stderr) {
        if (err) return cb(err);
        var one = fs.createWriteStream( dest + size + '.png');
        stdout.pipe(one);
				stdout.once('end', function() {
        	cb();
				})
      });
  }
  // title field as `req.body.title`
  console.log('resizing %s', path);
  async.map([150, 250, 500], magick, function (err) {
		callback();
  })
};

//module.exports = transform;
