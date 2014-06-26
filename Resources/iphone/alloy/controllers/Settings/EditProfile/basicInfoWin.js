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
    var __alloyId93 = [];
    $.__views.__alloyId94 = Ti.UI.createTableViewRow({
        id: "__alloyId94"
    });
    __alloyId93.push($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createTextField({
        hintText: "Zeby",
        id: "__alloyId95"
    });
    $.__views.__alloyId94.add($.__views.__alloyId95);
    $.__views.__alloyId92 = Ti.UI.createTableView({
        data: __alloyId93,
        id: "__alloyId92"
    });
    $.__views.basicInfoWin.add($.__views.__alloyId92);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;