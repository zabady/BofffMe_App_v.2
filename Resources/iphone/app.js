var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var userData = Titanium.App.Properties.getObject("userData");

var userDataInArrays;

Ti.include("/pushNotificationAPIs.js");

SetPushNotificationAndGetDeviceToken();

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.apiUrl = "http://www.bofffme.com/api/index.php/home/";

Alloy.Globals.splitValue = "$";

Alloy.Globals.userPin = Titanium.App.Properties.getObject("pin");

Alloy.Globals.firstTimeRun = false;

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

Alloy.createController("index");