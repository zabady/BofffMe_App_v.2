var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var userData = Titanium.App.Properties.getObject("userData");

var userDataInArrays;

Ti.include("/pushNotificationAPIs.js");

SetPushNotificationAndGetDeviceToken();

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.splitValue = "$";

Alloy.Globals.userPin = Titanium.App.Properties.getObject("pin");

Alloy.Globals.firstTimeRun = Titanium.App.Properties.getObject("FTR", false);

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

Alloy.Globals.notifyFriendsAboutJoining = function() {
    setTimeout(function() {
        NotifyAllUserFriendsWithMessage(userData.fullName + " has joined Bofff Me, click here and explore his profile.", "test", userData.icon_image, "New Friend !");
        alert("The app will send a notification informing your friends that you has just joined Bofff Me.");
    }, 8e3);
};

Alloy.createController("index");