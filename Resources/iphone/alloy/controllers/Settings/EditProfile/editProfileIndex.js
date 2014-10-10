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
    var __defers = {};
    var __alloyId142 = [];
    $.__views.__alloyId144 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId144"
    });
    $.__views.__alloyId146 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId146"
    });
    $.__views.__alloyId147 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
    EditClicked ? $.__views.__alloyId147.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId147!click!EditClicked"] = true;
    $.__views.__alloyId148 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId148"
    });
    $.__views.__alloyId146.add($.__views.__alloyId148);
    SubmitDataToServer ? $.__views.__alloyId148.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId148!click!SubmitDataToServer"] = true;
    $.__views.__alloyId144.rightNavButton = $.__views.__alloyId146;
    $.__views.__alloyId150 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId150"
    });
    CancelClicked ? $.__views.__alloyId150.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId150!click!CancelClicked"] = true;
    $.__views.__alloyId144.leftNavButton = $.__views.__alloyId150;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId144
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId144);
    $.__views.__alloyId143 = Ti.UI.createTab({
        window: $.__views.__alloyId144,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId143"
    });
    __alloyId142.push($.__views.__alloyId143);
    $.__views.__alloyId152 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId152"
    });
    $.__views.__alloyId154 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId154"
    });
    $.__views.__alloyId155 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    EditClicked ? $.__views.__alloyId155.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId155!click!EditClicked"] = true;
    $.__views.__alloyId156 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId156"
    });
    $.__views.__alloyId154.add($.__views.__alloyId156);
    SubmitDataToServer ? $.__views.__alloyId156.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId156!click!SubmitDataToServer"] = true;
    $.__views.__alloyId152.rightNavButton = $.__views.__alloyId154;
    $.__views.__alloyId158 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId158"
    });
    CancelClicked ? $.__views.__alloyId158.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId158!click!CancelClicked"] = true;
    $.__views.__alloyId152.leftNavButton = $.__views.__alloyId158;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId152
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId152);
    $.__views.__alloyId151 = Ti.UI.createTab({
        window: $.__views.__alloyId152,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId151"
    });
    __alloyId142.push($.__views.__alloyId151);
    $.__views.__alloyId160 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId160"
    });
    $.__views.__alloyId162 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId162"
    });
    $.__views.__alloyId163 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId164"
    });
    $.__views.__alloyId162.add($.__views.__alloyId164);
    SubmitDataToServer ? $.__views.__alloyId164.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId164!click!SubmitDataToServer"] = true;
    $.__views.__alloyId160.rightNavButton = $.__views.__alloyId162;
    $.__views.__alloyId166 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId166"
    });
    CancelClicked ? $.__views.__alloyId166.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId166!click!CancelClicked"] = true;
    $.__views.__alloyId160.leftNavButton = $.__views.__alloyId166;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId160
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId160);
    $.__views.__alloyId159 = Ti.UI.createTab({
        window: $.__views.__alloyId160,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId159"
    });
    __alloyId142.push($.__views.__alloyId159);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId142,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId147!click!EditClicked"] && $.__views.__alloyId147.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId148!click!SubmitDataToServer"] && $.__views.__alloyId148.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId150!click!CancelClicked"] && $.__views.__alloyId150.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId155!click!EditClicked"] && $.__views.__alloyId155.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId156!click!SubmitDataToServer"] && $.__views.__alloyId156.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId158!click!CancelClicked"] && $.__views.__alloyId158.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId164!click!SubmitDataToServer"] && $.__views.__alloyId164.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId166!click!CancelClicked"] && $.__views.__alloyId166.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;