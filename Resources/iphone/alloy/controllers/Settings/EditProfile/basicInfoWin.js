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
    var __alloyId96 = [];
    $.__views.__alloyId97 = Ti.UI.createTableViewRow({
        id: "__alloyId97"
    });
    __alloyId96.push($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createTextField({
        hintText: "Zeby",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    $.__views.__alloyId95 = Ti.UI.createTableView({
        data: __alloyId96,
        id: "__alloyId95"
    });
    $.__views.basicInfoWin.add($.__views.__alloyId95);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;