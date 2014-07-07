function Controller() {
    function openClickedSettings(e) {
        var selectedSettingWin;
        if (-1 != e.source.window.search("http")) selectedSettingWin = Alloy.createController("webViewWin", {
            url: e.source.window
        }).getView(); else {
            var windowUrl = "Settings/" + e.source.window;
            selectedSettingWin = Alloy.createController(windowUrl).getView();
        }
        if (-1 != e.source.window.search("EditProfile") && true) {
            tempNavWin.navBarHidden = true;
            tempRootWin.navBarHidden = true;
        }
        Alloy.Globals.openNavigationWindow(selectedSettingWin, true);
        $.win.fireEvent("close");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settingsWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "Settings"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        font: {
            fontSize: "30",
            fontWeight: "bold"
        },
        color: "#2279bc",
        height: "10%",
        top: "8%",
        text: "Settings",
        id: "__alloyId24"
    });
    $.__views.win.add($.__views.__alloyId24);
    var __alloyId26 = [];
    $.__views.__alloyId27 = Ti.UI.createTableViewRow({
        window: "EditProfile/editProfileIndex",
        id: "__alloyId27"
    });
    __alloyId26.push($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "My Profile",
        window: "EditProfile/editProfileIndex",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createTableViewRow({
        window: "http://www.bofffme.com",
        id: "__alloyId29"
    });
    __alloyId26.push($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "About",
        window: "http://www.bofffme.com",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createTableViewRow({
        window: "http://www.google.com",
        id: "__alloyId31"
    });
    __alloyId26.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "FAQ",
        window: "http://www.google.com",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createTableViewRow({
        window: "tutorialWin",
        id: "__alloyId33"
    });
    __alloyId26.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Video Tutorial",
        window: "tutorialWin",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createTableViewRow({
        window: "insertBofffWin",
        id: "__alloyId35"
    });
    __alloyId26.push($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Add Bofff Contact (DEBUG)",
        window: "insertBofffWin",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createTableViewRow({
        window: "changeUserPinWin",
        id: "__alloyId37"
    });
    __alloyId26.push($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Change User Pin (DEBUG)",
        window: "changeUserPinWin",
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.__alloyId25 = Ti.UI.createTableView({
        top: "23%",
        rowHeight: 60,
        height: Ti.UI.SIZE,
        data: __alloyId26,
        id: "__alloyId25"
    });
    $.__views.win.add($.__views.__alloyId25);
    openClickedSettings ? $.__views.__alloyId25.addEventListener("click", openClickedSettings) : __defers["$.__views.__alloyId25!click!openClickedSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId25!click!openClickedSettings"] && $.__views.__alloyId25.addEventListener("click", openClickedSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;