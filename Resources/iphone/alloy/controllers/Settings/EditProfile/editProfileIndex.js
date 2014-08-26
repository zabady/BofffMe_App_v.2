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
        var validReturnString = postUserDataUpdatesOnServer(userData, userDataInArrays);
        validReturnString.search("Wrong") >= 0 && alert(validReturnString);
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
    var __alloyId136 = [];
    $.__views.__alloyId138 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId138"
    });
    $.__views.__alloyId140 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId140"
    });
    $.__views.__alloyId141 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    EditClicked ? $.__views.__alloyId141.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId141!click!EditClicked"] = true;
    $.__views.__alloyId142 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId142"
    });
    $.__views.__alloyId140.add($.__views.__alloyId142);
    SubmitDataToServer ? $.__views.__alloyId142.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId142!click!SubmitDataToServer"] = true;
    $.__views.__alloyId138.rightNavButton = $.__views.__alloyId140;
    $.__views.__alloyId144 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId144"
    });
    CancelClicked ? $.__views.__alloyId144.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId144!click!CancelClicked"] = true;
    $.__views.__alloyId138.leftNavButton = $.__views.__alloyId144;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId138
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId138);
    $.__views.__alloyId137 = Ti.UI.createTab({
        window: $.__views.__alloyId138,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId137"
    });
    __alloyId136.push($.__views.__alloyId137);
    $.__views.__alloyId146 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId146"
    });
    $.__views.__alloyId148 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId148"
    });
    $.__views.__alloyId149 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId149"
    });
    $.__views.__alloyId148.add($.__views.__alloyId149);
    EditClicked ? $.__views.__alloyId149.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId149!click!EditClicked"] = true;
    $.__views.__alloyId150 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId150"
    });
    $.__views.__alloyId148.add($.__views.__alloyId150);
    SubmitDataToServer ? $.__views.__alloyId150.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId150!click!SubmitDataToServer"] = true;
    $.__views.__alloyId146.rightNavButton = $.__views.__alloyId148;
    $.__views.__alloyId152 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId152"
    });
    CancelClicked ? $.__views.__alloyId152.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId152!click!CancelClicked"] = true;
    $.__views.__alloyId146.leftNavButton = $.__views.__alloyId152;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId146
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId146);
    $.__views.__alloyId145 = Ti.UI.createTab({
        window: $.__views.__alloyId146,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId145"
    });
    __alloyId136.push($.__views.__alloyId145);
    $.__views.__alloyId154 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId154"
    });
    $.__views.__alloyId156 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId156"
    });
    $.__views.__alloyId157 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId158"
    });
    $.__views.__alloyId156.add($.__views.__alloyId158);
    SubmitDataToServer ? $.__views.__alloyId158.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId158!click!SubmitDataToServer"] = true;
    $.__views.__alloyId154.rightNavButton = $.__views.__alloyId156;
    $.__views.__alloyId160 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId160"
    });
    CancelClicked ? $.__views.__alloyId160.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId160!click!CancelClicked"] = true;
    $.__views.__alloyId154.leftNavButton = $.__views.__alloyId160;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId154
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId154);
    $.__views.__alloyId153 = Ti.UI.createTab({
        window: $.__views.__alloyId154,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId153"
    });
    __alloyId136.push($.__views.__alloyId153);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId136,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId141!click!EditClicked"] && $.__views.__alloyId141.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId142!click!SubmitDataToServer"] && $.__views.__alloyId142.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId144!click!CancelClicked"] && $.__views.__alloyId144.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId149!click!EditClicked"] && $.__views.__alloyId149.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId150!click!SubmitDataToServer"] && $.__views.__alloyId150.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId152!click!CancelClicked"] && $.__views.__alloyId152.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId158!click!SubmitDataToServer"] && $.__views.__alloyId158.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId160!click!CancelClicked"] && $.__views.__alloyId160.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;