var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var userData = Titanium.App.Properties.getObject("userData");

var userDataInArrays;

Ti.include("/pushNotificationAPIs.js");

SetPushNotificationAndGetDeviceToken();

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.splitValue = "$";

Alloy.Globals.userPin = Titanium.App.Properties.getObject("pin");

Alloy.Globals.firstTimeRun = true;

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

Alloy.Globals.firstTimeRun && (Alloy.Globals.userSignUpData = new Object({
    name: "temp",
    phone: "temp",
    email: "email@temp.com",
    gender: "male",
    deviceToken: "temp",
    profilePicture: new Object()
}));

Alloy.createController("index");