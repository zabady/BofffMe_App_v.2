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
    var __alloyId121 = [];
    $.__views.__alloyId122 = Ti.UI.createTableViewRow({
        id: "__alloyId122"
    });
    __alloyId121.push($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createTextField({
        bubbleParent: false,
        hintText: "Zeby",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.__alloyId120 = Ti.UI.createTableView({
        data: __alloyId121,
        id: "__alloyId120"
    });
    $.__views.basicInfoWin.add($.__views.__alloyId120);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;