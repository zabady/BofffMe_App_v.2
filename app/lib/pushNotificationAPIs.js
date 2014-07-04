// Definig device token variable to copy it
var deviceToken = null;

// Require in the Cloud module
var Cloud = require("ti.cloud");

// Require in the CloudPush module for android
if(OS_ANDROID) var CloudPush = require('ti.cloudpush');


/*
 * Defining a function that gets the device token and set push notification service and callback functions.
 * TODO: It FTR, this function should pass the device token to the server or add it to user data that will be posted on server.
 */
function SetPushNotificationAndGetDeviceToken()
{
	if(OS_IOS)
	{
		Ti.Network.registerForPushNotifications({
		    // Specifies which notifications to receive
		    types: [
		        Ti.Network.NOTIFICATION_TYPE_BADGE,
		        Ti.Network.NOTIFICATION_TYPE_ALERT,
		        Ti.Network.NOTIFICATION_TYPE_SOUND
		    ],
		    success: deviceTokenSuccess,		// On success
		    error: deviceTokenError,		// On error
		    callback: receivePushNotification	// Callback function revceiving push notification
		});
	}
	else if (OS_ANDROID)
	{
		// Initialize the module
		CloudPush.retrieveDeviceToken({
		    success: deviceTokenSuccess,
		    error: deviceTokenError
		});
		
		///////////////////////////////////////////////////////////////////////////////////// Adding callback functions on android
		// Process incoming push notifications
		CloudPush.addEventListener('callback', receivePushNotification);
		// Triggered when the push notifications is in the tray when the app is not running
		CloudPush.addEventListener('trayClickLaunchedApp', receivePushNotification);
		// Triggered when the push notifications is in the tray when the app is running
		CloudPush.addEventListener('trayClickFocusedApp', receivePushNotification);
	}
}


/* Defining a function that subscribes the device to a specifiend channel or to a channel called 'all' if not specified
 * TODO: This function must be called on FTR
 */
function SubscribeToChannel (channelName)
{
	if(deviceToken == null || deviceToken == '') {
		alert('device token is not set yet');
		return;
	}
	
    // Subscribes the device to the incoming channel
    // Specify the push type as either 'android' for Android or 'ios' for iOS
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: channelName ? channelName : 'all',
        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
    }, function (e) {
        if (e.success) {
            alert('Subscribed');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}


/* Defining a function that unsubscribes from a specified channel.
 * channelName is required
 */
function UnsubscribeFromChannel (channelName)
{
	if(channelName == null || channelName == '' || deviceToken == null || deviceToken == '') {
		alert('Channel name or device token is null or empty !');
		return;
	}
	
    // Unsubscribes the device from the 'test' channel
    Cloud.PushNotifications.unsubscribeToken({
        device_token: deviceToken,
        channel: channelName,
    }, function (e) {
        if (e.success) {
            alert('Unsubscribed');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}


/* Defining a function that notifies all user's friends with a specified message.
 * Must be used when the user updates his profile, so, his friends know about these updates.
 * message and channelName are required.
 */
function NotifyAllUserFriendsWithMessage(message, channelName, iconImage)
{
	var deviceTokens;
	var xhr = Ti.Network.createHTTPClient(
	{
		onload: function(e) 
	    {
	    	deviceTokens = JSON.parse(this.responseText);
	    	alert(deviceTokens);
	    	sendNotificationTo(deviceTokens, message, channelName, "Friend's Profile Update !", iconImage);
	    },
	    onerror: function(e)
	    {
	    	alert(this.responseText);
	    },
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "return_device_tokens_of_friends_in_string/" + Alloy.Globals.userPin);
	xhr.send();
}


/* Defining a function that notifies a specified user friend with a specified message.
 * Must be used when the user adds a friend to favorites, so, this friend know about being favorite.
 * message, channelName and friendPin are required.
 */
function NotifySpecificUserFriendWithMessage(message, channelName, deviceToken)
{
	sendNotificationTo(deviceToken, message, channelName, 'Favorite to someone');
}


/////////////////////////////////////////////////////////////////////////////////////////////////// PRIVATE FUNCTIONS
/* Callback function that processes incoming push notifications.
 * It will save append the new notification to an array of notification saved in the app properties.
 * This array is used by the notification center to dispaly all the received notifications.
 */
function receivePushNotification(e)
{
	// TODO: BUG: Unexpected token U, when the app is closed and get open by clicking on the notification
	var payload = JSON.parse(e.payload);
	
	// Get notifications array from properties, if does not exist, get empty array
	// TODO: Uncomment next line
	var allNotifications = Titanium.App.Properties.getObject('notifications', []);
	//var allNotifications = [];
	
	// If notifications are greater than 25, removes the first notification (the oldest one)
	if(allNotifications.length >= 25) allNotifications.splice(0, 1);
	
	var newNotification = {
		notificationTitle : payload.notificationTitle,
		notificationMessage : payload.notificationMessage,
		iconImage : payload.iconImage,
	};
	
	allNotifications.push(newNotification);
	Titanium.App.Properties.setObject('notifications', allNotifications);
	Alloy.Globals.OpenNotificationCenter();
	
    resetBadge();	// Reset the badge to zero
}

// Callback function after getting device token successfully				// PRIVATE FUNCTION
function deviceTokenSuccess(e)
{
	// If android, enable CloudPush
	if(OS_ANDROID) CloudPush.enabled = true;
	
	// Save device token
	deviceToken = e.deviceToken;
	
	// TODO: sendDeviceTokenToServer(); if it's not on server
	// TODO: Subscribe for push notification in FTR.
	alert("Got device token: " + e.deviceToken);
}

// Callback function if device token is not received						// PRIVATE FUNCTION
function deviceTokenError(e)
{
    alert('Failed to register for push notifications! ' + e.error);
}

// Posts the device token to server in order to save it in user's data		// PRIVATE FUNCTION
function sendDeviceTokenToServer()
{
	// Send device token to the server with the user's pin
    var xhr = Ti.Network.createHTTPClient(
	{
		onload: function(e) 
	    {
	    	alert("Device token saved on server !");
	    	alert(deviceToken);
	    },
	    onerror: function(e)
	    {
	    	alert(this.responseText);
	    },
	});
	xhr.open("POST", Alloy.Globals.apiUrl + "update_device_token_with_pin/bofff/" + Alloy.Globals.userPin + "/" + deviceToken);
	xhr.send();
}


/* Send push notifications to deviceTokens with a specified messgae and specified channel
 * deviceTokens, message, channelName are required
 * deviceTokens is a comma-sperated string containing device tokens.
 * If tittle is not specified, it will be set to 'Bofff Me !'.
 */
function sendNotificationTo (deviceTokens, message, channelName, title, iconImage)			// PRIVATE FUNCTION
{
	if(deviceTokens == null || deviceToken == '' ||
		message == null || message == '' ||
		channelName == null || channelName == '') {
		alert("Device tokens or message or channelName cannot be empty !");
		return;
	}
	
    // Sends an 'This is a test.' alert to specified device if its subscribed to the 'test' channel.
    Cloud.PushNotifications.notifyTokens({
        to_tokens: deviceTokens,
        channel: channelName,
        
        payload: {
        	notificationTitle : title ? title : 'Notification',
        	notificationMessage: message,
        	iconImage: iconImage ? iconImage : null,
        	
        	title : title ? title : 'Bofff Me !',	// Android only
        	icon : "appicon",						// Android only
        	vibrate : true,							// Android only
		    sound : "default",
		    badge : "+1",
		    
		    alert : message,
		},
        
        
    }, function (e) {
        if (e.success) {
            alert('Push notification sent');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}


// A function that reset the badge on the appicon when the callback function is fired	// PRIVATE FUNCTION
function resetBadge()
{
	Cloud.PushNotifications.resetBadge({
	    device_token: deviceToken
	}, function (e) {
	    if (e.success) {
	        alert('Badge Reset!');
	    }
	    else {
	        Ti.API.error(e);
	    }
	});
}

// TODO: Push Notifications Disadvantages:
/*	iOS:
 * 		The callback function is fired in one of two case:
 * 			a. The app is opened.
 * 			b. The notification is clicked.
 * 
 * 		It's not fired in two cases:
 * 			1. The app is in background and the notification was not clicked.
 * 			2. The app is closed and the notification was not clicked.
 * 
 * 	Android:
 * 		The callback function is fired in the next cases:
 * 			a. The app is opened.
 * 			b. The notification is clicked in one of two cases:
 * 				 i. The app was not running (trayClickLaunchedApp event).
 * 				ii. The app was in the background (trayClickFocusedApp event).
 * 			c. If the app was closed and then get opened by any way.
 * 
 *		It's not fired when the app is in background and gets focus not by clicking on the notification
 * 
 */