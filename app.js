const config = require('config');
const provider =   config.get('etheriumhost'); 
const apikey = config.get('apiKey');
const portAddress = config.get('port');
const Tx = require('ethereumjs-tx');
const web3 = require('./utils/web3.singleton')(`${provider}`);
const rinky = config.get('provider');
const mainNetwork = require('./utils/mainnetwork')(`${rinky}/${apikey}`)
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors(config.cors))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
mongoose.connect(config.mongoUri, { useNewUrlParser: true }, function(err) {
if(err) {
  console.log("err",err)
}
});
var port = process.env.port || portAddress;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'Welcome to adpoints' })
})
require('./auth/auth')(router);
app.use('/api', router);
app.use((err, req, res, next) => {
  // handle unexpected errors
  if (!('status' in err)) {
      console.error('Fatal error reason:', err);

      if (process.env.NODE_ENV !== 'production') {
          res.status(500).send(err);
      } else {
          res.status(500).send('An unexpected problem was detected, please try again later');
      }

      return;
  }

  res.status(err.status).send(err);
});

mongoose.connect('mongodb://user:password12@ds123173.mlab.com:23173/adpoint_db', { useNewUrlParser: true }, function(err) {
    if(err) {
    console.log("err",err)
    }
    else{
        console.log('listening on 3000')
    }
    });
    
    // app.listen(3000, (err, user) => {
    //     console.log("Server running on 3000");
    //         })

app.listen(3000);
console.log('Magic happens on port ' + 3000);

