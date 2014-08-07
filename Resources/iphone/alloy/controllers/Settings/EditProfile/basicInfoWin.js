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
    this.__controllerPath = "Settings/EditProfile/basicInfoWin";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.basicInfoWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "basicInfoWin"
    });
    $.__views.basicInfoWin && $.addTopLevelView($.__views.basicInfoWin);
    var __alloyId107 = [];
    $.__views.__alloyId108 = Ti.UI.createTableViewRow({
        id: "__alloyId108"
    });
    __alloyId107.push($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createTextField({
        bubbleParent: false,
        hintText: "Text Field",
        id: "__alloyId109"
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
    $.__views.__alloyId106 = Ti.UI.createTableView({
        data: __alloyId107,
        id: "__alloyId106"
    });
    $.__views.basicInfoWin.add($.__views.__alloyId106);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;