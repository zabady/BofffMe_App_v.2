function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.userSignUpData = new Object({
        pin: "temp",
        name: "temp",
        phone: "temp",
        email: "email@temp.com",
        gender: "male",
        deviceToken: "temp",
        profilePicture: new Object()
    });
    var welcomeWin = Alloy.createController("FTR/welcomeWin").getView();
    Alloy.Globals.mainNav = Titanium.UI.iOS.createNavigationWindow({
        window: welcomeWin,
        backgroundColor: "#2279bc"
    });
    Alloy.Globals.mainNav.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;