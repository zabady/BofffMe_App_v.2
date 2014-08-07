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
    this.__controllerPath = "Settings/EditProfile/editFieldView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.editView = Ti.UI.createView({
        id: "editView",
        visible: "false",
        height: "100%",
        layout: "vertical"
    });
    $.__views.editView && $.addTopLevelView($.__views.editView);
    $.__views.__alloyId152 = Ti.UI.createView({
        opacity: "0.4",
        height: "25%",
        backgroundColor: "black",
        id: "__alloyId152"
    });
    $.__views.editView.add($.__views.__alloyId152);
    Zeby ? $.__views.__alloyId152.addEventListener("click", Zeby) : __defers["$.__views.__alloyId152!click!Zeby"] = true;
    $.__views.__alloyId153 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#58c8f3",
        height: Ti.UI.SIZE,
        softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        id: "__alloyId153"
    });
    $.__views.editView.add($.__views.__alloyId153);
    $.__views.fieldTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldTitle"
    });
    $.__views.__alloyId153.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        bubbleParent: false,
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldValue"
    });
    $.__views.__alloyId153.add($.__views.fieldValue);
    $.__views.__alloyId154 = Ti.UI.createView({
        opacity: "0.4",
        height: "60%",
        backgroundColor: "black",
        id: "__alloyId154"
    });
    $.__views.editView.add($.__views.__alloyId154);
    Zeby ? $.__views.__alloyId154.addEventListener("click", Zeby) : __defers["$.__views.__alloyId154!click!Zeby"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId152!click!Zeby"] && $.__views.__alloyId152.addEventListener("click", Zeby);
    __defers["$.__views.__alloyId154!click!Zeby"] && $.__views.__alloyId154.addEventListener("click", Zeby);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;