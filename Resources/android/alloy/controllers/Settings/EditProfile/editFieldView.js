function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editFieldView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    $.__views.__alloyId156 = Ti.UI.createView({
        opacity: "0.4",
        height: "25%",
        backgroundColor: "black",
        id: "__alloyId156"
    });
    $.__views.editView.add($.__views.__alloyId156);
    Zeby ? $.__views.__alloyId156.addEventListener("click", Zeby) : __defers["$.__views.__alloyId156!click!Zeby"] = true;
    $.__views.__alloyId157 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#58c8f3",
        height: Ti.UI.SIZE,
        softKeyboardOnFocus: Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        id: "__alloyId157"
    });
    $.__views.editView.add($.__views.__alloyId157);
    $.__views.fieldTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldTitle"
    });
    $.__views.__alloyId157.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        bubbleParent: false,
        color: "white",
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
    $.__views.__alloyId157.add($.__views.fieldValue);
    $.__views.__alloyId158 = Ti.UI.createView({
        opacity: "0.4",
        height: "60%",
        backgroundColor: "black",
        id: "__alloyId158"
    });
    $.__views.editView.add($.__views.__alloyId158);
    Zeby ? $.__views.__alloyId158.addEventListener("click", Zeby) : __defers["$.__views.__alloyId158!click!Zeby"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId156!click!Zeby"] && $.__views.__alloyId156.addEventListener("click", Zeby);
    __defers["$.__views.__alloyId158!click!Zeby"] && $.__views.__alloyId158.addEventListener("click", Zeby);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;