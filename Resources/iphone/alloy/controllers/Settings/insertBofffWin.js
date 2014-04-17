function Controller() {
    function textFieldChanges(e) {
        switch (e.source.switchValue) {
          case 1:
            bofffContactData.fullName = e.source.value;
            break;

          case 2:
            bofffContactData.primary_mobile = e.source.value;
            break;

          case 3:
            bofffContactData.primary_email = e.source.value;
            break;

          default:
            alert("Error");
        }
        alert("TextField " + e.source.switchValue + " edited.");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/insertBofffWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win",
        title: "Add Bofff",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        font: {
            fontSize: "20dp"
        },
        color: "#2279bc",
        height: "60",
        text: "Add a new Bofff !",
        top: "40",
        id: "__alloyId38"
    });
    $.__views.win.add($.__views.__alloyId38);
    var __alloyId40 = [];
    $.__views.__alloyId41 = Ti.UI.createTableViewRow({
        id: "__alloyId41"
    });
    __alloyId40.push($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createTextField({
        hintText: "Name",
        switchValue: "1",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    textFieldChanges ? $.__views.__alloyId42.addEventListener("blur", textFieldChanges) : __defers["$.__views.__alloyId42!blur!textFieldChanges"] = true;
    $.__views.__alloyId43 = Ti.UI.createTableViewRow({
        id: "__alloyId43"
    });
    __alloyId40.push($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createTextField({
        hintText: "Phone Number",
        switchValue: "2",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    textFieldChanges ? $.__views.__alloyId44.addEventListener("blur", textFieldChanges) : __defers["$.__views.__alloyId44!blur!textFieldChanges"] = true;
    $.__views.__alloyId45 = Ti.UI.createTableViewRow({
        id: "__alloyId45"
    });
    __alloyId40.push($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createTextField({
        hintText: "Email",
        switchValue: "3",
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    textFieldChanges ? $.__views.__alloyId46.addEventListener("blur", textFieldChanges) : __defers["$.__views.__alloyId46!blur!textFieldChanges"] = true;
    $.__views.__alloyId47 = Ti.UI.createTableViewRow({
        id: "__alloyId47"
    });
    __alloyId40.push($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createButton({
        title: "Continue",
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    $.__views.__alloyId39 = Ti.UI.createTableView({
        top: 20,
        rowHeight: 60,
        data: __alloyId40,
        id: "__alloyId39"
    });
    $.__views.win.add($.__views.__alloyId39);
    openClickedSettings ? $.__views.__alloyId39.addEventListener("click", openClickedSettings) : __defers["$.__views.__alloyId39!click!openClickedSettings"] = true;
    $.__views.__alloyId49 = Ti.UI.createOptionDialog({
        id: "__alloyId49"
    });
    exports.destroy = function() {};
    _.extend($, $.__views);
    var bofffContactData = new Object();
    __defers["$.__views.__alloyId42!blur!textFieldChanges"] && $.__views.__alloyId42.addEventListener("blur", textFieldChanges);
    __defers["$.__views.__alloyId44!blur!textFieldChanges"] && $.__views.__alloyId44.addEventListener("blur", textFieldChanges);
    __defers["$.__views.__alloyId46!blur!textFieldChanges"] && $.__views.__alloyId46.addEventListener("blur", textFieldChanges);
    __defers["$.__views.__alloyId39!click!openClickedSettings"] && $.__views.__alloyId39.addEventListener("click", openClickedSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;