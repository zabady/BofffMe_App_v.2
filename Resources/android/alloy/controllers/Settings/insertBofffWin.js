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
    $.__views.__alloyId88 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId88"
    });
    $.__views.win.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId90"
    });
    $.__views.__alloyId88.add($.__views.__alloyId90);
    textFieldChanges ? $.__views.__alloyId90.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId90!change!textFieldChanges"] = true;
    $.__views.__alloyId91 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId91"
    });
    $.__views.__alloyId88.add($.__views.__alloyId91);
    textFieldChanges ? $.__views.__alloyId91.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId91!change!textFieldChanges"] = true;
    $.__views.__alloyId92 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId92"
    });
    $.__views.__alloyId88.add($.__views.__alloyId92);
    textFieldChanges ? $.__views.__alloyId92.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId92!change!textFieldChanges"] = true;
    $.__views.__alloyId93 = Ti.UI.createTextField({
        top: 40,
        color: "white",
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId93"
    });
    $.__views.__alloyId88.add($.__views.__alloyId93);
    textFieldChanges ? $.__views.__alloyId93.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId93!change!textFieldChanges"] = true;
    $.__views.__alloyId94 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId94"
    });
    $.__views.__alloyId88.add($.__views.__alloyId94);
    openLibrary ? $.__views.__alloyId94.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId94!click!openLibrary"] = true;
    $.__views.__alloyId95 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId95"
    });
    $.__views.__alloyId88.add($.__views.__alloyId95);
    continuePressed ? $.__views.__alloyId95.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId95!click!continuePressed"] = true;
    var __alloyId97 = [];
    __alloyId97.push("Edit");
    __alloyId97.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId97,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId90!change!textFieldChanges"] && $.__views.__alloyId90.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId91!change!textFieldChanges"] && $.__views.__alloyId91.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId92!change!textFieldChanges"] && $.__views.__alloyId92.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId93!change!textFieldChanges"] && $.__views.__alloyId93.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId94!click!openLibrary"] && $.__views.__alloyId94.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId95!click!continuePressed"] && $.__views.__alloyId95.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;