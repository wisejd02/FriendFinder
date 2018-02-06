// ===============================================================================
// LOAD DATA
// Linking our routes to "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // posting friends data
    // req.body is available since we're using the body-parser middleware
      console.log(req);
      friendsData.push(req.body);
      res.json(true);
  });

  // ---------------------------------------------------------------------------
  // Clears out array of objects 

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];
    console.log(friendsData);
  });
};
