function Controller() {
    function viewLoading() {
        Alloy.Globals.loading.show("Please Wait ..", false);
    }
    function signUpSuccess() {
        var response = JSON.parse(this.responseText);
        Alloy.Globals.userPin = Titanium.Utils.md5HexDigest(response.rows);
        Titanium.App.Properties.setObject("pin", Alloy.Globals.userPin);
        alert(response);
        SubscribeToChannel("test");
        generateQrCode();
        getUserData();
        Alloy.Globals.loading.show("Generating QR Code ..", false);
    }
    function generetaQrCodeSuccess() {
        var qrFile = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "qrcode.jpg");
        qrFile.write(this.responseData);
        Titanium.App.Properties.setObject("FTR", false);
        alert("Got QR Code!");
        Alloy.Globals.loading.hide();
        Alloy.createController("appTabGroup").getView().open();
    }
    function signUp() {
        var xhr = Ti.Network.createHTTPClient({
            onload: signUpSuccess,
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
            profile_picture: Alloy.Globals.userSignUpData.profilePicture.large ? Alloy.Globals.userSignUpData.profilePicture.large.read() : null,
            device_token: GetDeviceToken()
        };
        xhr.send(params);
    }
    function generateQrCode() {
        var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=MECARD:N:" + Alloy.Globals.userSignUpData.name + ";" + "TEL:" + Alloy.Globals.userSignUpData.phone + ";" + "EMAIL:" + Alloy.Globals.userSignUpData.email + ";" + "NOTE:pin:" + Alloy.Globals.userPin + ";";
        var client = Titanium.Network.createHTTPClient({
            onload: generetaQrCodeSuccess,
            onerror: function(e) {
                alert(e.error);
            }
        });
        client.open("GET", url);
        client.send();
    }
    function getUserData() {
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                userData = JSON.parse(this.responseText).rows[0];
                userData.phone_numbers = [];
                userData.phone_numbers_privacy = [];
                userData.mails = [];
                userData.mails_privacy = [];
                userData.social_links = [];
                userData.social_links_privacy = [];
                userData.interests = [];
                userData.interests_privacy = [];
                userData.favorite_places = [];
                userData.favorite_places_privacy = [];
                Titanium.App.Properties.setObject("userData", userData);
                alert(userData.fullName);
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/signUpWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.signUpWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "signUpWin"
    });
    $.__views.signUpWin && $.addTopLevelView($.__views.signUpWin);
    viewLoading ? $.__views.signUpWin.addEventListener("postlayout", viewLoading) : __defers["$.__views.signUpWin!postlayout!viewLoading"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    signUp();
    __defers["$.__views.signUpWin!postlayout!viewLoading"] && $.__views.signUpWin.addEventListener("postlayout", viewLoading);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;