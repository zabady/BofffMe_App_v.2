function Controller() {
    function signUpOnload() {
        var response = JSON.parse(this.responseText);
        Alloy.Globals.userPin = Titanium.Utils.md5HexDigest(response.rows);
        alert(response);
        alert(response.rows);
    }
    function signUp() {
        var xhr = Ti.Network.createHTTPClient({
            onload: signUpOnload,
            onerror: function() {
                alert("Check your internet connection.");
            }
        });
        xhr.open("POST", Alloy.Globals.apiUrl + "insert/bofff/user_accounts");
        var params = {
            fullName: Alloy.Globals.userSignUpData.name,
            gender: Alloy.Globals.userSignUpData.gender,
            primary_mobile: Alloy.Globals.userSignUpData.phone,
            primary_email: Alloy.Globals.userSignUpData.email,
            profile_picture: Alloy.Globals.userSignUpData.profilePicture.large ? Alloy.Globals.userSignUpData.profilePicture.large.read() : null
        };
        xhr.send(params);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/signUpWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.signUpWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "signUpWin"
    });
    $.__views.signUpWin && $.addTopLevelView($.__views.signUpWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    signUp();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;