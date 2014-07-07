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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "Add Bofff"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId108 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId108"
    });
    $.__views.win.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId109"
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId110"
    });
    $.__views.__alloyId108.add($.__views.__alloyId110);
    textFieldChanges ? $.__views.__alloyId110.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId110!change!textFieldChanges"] = true;
    $.__views.__alloyId111 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId111"
    });
    $.__views.__alloyId108.add($.__views.__alloyId111);
    textFieldChanges ? $.__views.__alloyId111.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId111!change!textFieldChanges"] = true;
    $.__views.__alloyId112 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId112"
    });
    $.__views.__alloyId108.add($.__views.__alloyId112);
    textFieldChanges ? $.__views.__alloyId112.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId112!change!textFieldChanges"] = true;
    $.__views.__alloyId113 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId113"
    });
    $.__views.__alloyId108.add($.__views.__alloyId113);
    textFieldChanges ? $.__views.__alloyId113.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId113!change!textFieldChanges"] = true;
    $.__views.__alloyId114 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId114"
    });
    $.__views.__alloyId108.add($.__views.__alloyId114);
    openLibrary ? $.__views.__alloyId114.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId114!click!openLibrary"] = true;
    $.__views.__alloyId115 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId115"
    });
    $.__views.__alloyId108.add($.__views.__alloyId115);
    continuePressed ? $.__views.__alloyId115.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId115!click!continuePressed"] = true;
    var __alloyId117 = [];
    __alloyId117.push("Edit");
    __alloyId117.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId117,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId110!change!textFieldChanges"] && $.__views.__alloyId110.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId111!change!textFieldChanges"] && $.__views.__alloyId111.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId112!change!textFieldChanges"] && $.__views.__alloyId112.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId113!change!textFieldChanges"] && $.__views.__alloyId113.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId114!click!openLibrary"] && $.__views.__alloyId114.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId115!click!continuePressed"] && $.__views.__alloyId115.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;