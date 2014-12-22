function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function contactsAccessDenied() {
        var noContactAccessView = Alloy.createController("Contacts/noContactAccessWin");
        $.win_boffsList.add(noContactAccessView.getView());
    }
    function performAddressBookFunction() {
        var contacts = Ti.Contacts.getAllPeople();
        for (var x in contacts) sortedContacts.push(contacts[x]);
        sortedContacts.sort();
        editContactsToCorrectForm();
    }
    function sortBofffs(a, b) {
        if (a.contactName.toUpperCase() > b.contactName.toUpperCase()) return 1;
        if (a.contactName.toUpperCase() < b.contactName.toUpperCase()) return -1;
        return 0;
    }
    function removeCharactersFromPhoneNumber(phoneNumber) {
        var phoneNumberExpression = /^\d+$/;
        var correctPhoneNumber = "";
        if (phoneNumberExpression.test(phoneNumber)) correctPhoneNumber = phoneNumber; else for (var character in phoneNumber) phoneNumberExpression.test(phoneNumber[character]) && (correctPhoneNumber += phoneNumber[character]);
        return correctPhoneNumber;
    }
    function isRepeatedPhoneNumber(phoneNumber) {
        if (null == repeatedNumberCheck[phoneNumber]) {
            repeatedNumberCheck[phoneNumber] = 0;
            return false;
        }
        alert("Repeated number: " + phoneNumber);
        return true;
    }
    function editContactsToCorrectForm() {
        var allContactsPhoneNumbersAndIds = [];
        var contactPhoneNumbers;
        for (var contact in sortedContacts) {
            contactPhoneNumbers = sortedContacts[contact].getPhone();
            if (!isEmpty(contactPhoneNumbers)) for (var i in contactPhoneNumbers) for (var num in contactPhoneNumbers[i]) {
                if (isRepeatedPhoneNumber(contactPhoneNumbers[i][num])) continue;
                var correctPhoneNumber = removeCharactersFromPhoneNumber(contactPhoneNumbers[i][num]);
                var numberAndId = {
                    number: correctPhoneNumber,
                    id: sortedContacts[contact].id
                };
                allContactsPhoneNumbersAndIds.push(numberAndId);
            }
        }
        findBofffs(allContactsPhoneNumbersAndIds);
    }
    function findBofffs(contactNumbers) {
        var bofffFriends = [];
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var bofffsData = [];
                bofffFriends = JSON.parse(this.responseText);
                if (isEmpty(bofffFriends)) {
                    var noFriendsView = Alloy.createController("Contacts/noFriendsWin");
                    $.win_boffsList.add(noFriendsView.getView());
                    return;
                }
                for (var record in bofffFriends) {
                    var fullName = Titanium.Contacts.getPersonByID(bofffFriends[record].contact_id).fullName;
                    bofffFriends[record].contactName = fullName;
                    var data = {
                        fullName: bofffFriends[record]["bofff"].fullName,
                        icon_image: bofffFriends[record]["bofff"].icon_image,
                        friend_pin_code: bofffFriends[record]["bofff"].pin,
                        user_pin_code: Alloy.Globals.userPin,
                        contactName: fullName
                    };
                    bofffsData.push(data);
                }
                addFriend(bofffsData, bofffFriends);
                bofffFriends.sort(sortBofffs);
            },
            onerror: function() {
                alert(this.responseText);
                alert("Error in findBofffs function in coreContactsWin.js");
            }
        });
        var params = {
            numbers: JSON.stringify(contactNumbers),
            pin: Alloy.Globals.userPin
        };
        xhr.open("POST", Alloy.Globals.apiUrl + "detect_user_friends_by_mobile/bofff");
        xhr.send(params);
    }
    function addFriend(data, bofffFriends) {
        var bofffsList = [];
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var response = JSON.parse(this.responseText);
                bofffsList = response.rows;
                if (bofffsList.length > 0) {
                    bofffsList.sort(sortBofffs);
                    Titanium.App.Properties.setObject("bofffsSpecificData", bofffsList);
                    initializeBofffsList(bofffFriends, bofffsList);
                }
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        xhr.open("POST", Alloy.Globals.apiUrl + "insert_friend/bofff/user_friends");
        var params = {
            friends: JSON.stringify(data)
        };
        xhr.send(params);
    }
    function isEmpty(obj) {
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    }
    function initializeBofffsList(bofffFriends, bofffsList) {
        var bofffContactsPayload = {
            bofffFriends: bofffFriends,
            bofffsList: bofffsList
        };
        bofffsContacts = Alloy.createController("Contacts/bofffsContacts", bofffContactsPayload);
        $.win_boffsList.add(bofffsContacts.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/coreContactsWin";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.win_boffsList = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win_boffsList",
        title: "Contacts"
    });
    $.__views.win_boffsList && $.addTopLevelView($.__views.win_boffsList);
    $.__views.btn_settings = Ti.UI.createButton({
        id: "btn_settings"
    });
    $.__views.win_boffsList.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId63 = Ti.UI.createImageView({
        id: "__alloyId63"
    });
    $.__views.win_boffsList.leftNavButton = $.__views.__alloyId63;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var sortedContacts = [];
    var repeatedNumberCheck = [];
    Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
        e.success ? performAddressBookFunction() : contactsAccessDenied();
    }) : contactsAccessDenied();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;