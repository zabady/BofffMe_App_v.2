function SetPushNotificationAndGetDeviceToken() {
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
    CloudPush.addEventListener("callback", receivePushNotification);
    CloudPush.addEventListener("trayClickLaunchedApp", receivePushNotification);
    CloudPush.addEventListener("trayClickFocusedApp", receivePushNotification);
}

function SubscribeToChannel(channelName) {
    if (null == deviceToken || "" == deviceToken) {
        alert("device token is not set yet");
        return;
    }
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: channelName ? channelName : "all",
        type: "android"
    }, function(e) {
        e.success ? alert("Subscribed") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function UnsubscribeFromChannel(channelName) {
    if (null == channelName || "" == channelName || null == deviceToken || "" == deviceToken) {
        alert("Channel name or device token is null or empty !");
        return;
    }
    Cloud.PushNotifications.unsubscribeToken({
        device_token: deviceToken,
        channel: channelName
    }, function(e) {
        e.success ? alert("Unsubscribed") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function NotifyAllUserFriendsWithMessage(message, channelName, iconImage) {
    var deviceTokens;
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            deviceTokens = JSON.parse(this.responseText);
            alert(deviceTokens);
            sendNotificationTo(deviceTokens, message, channelName, "Friend's Profile Update !", iconImage);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", Alloy.Globals.apiUrl + "return_device_tokens_of_friends_in_string/" + Alloy.Globals.userPin);
    xhr.send();
}

function NotifySpecificUserFriendWithMessage(message, channelName, deviceToken) {
    sendNotificationTo(deviceToken, message, channelName, "Favorite to someone");
}

function receivePushNotification(e) {
    var payload = JSON.parse(e.payload);
    var allNotifications = Titanium.App.Properties.getObject("notifications", []);
    allNotifications.length >= 25 && allNotifications.splice(0, 1);
    var newNotification = {
        notificationTitle: payload.notificationTitle,
        notificationMessage: payload.notificationMessage,
        iconImage: payload.iconImage
    };
    allNotifications.push(newNotification);
    Titanium.App.Properties.setObject("notifications", allNotifications);
    Alloy.Globals.OpenNotificationCenter();
    resetBadge();
}

function deviceTokenSuccess(e) {
    CloudPush.enabled = true;
    deviceToken = e.deviceToken;
    alert("Got device token: " + e.deviceToken);
}

function deviceTokenError(e) {
    alert("Failed to register for push notifications! " + e.error);
}

function sendDeviceTokenToServer() {
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
    xhr.send();
}

function sendNotificationTo(deviceTokens, message, channelName, title, iconImage) {
    if (null == deviceTokens || "" == deviceToken || null == message || "" == message || null == channelName || "" == channelName) {
        alert("Device tokens or message or channelName cannot be empty !");
        return;
    }
    Cloud.PushNotifications.notifyTokens({
        to_tokens: deviceTokens,
        channel: channelName,
        payload: {
            notificationTitle: title ? title : "Notification",
            notificationMessage: message,
            iconImage: iconImage ? iconImage : null,
            title: title ? title : "Bofff Me !",
            icon: "appicon",
            vibrate: true,
            sound: "default",
            badge: "+1",
            alert: message
        }
    }, function(e) {
        e.success ? alert("Push notification sent") : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function resetBadge() {
    Cloud.PushNotifications.resetBadge({
        device_token: deviceToken
    }, function(e) {
        e.success ? alert("Badge Reset!") : Ti.API.error(e);
    });
}

var deviceToken = null;

var Cloud = require("ti.cloud");

var CloudPush = require("ti.cloudpush");