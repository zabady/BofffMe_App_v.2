function Controller() {
    function __alloyId20() {
        $.__views.tabGroup.removeEventListener("open", __alloyId20);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId19 = {
                icon: "/images/icon_settings.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId18"
            };
            $.__views.__alloyId18 = e.menu.add(_.pick(__alloyId19, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId18.applyProperties(_.omit(__alloyId19, Alloy.Android.menuItemCreateArgs));
            settingsClicked ? $.__views.__alloyId18.addEventListener("click", settingsClicked) : __defers["$.__views.__alloyId18!click!settingsClicked"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function settingsClicked() {
        var settingsWin = Alloy.createController("settingsWin").getView();
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
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId4 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Tab 2",
        id: "__alloyId4"
    });
    $.__views.__alloyId6 = Ti.UI.createButton({
        id: "__alloyId6"
    });
    settingsClicked ? $.__views.__alloyId6.addEventListener("click", settingsClicked) : __defers["$.__views.__alloyId6!click!settingsClicked"] = true;
    $.__views.__alloyId4.rightNavButton = $.__views.__alloyId6;
    $.__views.__alloyId8 = Ti.UI.createButton({
        id: "__alloyId8"
    });
    $.__views.__alloyId4.leftNavButton = $.__views.__alloyId8;
    $.__views.__alloyId9 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        text: "I am Window 1",
        id: "__alloyId9"
    });
    $.__views.__alloyId4.add($.__views.__alloyId9);
    $.__views.__alloyId3 = Ti.UI.createTab({
        window: $.__views.__alloyId4,
        title: "Tab 2",
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.__alloyId11 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Tab 3",
        id: "__alloyId11"
    });
    $.__views.__alloyId13 = Ti.UI.createButton({
        id: "__alloyId13"
    });
    settingsClicked ? $.__views.__alloyId13.addEventListener("click", settingsClicked) : __defers["$.__views.__alloyId13!click!settingsClicked"] = true;
    $.__views.__alloyId11.rightNavButton = $.__views.__alloyId13;
    $.__views.__alloyId15 = Ti.UI.createButton({
        id: "__alloyId15"
    });
    $.__views.__alloyId11.leftNavButton = $.__views.__alloyId15;
    $.__views.__alloyId16 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        text: "I am Window 2",
        id: "__alloyId16"
    });
    $.__views.__alloyId11.add($.__views.__alloyId16);
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Tab 3",
        id: "__alloyId10"
    });
    __alloyId0.push($.__views.__alloyId10);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId20);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabGroup.open();
    __defers["$.__views.__alloyId6!click!settingsClicked"] && $.__views.__alloyId6.addEventListener("click", settingsClicked);
    __defers["$.__views.__alloyId13!click!settingsClicked"] && $.__views.__alloyId13.addEventListener("click", settingsClicked);
    __defers["$.__views.__alloyId18!click!settingsClicked"] && $.__views.__alloyId18.addEventListener("click", settingsClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;