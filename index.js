// index.js
// where your node app starts
const regexNum = new RegExp('^[0-9]+$');
const regexDate = new RegExp('^[0-9]{1,4}\-[0-9]{1,2}\-[0-9]{1,2}$');

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let myDate;
  if (!req.params || !req.params.date) {
    let currDate = new Date();
    res.json({
      unix: Date.parse(currDate),
      utc: currDate.toUTCString()
    });
  } else if (regexNum.test(req.params.date)) {
    let unixValue = Number(req.params.date);
    res.json({
      unix: unixValue,
      utc: new Date(unixValue).toUTCString()
    });
  } else {
    if (regexDate.test(req.params.date)) {
      myDate = new Date(req.params.date);
      if (myDate == "Invalid Date") {
        res.json({
          error: "Invalid Date"
        });
      } else {
        res.json({
          unix: Date.parse(req.params.date),
          utc: myDate.toUTCString()
        });
      }
    } else {
      res.json({
        error: "Invalid Date"
      });
    }
  }
});



// listen for requests :)
let listener = app.listen(33333, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
