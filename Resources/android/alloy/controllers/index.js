function Controller() {
    function __alloyId9() {
        $.__views.tabGroup.removeEventListener("open", __alloyId9);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId8 = {
                icon: "/images/icon_settings.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
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
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
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
    $.__views.notificationCenterWin = Alloy.createController("notificationCenterWin", {
        id: "notificationCenterWin"
    });
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.notificationCenterWin.getViewEx({
            recurse: true
        }),
        title: "Notifications",
        icon: "/images/love-7aram.png",
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId9);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabGroup.open();
    Alloy.Globals.OpenNotificationCenter = function() {
        if ("Notifications" == $.tabGroup.activeTab.title) {
            Alloy.Globals.LoadNotifications();
            alert("not gdida");
        } else $.tabGroup.setActiveTab(2);
    };
    __defers["$.__views.__alloyId7!click!settingsClicked"] && $.__views.__alloyId7.addEventListener("click", settingsClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;