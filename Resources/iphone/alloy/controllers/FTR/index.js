function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
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