function Controller() {
    function receivePush(e) {
        alert("Received push: " + JSON.stringify(e));
    }
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
    }
    function deviceTokenError(e) {
        alert("Failed to register for push notifications! " + e.error);
    }
    function subscribeToChannel() {
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "test",
            type: "ios"
        }, function(e) {
            e.success ? alert("Subscribed") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function sendTestNotification() {
        Cloud.PushNotifications.notifyTokens({
            to_tokens: deviceToken,
            channel: "test",
            payload: "This is a test."
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
    var CloudPush;
    Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
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