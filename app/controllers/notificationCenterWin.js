
// Event listener to window.focus, so that the window loads the notifications each time it gets focused
function LoadNotifications()
{
	// Getting all notifications array from properties (saved in callback function of receiving push notifcation, pushNotifcationAPIs.js)
	var allNotifications = Titanium.App.Properties.getObject('notifications');
	// Creating the main list section that will contain all listItems (all notifications)
	var mainSection = Ti.UI.createListSection({ headerTitle: 'All Notifications'});
	
	// If the user didn't receive any notification yet, show 'no notifications' on a list item
	if(!allNotifications || allNotifications.length == 0) {
		var listItems = [{
			notificationTitle: {text: 'No Notifications'},
			message: {text: 'No friend updates, you will be notified when one of your friends updates his profile.' },
			properties: { height : 90 },
		}];
	} else {
		
		// Create listItems array containg all the notifications
		var listItems = [];
		for(var i in allNotifications) {
			var notification = {
				pic : { image: allNotifications[i].iconImage },
				notificationTitle : { text: allNotifications[i].notificationTitle },
				message : { text: allNotifications[i].notificationMessage },
				properties: { height : 90 },
			};
			listItems.push(notification);
		}
	}
	
	// Set main section's items to listItems whether it contains notifications or not
	mainSection.setItems(listItems);
	
	// Add main section to sections array and set the list view's sections to the new sections array
	var sections = [];
	sections.push(mainSection);
	$.listView.sections = sections;
}

// We add it to Globals in order to be fired in the case that the device receives a new notification and the tab is active
Alloy.Globals.LoadNotifications = LoadNotifications;

LoadNotifications();
