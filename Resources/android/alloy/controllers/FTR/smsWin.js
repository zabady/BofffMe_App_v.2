function Controller() {
    function onChangeSMSCodeTxtField(e) {
        if (4 == e.source.value.length) {
            $.btn_continue.enabled = true;
            $.btn_continue.backgroundColor = "#2279bc";
            $.btn_continue.color = "white";
        } else {
            $.btn_continue.enabled = false;
            $.btn_continue.backgroundColor = "#D8D8D8";
            $.btn_continue.color = "#C0C0C0";
        }
    }
    function continueBtnPressed() {
        if ($.btn_continue.enabled) if ($.txt_SMSCode.value == accessCode) {
            var userMainDetailsWin = Alloy.createController("FTR/userMainDetailsWin").getView();
            userMainDetailsWin.open({
                activityEnterAnimation: Ti.Android.R.anim.slide_in_left
            });
        } else {
            alert("Wrong Code !\nPlease try again");
            $.txt_SMSCode.focus();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/smsWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: false,
        id: "win",
        title: "SMS Confirmation"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId100 = Ti.UI.createView({
        top: "5%",
        width: "100%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId100"
    });
    $.__views.win.add($.__views.__alloyId100);
    $.__views.lbl_gotYourCode = Ti.UI.createLabel({
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        width: "60%",
        top: "8%",
        height: Ti.UI.SIZE,
        textAlign: "center",
        id: "lbl_gotYourCode",
        text: "Got your code ?\nJust COPY it."
    });
    $.__views.__alloyId100.add($.__views.lbl_gotYourCode);
    $.__views.txt_SMSCode = Ti.UI.createTextField({
        bubbleParent: false,
        width: "75%",
        keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Enter your code here",
        color: "white",
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        top: "8%",
        height: Ti.UI.SIZE,
        textAlign: "center",
        id: "txt_SMSCode"
    });
    $.__views.__alloyId100.add($.__views.txt_SMSCode);
    onChangeSMSCodeTxtField ? $.__views.txt_SMSCode.addEventListener("change", onChangeSMSCodeTxtField) : __defers["$.__views.txt_SMSCode!change!onChangeSMSCodeTxtField"] = true;
    $.__views.btn_continue = Ti.UI.createButton({
        top: "8%",
        height: "40",
        textAlign: "center",
        borderRadius: 5,
        font: {
            fontSize: "15",
            fontWeight: "bold"
        },
        width: "50%",
        backgroundColor: "#D8D8D8",
        color: "#C0C0C0",
        id: "btn_continue",
        title: "Continue",
        enabled: "false"
    });
    $.__views.__alloyId100.add($.__views.btn_continue);
    continueBtnPressed ? $.__views.btn_continue.addEventListener("click", continueBtnPressed) : __defers["$.__views.btn_continue!click!continueBtnPressed"] = true;
    $.__views.__alloyId101 = Ti.UI.createLabel({
        font: {
            fontSize: "14"
        },
        color: "gray",
        width: "60%",
        top: "8%",
        height: Ti.UI.SIZE,
        textAlign: "center",
        text: "A code was sent to you via SMS.",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        font: {
            fontSize: "14"
        },
        color: "gray",
        width: "60%",
        top: "8%",
        height: Ti.UI.SIZE,
        textAlign: "center",
        text: "It can take up to a minute, thank you for your patience.",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var accessCode = "0000";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var response = JSON.parse(this.responseText);
            accessCode = response.rows;
        },
        onerror: function() {
            Ti.UI.createAlertDialog({
                title: "Error",
                message: "Check your internet connection.",
                cancel: 0,
                buttonNames: [ "Ok" ]
            }).show();
        }
    });
    xhr.open("POST", Alloy.Globals.apiUrl + "send_code_msg");
    ({
        mobile: Alloy.Globals.userSignUpData.phone
    });
    $.win.addEventListener("click", function() {
        $.txt_SMSCode.blur();
    });
    $.win.addEventListener("androidback", function() {
        $.win.close({
            activityExitAnimation: Ti.Android.R.anim.slide_out_right
        });
    });
    Ti.UI.Clipboard.clearData();
    Ti.UI.Clipboard.clearText();
    Ti.App.addEventListener("resumed", function() {
        if (Ti.UI.Clipboard.hasText() && Ti.UI.Clipboard.getText() == accessCode) {
            $.txt_SMSCode.value = Ti.UI.Clipboard.getText();
            $.txt_SMSCode.fireEvent("change");
        }
    });
    $.win.addEventListener("focus", function() {
        if (Ti.UI.Clipboard.hasText() && Ti.UI.Clipboard.getText() == accessCode) {
            $.txt_SMSCode.value = Ti.UI.Clipboard.getText();
            $.txt_SMSCode.fireEvent("change");
        }
    });
    __defers["$.__views.txt_SMSCode!change!onChangeSMSCodeTxtField"] && $.__views.txt_SMSCode.addEventListener("change", onChangeSMSCodeTxtField);
    __defers["$.__views.btn_continue!click!continueBtnPressed"] && $.__views.btn_continue.addEventListener("click", continueBtnPressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;