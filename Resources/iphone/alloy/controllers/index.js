function Controller() {
    function settingsClicked() {
        nappDrawerWin.toggleRightWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settingsWin = Alloy.createController("settingsWin", {
        id: "settingsWin"
    });
    $.__views.settingsWin && $.addTopLevelView($.__views.settingsWin);
    var __alloyId0 = [];
    $.__views.qrCodeWin = Alloy.createController("qrCodeWin", {
        id: "qrCodeWin"
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.qrCodeWin.getViewEx({
            recurse: true
        }),
        title: "QR Code",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.contactsWin = Alloy.createController("Contacts/coreContactsWin", {
        id: "contactsWin"
    });
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.contactsWin.getViewEx({
            recurse: true
        }),
        title: "Contacts",
        icon: "/images/man-7aram.png",
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.__alloyId5 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Tab 3",
        id: "__alloyId5"
    });
    $.__views.__alloyId7 = Ti.UI.createButton({
        backgroundImage: "/images/icon_settings.png",
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        id: "__alloyId7"
    });
    settingsClicked ? $.__views.__alloyId7.addEventListener("click", settingsClicked) : __defers["$.__views.__alloyId7!click!settingsClicked"] = true;
    $.__views.__alloyId5.rightNavButton = $.__views.__alloyId7;
    $.__views.__alloyId9 = Ti.UI.createImageView({
        image: "/images/app_icon_60x60.png",
        width: 40,
        height: 40,
        id: "__alloyId9"
    });
    $.__views.__alloyId5.leftNavButton = $.__views.__alloyId9;
    $.__views.__alloyId10 = Ti.UI.createLabel({
        text: "I am Window 2",
        id: "__alloyId10"
    });
    $.__views.__alloyId5.add($.__views.__alloyId10);
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Tab 3",
        icon: "/images/love-7aram.png",
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var NappDrawerModule = require("dk.napp.drawer");
    var nappDrawerWin = NappDrawerModule.createDrawer({
        centerWindow: $.tabGroup,
        rightWindow: $.settingsWin.win,
        fading: .2,
        parallaxAmount: .2,
        shadowWidth: "40dp",
        rightDrawerWidth: "230",
        animationMode: NappDrawerModule.ANIMATION_NONE,
        closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
        openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
    });
    nappDrawerWin.open();
    $.qrCodeWin.btn_settings.addEventListener("click", settingsClicked);
    $.contactsWin.btn_settings.addEventListener("click", settingsClicked);
    $.settingsWin.win.addEventListener("close", function() {
        nappDrawerWin.toggleRightWindow();
    });
    __defers["$.__views.__alloyId7!click!settingsClicked"] && $.__views.__alloyId7.addEventListener("click", settingsClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;