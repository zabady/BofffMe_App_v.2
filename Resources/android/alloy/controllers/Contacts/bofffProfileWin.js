function Controller() {
    function enlargeImage() {
        if (passedData.profilePicture) {
            var params = {
                iconImage: passedData.iconImage,
                profilePicture: passedData.profilePicture
            };
            Alloy.Globals.openNavigationWindow(Alloy.createController("Contacts/bofffImageWin", params).getView(), false);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts/bofffProfileWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.bofffProfileWin = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Contact Info",
        id: "bofffProfileWin"
    });
    $.__views.bofffProfileWin && $.addTopLevelView($.__views.bofffProfileWin);
    var __alloyId36 = [];
    $.__views.__alloyId37 = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "#D0D0D0",
        id: "__alloyId37"
    });
    __alloyId36.push($.__views.__alloyId37);
    $.__views.img = Ti.UI.createImageView({
        width: 100,
        height: 100,
        left: 10,
        id: "img"
    });
    $.__views.__alloyId37.add($.__views.img);
    enlargeImage ? $.__views.img.addEventListener("click", enlargeImage) : __defers["$.__views.img!click!enlargeImage"] = true;
    $.__views.lbl_name = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: "20",
            fontWeight: "bold"
        },
        left: 120,
        id: "lbl_name"
    });
    $.__views.__alloyId37.add($.__views.lbl_name);
    $.__views.tableView = Ti.UI.createTableView({
        data: __alloyId36,
        id: "tableView"
    });
    $.__views.bofffProfileWin.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var passedData = arguments[0] || {};
    var bofffData = passedData.data;
    $.lbl_name.text = passedData.name;
    $.img.image = passedData.iconImage;
    for (var bofffContact in bofffData) {
        var fieldLabel = Ti.UI.createLabel({
            text: bofffData[bofffContact].FieldName
        });
        var valueLabel = Ti.UI.createLabel({
            text: bofffData[bofffContact].FieldValue
        });
        var row = Ti.UI.createTableViewRow({
            layout: "horizontal"
        });
        row.add(fieldLabel);
        row.add(valueLabel);
        $.tableView.appendRow(row);
    }
    __defers["$.__views.img!click!enlargeImage"] && $.__views.img.addEventListener("click", enlargeImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;