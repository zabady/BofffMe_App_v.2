var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.include("/pushNotificationAPIs.js");

SetPushNotificationAndGetDeviceToken();

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.userPin = Titanium.App.Properties.getObject("pin");

if (null == Alloy.Globals.userPin) {
    Alloy.Globals.userPin = "95190228ae42e7652b098b5bce990aa8";
    Titanium.App.Properties.setObject("pin", Alloy.Globals.userPin);
}

Alloy.Globals.splitValue = "$";

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        var userData = JSON.parse(this.responseText).rows[0];
        Titanium.App.Properties.setObject("userData", userData);
        alert(userData.fullName);
    },
    onerror: function() {
        alert(this.responseText);
    }
});

xhr.open("POST", Alloy.Globals.apiUrl + "search_user_by/bofff/user_accounts/pin/" + Alloy.Globals.userPin);

xhr.send();

var tempRootWin = Ti.UI.createWindow({});

var tempNavWin = Ti.UI.iOS.createNavigationWindow({
    window: tempRootWin
});

Alloy.Globals.openNavigationWindow = function(window, isWindowAfterRoot) {
    tempNavWin.open();
    tempNavWin.openWindow(window);
    isWindowAfterRoot && window.addEventListener("close", function() {
        tempNavWin.close();
    });
};

var userData = Titanium.App.Properties.getObject("userData");

var userDataInArrays;

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.mainNav = new Object();

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.firstTimeRun = Titanium.App.Properties.getObject("FTR", true);

Alloy.Globals.userSignUpData = new Object({
    pin: "temp",
    name: "temp",
    phone: "temp",
    email: "temp",
    gender: "temp",
    profilePicture: new Object()
});

var xhr = Ti.Network.createHTTPClient({
    onload: function() {
        var response = JSON.parse(this.responseText);
        Alloy.Globals.countryCode = response[0].cc.toLowerCase();
    },
    onerror: function() {
        Ti.UI.createAlertDialog({
            title: "No Internet Connection",
            message: "Please connect to the internet and restart the app.",
            cancel: 0,
            buttonNames: [ "Ok" ]
        }).show();
    }
});

xhr.open("POST", Alloy.Globals.apiUrl + "get_country_from_ip");

xhr.send();

Alloy.createController("index");