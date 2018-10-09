
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = config.mongoUri;

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads')
    },
    filename1: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    },
    filename2: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
      }
});
var upload = multer({storage: storage});

router.post('/fileUpload', upload.any(), (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/uploads/' + req.file.filename, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
    });
});

module.exports = router;

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('user');
    collection.insertOne({'filePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}