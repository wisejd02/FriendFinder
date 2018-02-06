var FindFriend = function (arrFriends) {
    this.name = "",
    this.diff,
    this.friendsDiff,
    this.friends = arrFriends
}

FindFriend.prototype.calcFriendDiff = function (currUser) {
    console.log("current user");
    console.log(currUser);
    console.log("friends.js");
    console.log(this.friends);
    var compFriendsData = JSON.parse(JSON.stringify(this.friends));
    var arrDiff = [];
    var userScores = currUser.scores;
    //req.body.scores = userScores;
    for (var i = 0; i < compFriendsData.length; i++) {
        var sumDiff = 0;
        compFriendsData[i].diffScores = [];
        for (var j = 0; j < compFriendsData[i].scores.length; j++) {
            var diff = Math.abs(parseInt(compFriendsData[i].scores[j]) - parseInt(userScores[j]));
            compFriendsData[i].diffScores[j] = diff;
            console.log(diff);
            sumDiff += parseInt(diff);
            console.log(sumDiff);
        }
        arrDiff.push(sumDiff);
        compFriendsData[i].totalDiff = sumDiff;
        console.log(compFriendsData);
    }
    this.friendsDiff = compFriendsData;
    this.diff = Math.min.apply(Math, arrDiff);
}

FindFriend.prototype.newFriend = function () {
    console.log(this.diff);
    console.log(this.friendsDiff)
    var count = 0;
    var friends = [];
    for (var i = 0; i < this.friendsDiff.length; i++) {
        if (this.friendsDiff[i].totalDiff == this.diff) {
            console.log(this.friendsDiff[i].name);
            friends.push({ name: this.friendsDiff[i].name, photo: this.friendsDiff[i].photo });

        }
    }
    return friends
}
module.exports = FindFriend;