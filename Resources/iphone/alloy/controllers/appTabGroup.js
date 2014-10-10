function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function settingsClicked() {
        nappDrawerWin.toggleRightWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appTabGroup";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.settingsWin = Alloy.createController("settingsWin", {
        id: "settingsWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.settingsWin && $.addTopLevelView($.__views.settingsWin);
    var __alloyId0 = [];
    $.__views.contactsWin = Alloy.createController("Contacts/coreContactsWin", {
        id: "contactsWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        title: "Contacts",
        icon: "/images/man-7aram.png",
        window: $.__views.contactsWin.getViewEx({
            recurse: true
        }),
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.notificationCenterWin = Alloy.createController("notificationCenterWin", {
        id: "notificationCenterWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId2 = Ti.UI.createTab({
        title: "Notifications",
        icon: "/images/love-7aram.png",
        window: $.__views.notificationCenterWin.getViewEx({
            recurse: true
        }),
        id: "__alloyId2"
    });
    __alloyId0.push($.__views.__alloyId2);
    $.__views.qrCodeWin = Alloy.createController("qrCodeWin", {
        id: "qrCodeWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId4 = Ti.UI.createTab({
        title: "QR Code",
        icon: "/images/QR-code-7aram.png",
        window: $.__views.qrCodeWin.getViewEx({
            recurse: true
        }),
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        exitOnClose: true,
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
    $.notificationCenterWin.btn_settings.addEventListener("click", settingsClicked);
    $.settingsWin.win.addEventListener("close", function() {
        nappDrawerWin.toggleRightWindow();
    });
    Alloy.Globals.OpenNotificationCenter = function() {
        Alloy.Globals.LoadNotifications();
        $.tabGroup.setActiveTab(2);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;