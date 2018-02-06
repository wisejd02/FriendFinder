//Constructor to help with functions on finding a new friend!!
var FindFriend = function (arrFriends) {
    this.diff,
    this.friendsDiff,
    this.friends = arrFriends
}

//takes the friends.js array of objects and goes through each value of the score arr
// and subtracts from the current users array to get differences  and then gets the smallest 
//minimal difference
FindFriend.prototype.calcFriendDiff = function (currUser) {
    var compFriendsData = JSON.parse(JSON.stringify(this.friends));
    var arrDiff = [];
    var userScores = currUser.scores;
    for (var i = 0; i < compFriendsData.length; i++) {
        var sumDiff = 0;
        compFriendsData[i].diffScores = [];
        for (var j = 0; j < compFriendsData[i].scores.length; j++) {
            var diff = Math.abs(parseInt(compFriendsData[i].scores[j]) - parseInt(userScores[j]));
            compFriendsData[i].diffScores[j] = diff;
            sumDiff += parseInt(diff);
        }
        arrDiff.push(sumDiff);
        compFriendsData[i].totalDiff = sumDiff;
    }
    this.friendsDiff = compFriendsData;
    this.diff = Math.min.apply(Math, arrDiff);
}
//loops through temp freinds array and gets friend(s) with minimal differences
FindFriend.prototype.newFriend = function () {
    var count = 0;
    var friends = [];
    for (var i = 0; i < this.friendsDiff.length; i++) {
        if (this.friendsDiff[i].totalDiff == this.diff) {
            friends.push({ name: this.friendsDiff[i].name, photo: this.friendsDiff[i].photo });
        }
    }
    return friends
}
module.exports = FindFriend;