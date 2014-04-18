function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/bofffImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win_bofffImage = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win_bofffImage",
        title: "Bofff Info",
        navTintColor: "#2279bc"
    });
    $.__views.win_bofffImage && $.addTopLevelView($.__views.win_bofffImage);
    $.__views.img_bofffImage = Ti.UI.createImageView({
        id: "img_bofffImage",
        width: "500",
        height: Ti.UI.SIZE
    });
    $.__views.win_bofffImage.add($.__views.img_bofffImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var image = args.image;
    var bofffName = args.bofffName;
    var iconImage = args.iconImage;
    $.win_bofffImage.title = bofffName;
    $.img_bofffImage.defaultImage = iconImage;
    $.img_bofffImage.image = image;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;