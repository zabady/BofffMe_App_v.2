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
    this.__controllerPath = "Settings/EditProfile/privacyPicker";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.pickerView = Ti.UI.createView({
        id: "pickerView",
        visible: "false"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    $.__views.transparentView1 = Ti.UI.createView({
        id: "transparentView1",
        opacity: "0.5",
        top: "0",
        height: "80%",
        backgroundColor: "black"
    });
    $.__views.pickerView.add($.__views.transparentView1);
    $.__views.__alloyId171 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: "0",
        layout: "vertical",
        id: "__alloyId171"
    });
    $.__views.pickerView.add($.__views.__alloyId171);
    var __alloyId174 = [];
    $.__views.__alloyId175 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
        id: "__alloyId175"
    });
    __alloyId174.push($.__views.__alloyId175);
    $.__views.btn_toolBarDone = Ti.UI.createButton({
        id: "btn_toolBarDone",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done"
    });
    __alloyId174.push($.__views.btn_toolBarDone);
    $.__views.__alloyId172 = Ti.UI.iOS.createToolbar({
        items: __alloyId174,
        id: "__alloyId172"
    });
    $.__views.__alloyId171.add($.__views.__alloyId172);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker"
    });
    $.__views.__alloyId171.add($.__views.picker);
    var __alloyId176 = [];
    $.__views.__alloyId177 = Ti.UI.createPickerRow({
        title: "public",
        id: "__alloyId177"
    });
    __alloyId176.push($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createPickerRow({
        title: "friends",
        id: "__alloyId178"
    });
    __alloyId176.push($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createPickerRow({
        title: "favorites",
        id: "__alloyId179"
    });
    __alloyId176.push($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createPickerRow({
        title: "onlyMe",
        id: "__alloyId180"
    });
    __alloyId176.push($.__views.__alloyId180);
    $.__views.picker.add(__alloyId176);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;