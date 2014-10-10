function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openClickedSettings(e) {
        if ("FTR" == e.source.window) {
            var isFTR = Titanium.App.Properties.getObject("FTR");
            Titanium.App.Properties.setObject("FTR", !isFTR);
            alert("FTR will start after restarting the app.");
            return;
        }
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
        title: "Settings"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        font: {
            fontSize: "30",
            fontWeight: "bold"
        },
        color: "#2279bc",
        height: "10%",
        top: "8%",
        text: "Settings",
        id: "__alloyId23"
    });
    $.__views.win.add($.__views.__alloyId23);
    var __alloyId25 = [];
    $.__views.__alloyId26 = Ti.UI.createTableViewRow({
        window: "EditProfile/editProfileIndex",
        id: "__alloyId26"
    });
    __alloyId25.push($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "My Profile",
        window: "EditProfile/editProfileIndex",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createTableViewRow({
        window: "http://www.bofffme.com",
        id: "__alloyId28"
    });
    __alloyId25.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "About",
        window: "http://www.bofffme.com",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        window: "http://www.google.com",
        id: "__alloyId30"
    });
    __alloyId25.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "FAQ",
        window: "http://www.google.com",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createTableViewRow({
        window: "tutorialWin",
        id: "__alloyId32"
    });
    __alloyId25.push($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Video Tutorial",
        window: "tutorialWin",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createTableViewRow({
        window: "insertBofffWin",
        id: "__alloyId34"
    });
    __alloyId25.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Add Bofff Contact (DEBUG)",
        window: "insertBofffWin",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createTableViewRow({
        window: "changeUserPinWin",
        id: "__alloyId36"
    });
    __alloyId25.push($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Change User Pin (DEBUG)",
        window: "changeUserPinWin",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createTableViewRow({
        window: "FTR",
        id: "__alloyId38"
    });
    __alloyId25.push($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        font: {
            fontSize: "20"
        },
        color: "black",
        height: "60",
        text: "Start FTR (DEBUG)",
        window: "FTR",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.__alloyId24 = Ti.UI.createTableView({
        top: "23%",
        rowHeight: 60,
        height: Ti.UI.SIZE,
        data: __alloyId25,
        id: "__alloyId24"
    });
    $.__views.win.add($.__views.__alloyId24);
    openClickedSettings ? $.__views.__alloyId24.addEventListener("click", openClickedSettings) : __defers["$.__views.__alloyId24!click!openClickedSettings"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId24!click!openClickedSettings"] && $.__views.__alloyId24.addEventListener("click", openClickedSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;