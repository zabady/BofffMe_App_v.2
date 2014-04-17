var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

var firstTime = false;

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