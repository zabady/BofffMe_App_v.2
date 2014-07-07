// TODO: make sure that timeouts used in creating httpClients are good
// TODO: Fix error: Login fired twice if logged in then out then in again

var facebook, facebookData;
facebook = require('facebook');
facebook.appid = 182495931941984;
facebook.permissions = ['email']; // Permissions your app needs
facebook.forceDialogAuth = true;

function loginWithFacebook(atLoginSuccessFunction, nextFunctionData) {
	if (!facebook.loggedIn) {
		facebook.addEventListener('login', function(e){
			if (e.success) {
				atLoginSuccessFunction(nextFunctionData);
				Ti.API.info("Facebook login completed !");
				Alloy.Globals.loading.show("Please Wait ..", false); // Show loading view
			} else if (e.error) {
		        alert(e.error);
		    } else if (e.cancelled) {
		        alert("Canceled");
		    }
		});
		facebook.authorize();
	} else {
		atLoginSuccessFunction(nextFunctionData);
		Alloy.Globals.loading.show("Please Wait ..", false); // Show loading view
	}
}


function requestWithGraphPath(nextFunctionData) {
	// After requesting with graph, we use the user's imported data from e.response
	facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		if (e.success) {
			facebookData = JSON.parse(e.result);
			nextFunctionData();
			Ti.API.info("Request with graph completed !");
		} else if (e.error) {
	        alert(e.error);
	    } else if (e.cancelled) {
	        alert("Canceled");
	    }
	});
}

function getNameEmailPicture(objectsToChange) {
	//Alloy.Globals.loading.show('Please Wait ..', false); // Showing Loading View
	
	Alloy.Globals.userSignUpData.name = facebookData.name;
	Alloy.Globals.userSignUpData.email = facebookData.email;
	Alloy.Globals.userSignUpData.gender = facebookData.gender;
	
	getAndSaveFbProfilePic("https://graph.facebook.com/" + facebookData.id + "/picture?type=square&redirect=false", "icon");
	getAndSaveFbProfilePic("https://graph.facebook.com/" + facebookData.id + "/picture?width=500&redirect=false", "large");
}

function getAndSaveFbProfilePic(profilePicUrl_data, imgType) {
	// Create HTTP Client to get the profile picture data 
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			// We are going to save the two pictures, icon and large different resolutions
			var profilePicUrl = JSON.parse(this.responseText).data.url; // Get the photo url
			saveFbProfilePic(profilePicUrl, imgType);
			Ti.API.info("Got one photo's data !");
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout: 10000
	});
	client.open("GET", profilePicUrl_data, false);
	client.send();
}

function saveFbProfilePic(profilePicUrl, imgType) {
	var client = Titanium.Network.createHTTPClient({
		onload : function(e) {
			var image_file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "img_profile_pic_" + imgType + ".jpg");
			image_file.write(this.responseData); // Save the photo from responseDATA
			
			if (imgType == 'icon') {
				Alloy.Globals.userSignUpData.profilePicture.icon = image_file; 
			} else if (imgType == 'large') {
				Alloy.Globals.userSignUpData.profilePicture.large = image_file;
				Alloy.Globals.loading.hide(); // Hide Loading View
				// Fire the event that will set the UI with facebook data
				// It's put here because it will display the large image
				Ti.App.fireEvent('facebookFinished');
			}
			Ti.API.info(imgType + " saved");
		},
		onerror : function(e) {
			Alloy.Globals.loading.hide(); // Hide Loading View
			alert(e.error);
		},
		timeout: 10000
	}); 
	client.open("GET", profilePicUrl);
	client.send();
}