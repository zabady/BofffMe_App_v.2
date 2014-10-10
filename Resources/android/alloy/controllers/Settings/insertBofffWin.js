function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function textFieldChanges(e) {
        switch (parseInt(e.source.switchValue)) {
          case 1:
            bofffContactData.fullName = e.source.value;
            break;

          case 2:
            bofffContactData.primary_mobile = e.source.value;
            break;

          case 3:
            bofffContactData.primary_email = e.source.value;
            break;

          case 4:
            bofffContactData.gender = e.source.value;
            break;

          default:
            alert("Error");
        }
    }
    function openLibrary() {
        Ti.Media.openPhotoGallery({
            success: function(event) {
                bofffContactData.profile_picture = event.media;
            },
            cancel: function() {
                alert("You've Cancelled !");
            },
            error: function(error) {
                alert("Unexpected error: " + error.code);
            },
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function continuePressed() {
        $.dialog_confirm.message = bofffContactData;
        $.dialog_confirm.show();
    }
    function dialogConfirmPressed(e) {
        1 == e.index && signUp();
    }
    function signUp() {
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                alert(this.responseText);
            },
            onerror: function() {
                alert("Check your internet connection.");
            }
        });
        xhr.open("POST", Alloy.Globals.apiUrl + "insert/bofff/user_accounts");
        xhr.send(bofffContactData);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/insertBofffWin";
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "Add Bofff"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId110 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId110"
    });
    $.__views.win.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createTextField({
        bubbleParent: false,
        color: "white",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        top: 40,
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId112"
    });
    $.__views.__alloyId110.add($.__views.__alloyId112);
    textFieldChanges ? $.__views.__alloyId112.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId112!change!textFieldChanges"] = true;
    $.__views.__alloyId113 = Ti.UI.createTextField({
        bubbleParent: false,
        color: "white",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        top: 40,
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId113"
    });
    $.__views.__alloyId110.add($.__views.__alloyId113);
    textFieldChanges ? $.__views.__alloyId113.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId113!change!textFieldChanges"] = true;
    $.__views.__alloyId114 = Ti.UI.createTextField({
        bubbleParent: false,
        color: "white",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        top: 40,
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId114"
    });
    $.__views.__alloyId110.add($.__views.__alloyId114);
    textFieldChanges ? $.__views.__alloyId114.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId114!change!textFieldChanges"] = true;
    $.__views.__alloyId115 = Ti.UI.createTextField({
        bubbleParent: false,
        color: "white",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        top: 40,
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId115"
    });
    $.__views.__alloyId110.add($.__views.__alloyId115);
    textFieldChanges ? $.__views.__alloyId115.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId115!change!textFieldChanges"] = true;
    $.__views.__alloyId116 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId116"
    });
    $.__views.__alloyId110.add($.__views.__alloyId116);
    openLibrary ? $.__views.__alloyId116.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId116!click!openLibrary"] = true;
    $.__views.__alloyId117 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId117"
    });
    $.__views.__alloyId110.add($.__views.__alloyId117);
    continuePressed ? $.__views.__alloyId117.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId117!click!continuePressed"] = true;
    var __alloyId119 = [];
    __alloyId119.push("Edit");
    __alloyId119.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId119,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId112!change!textFieldChanges"] && $.__views.__alloyId112.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId113!change!textFieldChanges"] && $.__views.__alloyId113.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId114!change!textFieldChanges"] && $.__views.__alloyId114.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId115!change!textFieldChanges"] && $.__views.__alloyId115.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId116!click!openLibrary"] && $.__views.__alloyId116.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId117!click!continuePressed"] && $.__views.__alloyId117.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;