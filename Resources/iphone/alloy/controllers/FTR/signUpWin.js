function Controller() {
    function generateQrCode() {
        var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=MECARD:N:" + Alloy.Globals.userSignUpData.name + ";" + "TEL:" + Alloy.Globals.userSignUpData.phone + ";" + "EMAIL:" + Alloy.Globals.userSignUpData.email + ";" + "NOTE:pin:" + Alloy.Globals.userPin + ";";
        var client = Titanium.Network.createHTTPClient({
            onload: function() {
                var qrFile = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "qrcode.jpg");
                qrFile.write(this.responseData);
                Ti.API.info("Got QR Code!");
            },
            onerror: function(e) {
                alert(e.error);
            }
        });
        client.open("GET", url);
        client.send();
    }
    function signUp() {
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                Alloy.Globals.loading.hide();
                var response = JSON.parse(this.responseText);
                Alloy.Globals.userPin = Titanium.Utils.md5HexDigest(response.rows);
                alert(response + "\n" + response.rows);
            },
            onerror: function() {
                Alloy.Globals.loading.hide();
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.loading.show("Please Wait ..", false);
    signUp();
    generateQrCode();
    Alloy.Globals.loading.hide();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;