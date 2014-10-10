function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openPicker() {
        $.txt_country_ios.blur();
        false == $.picker.visible && ($.picker.visible = true);
        animation.fadeIn($.picker, 500);
    }
    function changeCountryAndCountryCode() {
        $.txt_country_ios.value = $.picker.getSelectedRow(0).title;
        currentCountryCode = $.picker.getSelectedRow(0).id.toLowerCase();
    }
    function continueBtnPressed() {
        var phoneNumberRegex = /^[0-9]{9,15}$/;
        if ($.txt_phoneNumber.value.match(phoneNumberRegex)) {
            $.txt_phoneNumber.blur();
            $.dialog_confirm.message = "Do do you confirm that this is your number: +" + allCountries[currentCountryCode].phoneCode + parseInt($.txt_phoneNumber.value, 10) + "\nAn SMS with your access code will be sent to this number.";
            $.dialog_confirm.show();
        } else alert("The number you entered is not valid");
    }
    function dialogConfirmPressed(e) {
        if (0 == e.index) $.txt_phoneNumber.focus(); else {
            Alloy.Globals.userSignUpData.phone = allCountries[currentCountryCode].phoneCode + parseInt($.txt_phoneNumber.value, 10);
            var smsWin = Alloy.createController("FTR/smsWin").getView();
            Alloy.Globals.mainNav.openWindow(smsWin);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/phoneNumberWin";
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
        exitOnClose: true,
        id: "win",
        title: "Bofff Me Setup"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId74 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId74"
    });
    $.__views.win.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        top: "8%",
        color: "#2279bc",
        textAlign: "center",
        width: "75%",
        font: {
            fontSize: "15"
        },
        text: "Type in your phone number",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.txt_country_ios = Ti.UI.createTextField({
        bubbleParent: false,
        top: "20",
        width: "85%",
        font: {
            fontSize: "15"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        id: "txt_country_ios"
    });
    $.__views.__alloyId74.add($.__views.txt_country_ios);
    openPicker ? $.__views.txt_country_ios.addEventListener("focus", openPicker) : __defers["$.__views.txt_country_ios!focus!openPicker"] = true;
    $.__views.__alloyId76 = Ti.UI.createView({
        backgroundColor: "gray",
        id: "__alloyId76"
    });
    $.__views.__alloyId74.add($.__views.__alloyId76);
    $.__views.txt_phoneNumber = Ti.UI.createTextField({
        bubbleParent: false,
        top: "5",
        width: "85%",
        font: {
            fontSize: "15"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        id: "txt_phoneNumber",
        hintText: "Phone Number without country code"
    });
    $.__views.__alloyId74.add($.__views.txt_phoneNumber);
    $.__views.__alloyId77 = Ti.UI.createButton({
        top: 20,
        color: "white",
        backgroundColor: "#2279bc",
        borderRadius: 5,
        font: {
            fontSize: "15",
            fontWeight: "bold"
        },
        height: "40",
        width: "50%",
        bubbleParent: false,
        title: "Continue",
        id: "__alloyId77"
    });
    $.__views.__alloyId74.add($.__views.__alloyId77);
    continueBtnPressed ? $.__views.__alloyId77.addEventListener("click", continueBtnPressed) : __defers["$.__views.__alloyId77!click!continueBtnPressed"] = true;
    $.__views.__alloyId78 = Ti.UI.createLabel({
        top: "8%",
        color: "gray",
        textAlign: "center",
        width: "75%",
        font: {
            fontSize: "15"
        },
        text: "Keep your bofff friends in sync with your contact list by registering your phone number.",
        id: "__alloyId78"
    });
    $.__views.__alloyId74.add($.__views.__alloyId78);
    $.__views.picker = Ti.UI.createPicker({
        color: "black",
        selectionIndicator: true,
        width: "80%",
        height: "42",
        bottom: 0,
        bubbleParent: false,
        visible: false,
        id: "picker"
    });
    $.__views.win.add($.__views.picker);
    changeCountryAndCountryCode ? $.__views.picker.addEventListener("change", changeCountryAndCountryCode) : __defers["$.__views.picker!change!changeCountryAndCountryCode"] = true;
    var __alloyId80 = [];
    __alloyId80.push("Edit");
    __alloyId80.push("Confirm");
    $.__views.dialog_confirm = Ti.UI.createAlertDialog({
        buttonNames: __alloyId80,
        id: "dialog_confirm",
        title: "Confirm your number"
    });
    dialogConfirmPressed ? $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed) : __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentCountryCode = Alloy.Globals.countryCode ? Alloy.Globals.countryCode : Titanium.Locale.getCurrentCountry().toLowerCase();
    var allCountries = require("countries");
    var selectedRow, pickerRows = [], counter = 0;
    for (var country in allCountries) {
        var row = Titanium.UI.createPickerRow({
            title: allCountries[country].name + " (+" + allCountries[country].phoneCode + ")",
            id: country.toUpperCase()
        });
        allCountries[currentCountryCode] == allCountries[country] && (selectedRow = counter);
        counter++;
        pickerRows.push(row);
    }
    $.picker.add(pickerRows);
    $.picker.setSelectedRow(0, selectedRow, true);
    $.txt_country_ios.value = allCountries[currentCountryCode].name + " (+" + allCountries[currentCountryCode].phoneCode + ")";
    var animation = require("alloy/animation");
    animation.fadeOut($.picker, 0);
    $.win.addEventListener("click", function() {
        animation.fadeOut($.picker, 500);
        $.txt_phoneNumber.blur();
    });
    $.win.leftNavButton = Ti.UI.createButton();
    __defers["$.__views.txt_country_ios!focus!openPicker"] && $.__views.txt_country_ios.addEventListener("focus", openPicker);
    __defers["$.__views.__alloyId77!click!continueBtnPressed"] && $.__views.__alloyId77.addEventListener("click", continueBtnPressed);
    __defers["$.__views.picker!change!changeCountryAndCountryCode"] && $.__views.picker.addEventListener("change", changeCountryAndCountryCode);
    __defers["$.__views.dialog_confirm!click!dialogConfirmPressed"] && $.__views.dialog_confirm.addEventListener("click", dialogConfirmPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;