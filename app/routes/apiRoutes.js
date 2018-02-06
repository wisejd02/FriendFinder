// ===============================================================================
// LOAD DATA
// Linking our routes to "data" sources.
// These data sources hold arrays of information on friendsData, etc.
// ===============================================================================

var friendsData = require("../data/friends");
var friendFinder = require("../data/friendFinder");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the friendsData)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out survey form... this data is then sent to the server...
  // the data is put through conditional statements to respond with matching friends
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
      console.log("apiRoutes post");
      req.body.scores = JSON.parse(req.body.scores);
      var find = new friendFinder(friendsData)
      find.calcFriendDiff(req.body);
      var friends = find.newFriend();
      friendsData.push(req.body);
      res.json(JSON.stringify(friends));
      //compareToFriends();
      //function compareToFriends() {
      //    var compFriendsData = JSON.parse(JSON.stringify(friendsData));
      //    var arrDiff = [];
      //    var userScores = JSON.parse(req.body.scores);
      //    req.body.scores = userScores;
      //    for (var i = 0; i < compFriendsData.length; i++) {
      //        var sumDiff = 0;
      //        compFriendsData[i].diffScores = [];
      //        for (var j = 0; j < compFriendsData[i].scores.length; j++) {
      //            var diff = Math.abs(parseInt(compFriendsData[i].scores[j]) - parseInt(userScores[j]));
      //            compFriendsData[i].diffScores[j] = diff;
      //            console.log(diff);
      //            sumDiff += parseInt(diff);
      //            console.log(sumDiff);
      //        }
      //        arrDiff.push(sumDiff);
      //        compFriendsData[i].totalDiff = sumDiff;
      //        console.log(compFriendsData);
      //    }
      //    getNewFriend(arrDiff, compFriendsData);
      //}
      //function getNewFriend(arrDiff, compFriendsData) {
      //    var lowestDiff = Math.min.apply(Math, arrDiff)
      //    var count = 0;
      //    var friends = [];
      //    console.log(lowestDiff);
      //    for (var i = 0; i < compFriendsData.length; i++) {
      //        if (compFriendsData[i].totalDiff == lowestDiff) {
      //            console.log(compFriendsData[i].name);
      //            friends.push({ name: compFriendsData[i].name, photo: compFriendsData[i].photo })
                  
      //        }
      //    }
      //    // posting friends data
      //    friendsData.push(req.body);
      //    res.json(JSON.stringify(friends));
      //};

  });

  // ---------------------------------------------------------------------------
  // Clears out array of objects 

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];
    console.log(friendsData);
  });
};
