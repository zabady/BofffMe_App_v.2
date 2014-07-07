function loginWithFacebook(atLoginSuccessFunction, nextFunctionData) {
    if (facebook.loggedIn) {
        atLoginSuccessFunction(nextFunctionData);
        Alloy.Globals.loading.show("Please Wait ..", false);
    } else {
        facebook.addEventListener("login", function(e) {
            if (e.success) {
                atLoginSuccessFunction(nextFunctionData);
                Ti.API.info("Facebook login completed !");
                Alloy.Globals.loading.show("Please Wait ..", false);
            } else e.error ? alert(e.error) : e.cancelled && alert("Canceled");
        });
        facebook.authorize();
    }
}

function requestWithGraphPath(nextFunctionData) {
    facebook.requestWithGraphPath("me", {}, "GET", function(e) {
        if (e.success) {
            facebookData = JSON.parse(e.result);
            nextFunctionData();
            Ti.API.info("Request with graph completed !");
        } else e.error ? alert(e.error) : e.cancelled && alert("Canceled");
    });
}

function getNameEmailPicture() {
    Alloy.Globals.userSignUpData.name = facebookData.name;
    Alloy.Globals.userSignUpData.email = facebookData.email;
    Alloy.Globals.userSignUpData.gender = facebookData.gender;
    getAndSaveFbProfilePic("https://graph.facebook.com/" + facebookData.id + "/picture?type=square&redirect=false", "icon");
    getAndSaveFbProfilePic("https://graph.facebook.com/" + facebookData.id + "/picture?width=500&redirect=false", "large");
}

function getAndSaveFbProfilePic(profilePicUrl_data, imgType) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var profilePicUrl = JSON.parse(this.responseText).data.url;
            saveFbProfilePic(profilePicUrl, imgType);
            Ti.API.info("Got one photo's data !");
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 1e4
    });
    client.open("GET", profilePicUrl_data, false);
    client.send();
}

function saveFbProfilePic(profilePicUrl, imgType) {
    var client = Titanium.Network.createHTTPClient({
        onload: function() {
            var image_file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "img_profile_pic_" + imgType + ".jpg");
            image_file.write(this.responseData);
            if ("icon" == imgType) Alloy.Globals.userSignUpData.profilePicture.icon = image_file; else if ("large" == imgType) {
                Alloy.Globals.userSignUpData.profilePicture.large = image_file;
                Alloy.Globals.loading.hide();
                Ti.App.fireEvent("facebookFinished");
            }
            Ti.API.info(imgType + " saved");
        },
        onerror: function(e) {
            Alloy.Globals.loading.hide();
            alert(e.error);
        },
        timeout: 1e4
    });
    client.open("GET", profilePicUrl);
    client.send();
}

var facebook, facebookData;

facebook = require("facebook");

facebook.appid = 0xa5faa5324460;

facebook.permissions = [ "email" ];

facebook.forceDialogAuth = true;