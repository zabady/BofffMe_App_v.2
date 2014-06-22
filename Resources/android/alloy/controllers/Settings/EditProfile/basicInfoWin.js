function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/basicInfoWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.basicInfoWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "basicInfoWin"
    });
    $.__views.basicInfoWin && $.addTopLevelView($.__views.basicInfoWin);
    var __alloyId106 = [];
    $.__views.__alloyId107 = Ti.UI.createTableViewRow({
        id: "__alloyId107"
    });
    __alloyId106.push($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createTextField({
        hintText: "Zeby",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
    $.__views.__alloyId105 = Ti.UI.createTableView({
        data: __alloyId106,
        id: "__alloyId105"
    });
    $.__views.basicInfoWin.add($.__views.__alloyId105);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;