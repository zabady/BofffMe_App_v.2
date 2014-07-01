function Controller() {
    function deviceTokenSuccess(e) {
        alert("Got device token: " + e.deviceToken);
        deviceToken = e.deviceToken;
    }
    function deviceTokenError(e) {
        alert("Failed to register for push notifications! " + e.error);
    }
    function deviceTokenSuccess(e) {
        CloudPush.enabled = true;
        deviceToken = e.deviceToken;
        alert("Got device token.");
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                alert("Device token saved on server !");
                alert(deviceToken);
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        xhr.open("POST", Alloy.Globals.apiUrl + "update_device_token_with_pin/bofff/" + Alloy.Globals.userPin + "/" + deviceToken);
    }
    function deviceTokenError(e) {
        alert("Failed to register for push notifications! " + e.error);
    }
    function subscribeToChannel() {
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "test",
            type: "android"
        }, function(e) {
            e.success ? alert("Subscribed") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function sendTestNotification() {
        Cloud.PushNotifications.notifyTokens({
            to_tokens: deviceTokens,
            channel: "test",
            payload: {
                customField: "Any Custom Data",
                title: "Friend Profile Updated !",
                icon: "appicon",
                vibrate: true,
                sound: "default",
                alert: "Testing sending the notification only to friends"
            }
        }, function(e) {
            e.success ? alert("Push notification sent") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function unsubscribeToChannel() {
        Cloud.PushNotifications.unsubscribeToken({
            device_token: deviceToken,
            channel: "test"
        }, function(e) {
            e.success ? alert("Unsubscribed") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/SubscribeToPushNotification";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var deviceToken = null;
    var CloudPush = require("ti.cloudpush");
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
    CloudPush.addEventListener("callback", function(evt) {
        alert(evt.payload);
    });
    CloudPush.addEventListener("trayClickLaunchedApp", function() {
        alert("Tray Click Launched App (app was not running)");
    });
    CloudPush.addEventListener("trayClickFocusedApp", function() {
        alert("Tray Click Focused App (app was already running)");
    });
    var deviceTokens;
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            deviceTokens = JSON.parse(this.responseText) + "," + deviceToken;
            alert(deviceTokens);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", Alloy.Globals.apiUrl + "return_device_tokens_of_friends_in_string/" + Alloy.Globals.userPin);
    xhr.send();
    var Cloud = require("ti.cloud");
    var subscribe = Ti.UI.createButton({
        title: "Subscribe",
        top: "40%"
    });
    subscribe.addEventListener("click", subscribeToChannel);
    $.win.add(subscribe);
    var notify = Ti.UI.createButton({
        title: "Notify",
        top: "10%"
    });
    notify.addEventListener("click", sendTestNotification);
    $.win.add(notify);
    var unsubscribe = Ti.UI.createButton({
        title: "Unsubscribe",
        top: "10%"
    });
    unsubscribe.addEventListener("click", unsubscribeToChannel);
    $.win.add(unsubscribe);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;