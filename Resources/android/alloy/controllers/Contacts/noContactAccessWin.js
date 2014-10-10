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
    this.__controllerPath = "Contacts/noContactAccessWin";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.noContactAccessWin = Ti.UI.createView({
        layout: "vertical",
        id: "noContactAccessWin"
    });
    $.__views.noContactAccessWin && $.addTopLevelView($.__views.noContactAccessWin);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        color: "#2279bc",
        font: {
            fontSize: "20"
        },
        top: 25,
        textAlign: "center",
        text: "No access granted to contacts, this application requires access to your contacts in order to work !",
        id: "__alloyId64"
    });
    $.__views.noContactAccessWin.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        color: "#2279bc",
        font: {
            fontSize: "20"
        },
        top: 25,
        textAlign: "center",
        text: "To allow it, go to settings, open Bofff Me app and turn on contacts access.",
        id: "__alloyId65"
    });
    $.__views.noContactAccessWin.add($.__views.__alloyId65);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;