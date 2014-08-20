function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function CancelClicked() {
        $.tabGroup.close();
    }
    function EditClicked(e) {
        $[e.source.requiredViewId].tableView.editing = !$[e.source.requiredViewId].tableView.editing;
    }
    function SubmitDataToServer() {
        alert(userDataInArrays);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editProfileIndex";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId137 = [];
    $.__views.__alloyId139 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId139"
    });
    $.__views.__alloyId141 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId141"
    });
    $.__views.__alloyId142 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    EditClicked ? $.__views.__alloyId142.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId142!click!EditClicked"] = true;
    $.__views.__alloyId143 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId143"
    });
    $.__views.__alloyId141.add($.__views.__alloyId143);
    SubmitDataToServer ? $.__views.__alloyId143.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId143!click!SubmitDataToServer"] = true;
    $.__views.__alloyId139.rightNavButton = $.__views.__alloyId141;
    $.__views.__alloyId145 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId145"
    });
    CancelClicked ? $.__views.__alloyId145.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId145!click!CancelClicked"] = true;
    $.__views.__alloyId139.leftNavButton = $.__views.__alloyId145;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId139
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId139);
    $.__views.__alloyId138 = Ti.UI.createTab({
        window: $.__views.__alloyId139,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId138"
    });
    __alloyId137.push($.__views.__alloyId138);
    $.__views.__alloyId147 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId147"
    });
    $.__views.__alloyId149 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId149"
    });
    $.__views.__alloyId150 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    EditClicked ? $.__views.__alloyId150.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId150!click!EditClicked"] = true;
    $.__views.__alloyId151 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId151"
    });
    $.__views.__alloyId149.add($.__views.__alloyId151);
    SubmitDataToServer ? $.__views.__alloyId151.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId151!click!SubmitDataToServer"] = true;
    $.__views.__alloyId147.rightNavButton = $.__views.__alloyId149;
    $.__views.__alloyId153 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId153"
    });
    CancelClicked ? $.__views.__alloyId153.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId153!click!CancelClicked"] = true;
    $.__views.__alloyId147.leftNavButton = $.__views.__alloyId153;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId147
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId147);
    $.__views.__alloyId146 = Ti.UI.createTab({
        window: $.__views.__alloyId147,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId146"
    });
    __alloyId137.push($.__views.__alloyId146);
    $.__views.__alloyId155 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId155"
    });
    $.__views.__alloyId157 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId157"
    });
    $.__views.__alloyId158 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId159"
    });
    $.__views.__alloyId157.add($.__views.__alloyId159);
    SubmitDataToServer ? $.__views.__alloyId159.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId159!click!SubmitDataToServer"] = true;
    $.__views.__alloyId155.rightNavButton = $.__views.__alloyId157;
    $.__views.__alloyId161 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId161"
    });
    CancelClicked ? $.__views.__alloyId161.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId161!click!CancelClicked"] = true;
    $.__views.__alloyId155.leftNavButton = $.__views.__alloyId161;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId155
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId155);
    $.__views.__alloyId154 = Ti.UI.createTab({
        window: $.__views.__alloyId155,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId154"
    });
    __alloyId137.push($.__views.__alloyId154);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId137,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId142!click!EditClicked"] && $.__views.__alloyId142.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId143!click!SubmitDataToServer"] && $.__views.__alloyId143.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId145!click!CancelClicked"] && $.__views.__alloyId145.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId150!click!EditClicked"] && $.__views.__alloyId150.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId151!click!SubmitDataToServer"] && $.__views.__alloyId151.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId153!click!CancelClicked"] && $.__views.__alloyId153.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId159!click!SubmitDataToServer"] && $.__views.__alloyId159.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId161!click!CancelClicked"] && $.__views.__alloyId161.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;