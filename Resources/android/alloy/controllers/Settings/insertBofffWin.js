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
    $.__views.__alloyId41 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId41"
    });
    $.__views.win.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId43"
    });
    $.__views.__alloyId41.add($.__views.__alloyId43);
    textFieldChanges ? $.__views.__alloyId43.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId43!change!textFieldChanges"] = true;
    $.__views.__alloyId44 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId44"
    });
    $.__views.__alloyId41.add($.__views.__alloyId44);
    textFieldChanges ? $.__views.__alloyId44.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId44!change!textFieldChanges"] = true;
    $.__views.__alloyId45 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId45"
    });
    $.__views.__alloyId41.add($.__views.__alloyId45);
    textFieldChanges ? $.__views.__alloyId45.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId45!change!textFieldChanges"] = true;
    $.__views.__alloyId46 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId46"
    });
    $.__views.__alloyId41.add($.__views.__alloyId46);
    textFieldChanges ? $.__views.__alloyId46.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId46!change!textFieldChanges"] = true;
    $.__views.__alloyId47 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId47"
    });
    $.__views.__alloyId41.add($.__views.__alloyId47);
    openLibrary ? $.__views.__alloyId47.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId47!click!openLibrary"] = true;
    $.__views.__alloyId48 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId48"
    });
    $.__views.__alloyId41.add($.__views.__alloyId48);
    continuePressed ? $.__views.__alloyId48.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId48!click!continuePressed"] = true;
    var __alloyId50 = [];
    __alloyId50.push("Edit");
    __alloyId50.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId50,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId43!change!textFieldChanges"] && $.__views.__alloyId43.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId44!change!textFieldChanges"] && $.__views.__alloyId44.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId45!change!textFieldChanges"] && $.__views.__alloyId45.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId46!change!textFieldChanges"] && $.__views.__alloyId46.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId47!click!openLibrary"] && $.__views.__alloyId47.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId48!click!continuePressed"] && $.__views.__alloyId48.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;