const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/healthz", (req, res) => {
  res.sendStatus(200)
  return;
});
// this is our get method
// this method fetches all available data in our database
router.get("/converttodec", (req, res) => {
    var bin = req.query.binary;
    const reversedBinaryText = Array.from(bin)
      .map(Number) // Convert to a number from string
      .reverse()
      var dec = reversedBinaryText.reduce( function(accumulator, currentValue,idx){
        return accumulator + (currentValue * Math.pow(2,idx))
      });
    return res.json({ success: true, data: dec });
});


// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));