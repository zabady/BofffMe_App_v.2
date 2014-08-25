function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId9() {
        $.__views.tabGroup.removeEventListener("open", __alloyId9);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId8 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                icon: Ti.App.Android.R.drawable.settingsicon,
                id: "__alloyId7"
            };
            $.__views.__alloyId7 = e.menu.add(_.pick(__alloyId8, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId7.applyProperties(_.omit(__alloyId8, Alloy.Android.menuItemCreateArgs));
            settingsClicked ? $.__views.__alloyId7.addEventListener("click", settingsClicked) : __defers["$.__views.__alloyId7!click!settingsClicked"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function settingsClicked() {
        var settingsWin = Alloy.createController("settingsWin").getView();
        settingsWin.addEventListener("open", function() {
            settingsWin.activity.actionBar.onHomeIconItemSelected = function() {
                settingsWin.close();
            };
            settingsWin.activity.actionBar.displayHomeAsUp = true;
        });
        settingsWin.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appTabGroup";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId0 = [];
    $.__views.contactsWin = Alloy.createController("Contacts/coreContactsWin", {
        id: "contactsWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId1 = Ti.UI.createTab({
        icon: Ti.App.Android.R.drawable.contacticon,
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
        icon: Ti.App.Android.R.drawable.notificationicon,
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
        icon: Ti.App.Android.R.drawable.qrcodeicon2,
        window: $.__views.qrCodeWin.getViewEx({
            recurse: true
        }),
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        exitOnClose: true,
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_ALWAYS_HIDDEN,
        tabs: __alloyId0,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId9);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabGroup.open();
    Alloy.Globals.OpenNotificationCenter = function() {
        Alloy.Globals.LoadNotifications();
        $.tabGroup.setActiveTab(2);
    };
    __defers["$.__views.__alloyId7!click!settingsClicked"] && $.__views.__alloyId7.addEventListener("click", settingsClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;