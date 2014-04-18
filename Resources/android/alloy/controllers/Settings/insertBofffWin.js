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
    $.__views.__alloyId76 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId76"
    });
    $.__views.win.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId78"
    });
    $.__views.__alloyId76.add($.__views.__alloyId78);
    textFieldChanges ? $.__views.__alloyId78.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId78!change!textFieldChanges"] = true;
    $.__views.__alloyId79 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId79"
    });
    $.__views.__alloyId76.add($.__views.__alloyId79);
    textFieldChanges ? $.__views.__alloyId79.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId79!change!textFieldChanges"] = true;
    $.__views.__alloyId80 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId80"
    });
    $.__views.__alloyId76.add($.__views.__alloyId80);
    textFieldChanges ? $.__views.__alloyId80.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId80!change!textFieldChanges"] = true;
    $.__views.__alloyId81 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId81"
    });
    $.__views.__alloyId76.add($.__views.__alloyId81);
    textFieldChanges ? $.__views.__alloyId81.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId81!change!textFieldChanges"] = true;
    $.__views.__alloyId82 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId82"
    });
    $.__views.__alloyId76.add($.__views.__alloyId82);
    openLibrary ? $.__views.__alloyId82.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId82!click!openLibrary"] = true;
    $.__views.__alloyId83 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId83"
    });
    $.__views.__alloyId76.add($.__views.__alloyId83);
    continuePressed ? $.__views.__alloyId83.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId83!click!continuePressed"] = true;
    var __alloyId85 = [];
    __alloyId85.push("Edit");
    __alloyId85.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId85,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId78!change!textFieldChanges"] && $.__views.__alloyId78.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId79!change!textFieldChanges"] && $.__views.__alloyId79.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId80!change!textFieldChanges"] && $.__views.__alloyId80.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId81!change!textFieldChanges"] && $.__views.__alloyId81.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId82!click!openLibrary"] && $.__views.__alloyId82.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId83!click!continuePressed"] && $.__views.__alloyId83.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;