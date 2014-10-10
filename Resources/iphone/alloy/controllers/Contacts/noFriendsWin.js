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
    this.__controllerPath = "Contacts/noFriendsWin";
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
    $.__views.noFriendsWin = Ti.UI.createView({
        layout: "vertical",
        id: "noFriendsWin"
    });
    $.__views.noFriendsWin && $.addTopLevelView($.__views.noFriendsWin);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        color: "#2279bc",
        font: {
            fontSize: "20"
        },
        top: 25,
        text: "No friends found on server",
        id: "__alloyId56"
    });
    $.__views.noFriendsWin.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        color: "#2279bc",
        font: {
            fontSize: "20"
        },
        top: 25,
        text: "Invite friends should be implemented here !",
        id: "__alloyId57"
    });
    $.__views.noFriendsWin.add($.__views.__alloyId57);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;