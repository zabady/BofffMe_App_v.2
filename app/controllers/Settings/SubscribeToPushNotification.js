var deviceToken = null;

if(OS_IOS)
{
	Ti.Network.registerForPushNotifications({
	    // Specifies which notifications to receive
	    types: [
	        Ti.Network.NOTIFICATION_TYPE_BADGE,
	        Ti.Network.NOTIFICATION_TYPE_ALERT,
	        Ti.Network.NOTIFICATION_TYPE_SOUND
	    ],
	    success: deviceTokenSuccess,
	    error: deviceTokenError,
	    callback: receivePush
	});
	
	// Process incoming push notifications
	function receivePush(e) {
	    alert('Received push: ' + JSON.stringify(e));
	}
	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		alert("Got device token: " + e.deviceToken);
	    deviceToken = e.deviceToken;
	}
	
	function deviceTokenError(e) {
	    alert('Failed to register for push notifications! ' + e.error);
	}
}
else if(OS_ANDROID)
{
	// Require in the module
	var CloudPush = require('ti.cloudpush');
	
	// Initialize the module
	CloudPush.retrieveDeviceToken({
	    success: deviceTokenSuccess,
	    error: deviceTokenError
	});
	
	// Enable push notifications for this device
	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
	    CloudPush.enabled = true;
	    deviceToken = e.deviceToken;
	    alert("Got device token.");
	    
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
		// TODO: Remove this comment xhr.send();
	    
	}
	function deviceTokenError(e) {
	    alert('Failed to register for push notifications! ' + e.error);
	}
	 
	// Process incoming push notifications
	CloudPush.addEventListener('callback', function (evt) {
	    alert(evt.payload);
	});
	// Triggered when the push notifications is in the tray when the app is not running
	CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
	    alert('Tray Click Launched App (app was not running)');
	});
	// Triggered when the push notifications is in the tray when the app is running
	// TODO: App was not running, and opened by clicking on the notification
	CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
	    alert('Tray Click Focused App (app was already running)');
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

var deviceTokens;
var xhr = Ti.Network.createHTTPClient(
{
	onload: function(e) 
    {
    	deviceTokens = JSON.parse(this.responseText) + "," + deviceToken;
    	alert(deviceTokens);
    },
    onerror: function(e)
    {
    	alert(this.responseText);
    },
});
xhr.open("POST", Alloy.Globals.apiUrl + "return_device_tokens_of_friends_in_string/" + Alloy.Globals.userPin);
xhr.send();

//////////////////////////////////////////////////////////////// Subscribe for Push Notifications
// Require in the Cloud module
var Cloud = require("ti.cloud");
function subscribeToChannel () {
    // Subscribes the device to the 'test' channel
    // Specify the push type as either 'android' for Android or 'ios' for iOS
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: 'test',
        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
    }, function (e) {
        if (e.success) {
            alert('Subscribed');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}

function sendTestNotification () {
    // Sends an 'This is a test.' alert to specified device if its subscribed to the 'test' channel.
    Cloud.PushNotifications.notifyTokens({
        to_tokens: deviceTokens,
        channel: 'test',
        //payload: 'Testing device tokens in CS string !',
        
        payload: {
        	"customField" : "Any Custom Data",
        	
        	"title" : "Friend Profile Updated !",	// Android only
        	"icon" : "appicon",						// Android only
        	"vibrate" : true,						// Android only
		    "sound" : "default",
		    
		    //"alert" : "One of your friends has just updated his profile, click here so these updates are applied to your phonebook ;)",
		    "alert" : "Testing sending the notification only to friends",
		},
        
        
    }, function (e) {
        if (e.success) {
            alert('Push notification sent');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}

function unsubscribeToChannel () {
    // Unsubscribes the device from the 'test' channel
    Cloud.PushNotifications.unsubscribeToken({
        device_token: deviceToken,
        channel: 'test',
    }, function (e) {
        if (e.success) {
            alert('Unsubscribed');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}


var subscribe = Ti.UI.createButton({title:'Subscribe', top:"40%"});
subscribe.addEventListener('click', subscribeToChannel);
$.win.add(subscribe);

var notify = Ti.UI.createButton({title:'Notify', top:"10%"});
notify.addEventListener('click', sendTestNotification);
$.win.add(notify);

var unsubscribe = Ti.UI.createButton({title:'Unsubscribe', top:"10%"});
unsubscribe.addEventListener('click', unsubscribeToChannel);
$.win.add(unsubscribe);