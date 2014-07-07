function Controller() {
    function changeRightNavButton() {
        var currentView = $.scrollableview_mainContactsView.getCurrentPage();
        $.win_boffsList.rightNavButton = 1 == currentView ? myBofffsButton : allContactsButton;
    }
    function addressBookDisallowed() {
        alert("Failed");
    }
    function performAddressBookFunction() {
        var contacts = Ti.Contacts.getAllPeople();
        sortedContacts = [];
        for (var x in contacts) sortedContacts.push(contacts[x]);
        sortedContacts.sort();
        getContactsReady();
    }
    function sortBofffs(a, b) {
        if (a.contactName.toUpperCase() > b.contactName.toUpperCase()) return 1;
        if (a.contactName.toUpperCase() < b.contactName.toUpperCase()) return -1;
        return 0;
    }
    function getContactsReady() {
        var repeatedNumberCheck = [];
        var contactNumbersAndIds = [];
        var mobileNumbers;
        var expression = /^\d+$/;
        for (var contact in sortedContacts) {
            mobileNumbers = sortedContacts[contact].getPhone();
            if (!isEmpty(mobileNumbers)) for (var i in mobileNumbers) for (var x in mobileNumbers[i]) {
                var trimmedNumber = "";
                if (expression.test(mobileNumbers[i][x])) trimmedNumber = mobileNumbers[i][x]; else for (var character in mobileNumbers[i][x]) expression.test(mobileNumbers[i][x][character]) && (trimmedNumber += mobileNumbers[i][x][character]);
                if (null != repeatedNumberCheck[trimmedNumber]) continue;
                repeatedNumberCheck[trimmedNumber] = 0;
                var numberAndId;
                var numberAndId = {
                    number: trimmedNumber,
                    id: sortedContacts[contact].recordId
                };
                contactNumbersAndIds.push(numberAndId);
            }
        }
        findBofffs(contactNumbersAndIds);
    }
    function findBofffs(contactNumbers) {
        var bofffFriends = [];
        var contactNames = [];
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var bofffsData = [];
                bofffFriends = JSON.parse(this.responseText);
                for (var record in bofffFriends) {
                    var fullName = Titanium.Contacts.getPersonByID(bofffFriends[record].contact_id).fullName;
                    bofffFriends[record].contactName = fullName;
                    contactNames.push(fullName);
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
            }
        });
        var params = {
            numbers: JSON.stringify(contactNumbers),
            pin: Alloy.Globals.userPin
        };
        xhr.open("POST", url + "detect_user_friends_by_mobile/bofff");
        xhr.send(params);
    }
    function addFriend(data, bofffFriends) {
        var bofffsList = [];
        var url = "http://www.bofffme.com/api/index.php/home/";
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
        xhr.open("POST", url + "insert_friend/bofff/user_friends");
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
            mainView: $.scrollableview_mainContactsView,
            bofffFriends: bofffFriends,
            bofffsList: bofffsList
        };
        bofffsContacts = Alloy.createController("Contacts/bofffsContacts", bofffContactsPayload);
        var views = [ bofffsContacts.getView() ];
        $.scrollableview_mainContactsView.setViews(views);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/coreContactsWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win_boffsList = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win_boffsList",
        title: "Contacts"
    });
    $.__views.win_boffsList && $.addTopLevelView($.__views.win_boffsList);
    $.__views.btn_settings = Ti.UI.createButton({
        backgroundImage: "/images/icon_settings.png",
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        id: "btn_settings"
    });
    $.__views.win_boffsList.rightNavButton = $.__views.btn_settings;
    $.__views.__alloyId50 = Ti.UI.createImageView({
        image: "/images/app_icon_60x60.png",
        width: 40,
        height: 40,
        id: "__alloyId50"
    });
    $.__views.win_boffsList.leftNavButton = $.__views.__alloyId50;
    $.__views.__alloyId51 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId51"
    });
    $.__views.win_boffsList.add($.__views.__alloyId51);
    var __alloyId52 = [];
    $.__views.scrollableview_mainContactsView = Ti.UI.createScrollableView({
        views: __alloyId52,
        showPagingControl: "true",
        id: "scrollableview_mainContactsView"
    });
    $.__views.__alloyId51.add($.__views.scrollableview_mainContactsView);
    changeRightNavButton ? $.__views.scrollableview_mainContactsView.addEventListener("scrollend", changeRightNavButton) : __defers["$.__views.scrollableview_mainContactsView!scrollend!changeRightNavButton"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var allContactsButton = Titanium.UI.createButton({
        title: "all contacts"
    });
    var myBofffsButton = Titanium.UI.createButton({
        title: "my bofffs"
    });
    allContactsButton.addEventListener("click", function() {
        $.scrollableview_mainContactsView.scrollToView(1);
    });
    myBofffsButton.addEventListener("click", function() {
        $.scrollableview_mainContactsView.scrollToView(0);
    });
    Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
        e.success ? performAddressBookFunction() : addressBookDisallowed();
    }) : addressBookDisallowed();
    var sortedContacts;
    Ti.Contacts.addEventListener("reload", function() {});
    ({
        mainView: $.scrollableview_mainContactsView,
        sortedContacts: sortedContacts
    });
    var bofffContactsPayload = {
        mainView: $.scrollableview_mainContactsView,
        sortedContacts: sortedContacts
    };
    var bofffsContacts = Alloy.createController("Contacts/bofffsContacts", bofffContactsPayload);
    $.scrollableview_mainContactsView.addView(bofffsContacts.getView());
    __defers["$.__views.scrollableview_mainContactsView!scrollend!changeRightNavButton"] && $.__views.scrollableview_mainContactsView.addEventListener("scrollend", changeRightNavButton);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;