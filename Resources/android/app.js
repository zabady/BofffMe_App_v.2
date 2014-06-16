var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.userPin = "95190228ae42e7652b098b5bce990aa8";

Alloy.Globals.splitValue = "$";

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        var userData = JSON.parse(this.responseText).rows[0];
        Titanium.App.Properties.setObject("userData", userData);
    },
    onerror: function() {
        alert(this.responseText);
    }
});

xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);

xhr.send();

var tempRootWin;

var tempNavWin;

Alloy.Globals.openNavigationWindow = function(window, isWindowAfterRoot) {
    window.addEventListener("open", function() {
        window.activity.actionBar.onHomeIconItemSelected = function() {
            window.close();
        };
        window.activity.actionBar.displayHomeAsUp = true;
    });
    window.open();
};

var firstTime = true;

if (firstTime) {
    var userProfile = new Object({
        pin: "5000",
        name: "Ahmed Atif",
        phone: "201009091995",
        email: "ahmed.atif15@gmail.com",
        gender: "male"
    });
    Titanium.App.Properties.setObject("userProfile", userProfile);
    var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=MECARD:N:" + userProfile.name + ";" + "TEL:" + userProfile.phone + ";" + "EMAIL:" + userProfile.email + ";" + "NOTE:pin:" + userProfile.pin + ";";
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
} else var userProfile = Titanium.App.Properties.getObject("userProfile");

Alloy.createController("index");