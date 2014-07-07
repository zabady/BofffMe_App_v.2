function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/privacyPicker";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pickerView = Ti.UI.createView({
        id: "pickerView",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "vertical",
        visible: "false"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    $.__views.transparentView1 = Ti.UI.createView({
        id: "transparentView1",
        opacity: "0.4",
        height: "25%",
        backgroundColor: "black"
    });
    $.__views.pickerView.add($.__views.transparentView1);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        useSpinner: "true"
    });
    $.__views.pickerView.add($.__views.picker);
    var __alloyId190 = [];
    $.__views.__alloyId191 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId191"
    });
    __alloyId190.push($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId192"
    });
    __alloyId190.push($.__views.__alloyId192);
    $.__views.__alloyId193 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId193"
    });
    __alloyId190.push($.__views.__alloyId193);
    $.__views.__alloyId194 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId194"
    });
    __alloyId190.push($.__views.__alloyId194);
    $.__views.__alloyId195 = Ti.UI.createPickerRow({
        title: "                                             ",
        id: "__alloyId195"
    });
    __alloyId190.push($.__views.__alloyId195);
    $.__views.picker.add(__alloyId190);
    $.__views.transparentView2 = Ti.UI.createView({
        id: "transparentView2",
        opacity: "0.4",
        height: "60%",
        backgroundColor: "black"
    });
    $.__views.pickerView.add($.__views.transparentView2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;