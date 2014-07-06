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
    $.__views.__alloyId92 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId92"
    });
    $.__views.win.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId94"
    });
    $.__views.__alloyId92.add($.__views.__alloyId94);
    textFieldChanges ? $.__views.__alloyId94.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId94!change!textFieldChanges"] = true;
    $.__views.__alloyId95 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId95"
    });
    $.__views.__alloyId92.add($.__views.__alloyId95);
    textFieldChanges ? $.__views.__alloyId95.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId95!change!textFieldChanges"] = true;
    $.__views.__alloyId96 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId96"
    });
    $.__views.__alloyId92.add($.__views.__alloyId96);
    textFieldChanges ? $.__views.__alloyId96.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId96!change!textFieldChanges"] = true;
    $.__views.__alloyId97 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId97"
    });
    $.__views.__alloyId92.add($.__views.__alloyId97);
    textFieldChanges ? $.__views.__alloyId97.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId97!change!textFieldChanges"] = true;
    $.__views.__alloyId98 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId98"
    });
    $.__views.__alloyId92.add($.__views.__alloyId98);
    openLibrary ? $.__views.__alloyId98.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId98!click!openLibrary"] = true;
    $.__views.__alloyId99 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId99"
    });
    $.__views.__alloyId92.add($.__views.__alloyId99);
    continuePressed ? $.__views.__alloyId99.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId99!click!continuePressed"] = true;
    var __alloyId101 = [];
    __alloyId101.push("Edit");
    __alloyId101.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId101,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId94!change!textFieldChanges"] && $.__views.__alloyId94.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId95!change!textFieldChanges"] && $.__views.__alloyId95.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId96!change!textFieldChanges"] && $.__views.__alloyId96.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId97!change!textFieldChanges"] && $.__views.__alloyId97.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId98!click!openLibrary"] && $.__views.__alloyId98.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId99!click!continuePressed"] && $.__views.__alloyId99.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;