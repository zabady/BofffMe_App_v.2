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
    $.__views.__alloyId100 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId100"
    });
    $.__views.win.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "1",
        hintText: "Name",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    textFieldChanges ? $.__views.__alloyId102.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId102!change!textFieldChanges"] = true;
    $.__views.__alloyId103 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "2",
        hintText: "Phone Number",
        id: "__alloyId103"
    });
    $.__views.__alloyId100.add($.__views.__alloyId103);
    textFieldChanges ? $.__views.__alloyId103.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId103!change!textFieldChanges"] = true;
    $.__views.__alloyId104 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "3",
        hintText: "Email",
        id: "__alloyId104"
    });
    $.__views.__alloyId100.add($.__views.__alloyId104);
    textFieldChanges ? $.__views.__alloyId104.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId104!change!textFieldChanges"] = true;
    $.__views.__alloyId105 = Ti.UI.createTextField({
        bubbleParent: false,
        top: 40,
        color: "white",
        switchValue: "4",
        hintText: "Gender",
        id: "__alloyId105"
    });
    $.__views.__alloyId100.add($.__views.__alloyId105);
    textFieldChanges ? $.__views.__alloyId105.addEventListener("change", textFieldChanges) : __defers["$.__views.__alloyId105!change!textFieldChanges"] = true;
    $.__views.__alloyId106 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Choose Picture",
        id: "__alloyId106"
    });
    $.__views.__alloyId100.add($.__views.__alloyId106);
    openLibrary ? $.__views.__alloyId106.addEventListener("click", openLibrary) : __defers["$.__views.__alloyId106!click!openLibrary"] = true;
    $.__views.__alloyId107 = Ti.UI.createButton({
        top: 40,
        color: "white",
        title: "Continue",
        id: "__alloyId107"
    });
    $.__views.__alloyId100.add($.__views.__alloyId107);
    continuePressed ? $.__views.__alloyId107.addEventListener("click", continuePressed) : __defers["$.__views.__alloyId107!click!continuePressed"] = true;
    var __alloyId109 = [];
    __alloyId109.push("Edit");
    __alloyId109.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId109,
        id: "dialog_confirm",
        title: "Confirm data"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId102!change!textFieldChanges"] && $.__views.__alloyId102.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId103!change!textFieldChanges"] && $.__views.__alloyId103.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId104!change!textFieldChanges"] && $.__views.__alloyId104.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId105!change!textFieldChanges"] && $.__views.__alloyId105.addEventListener("change", textFieldChanges);
    __defers["$.__views.__alloyId106!click!openLibrary"] && $.__views.__alloyId106.addEventListener("click", openLibrary);
    __defers["$.__views.__alloyId107!click!continuePressed"] && $.__views.__alloyId107.addEventListener("click", continuePressed);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;