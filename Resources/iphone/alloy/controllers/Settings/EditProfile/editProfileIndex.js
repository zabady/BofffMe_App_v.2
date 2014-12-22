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
    var __alloyId143 = [];
    $.__views.__alloyId145 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId145"
    });
    $.__views.__alloyId147 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId147"
    });
    $.__views.__alloyId148 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    EditClicked ? $.__views.__alloyId148.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId148!click!EditClicked"] = true;
    $.__views.__alloyId149 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId149"
    });
    $.__views.__alloyId147.add($.__views.__alloyId149);
    SubmitDataToServer ? $.__views.__alloyId149.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId149!click!SubmitDataToServer"] = true;
    $.__views.__alloyId145.rightNavButton = $.__views.__alloyId147;
    $.__views.__alloyId151 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId151"
    });
    CancelClicked ? $.__views.__alloyId151.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId151!click!CancelClicked"] = true;
    $.__views.__alloyId145.leftNavButton = $.__views.__alloyId151;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId145
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId145);
    $.__views.__alloyId144 = Ti.UI.createTab({
        window: $.__views.__alloyId145,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId144"
    });
    __alloyId143.push($.__views.__alloyId144);
    $.__views.__alloyId153 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId153"
    });
    $.__views.__alloyId155 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId155"
    });
    $.__views.__alloyId156 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    EditClicked ? $.__views.__alloyId156.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId156!click!EditClicked"] = true;
    $.__views.__alloyId157 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId157"
    });
    $.__views.__alloyId155.add($.__views.__alloyId157);
    SubmitDataToServer ? $.__views.__alloyId157.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId157!click!SubmitDataToServer"] = true;
    $.__views.__alloyId153.rightNavButton = $.__views.__alloyId155;
    $.__views.__alloyId159 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId159"
    });
    CancelClicked ? $.__views.__alloyId159.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId159!click!CancelClicked"] = true;
    $.__views.__alloyId153.leftNavButton = $.__views.__alloyId159;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId153
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId153);
    $.__views.__alloyId152 = Ti.UI.createTab({
        window: $.__views.__alloyId153,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId152"
    });
    __alloyId143.push($.__views.__alloyId152);
    $.__views.__alloyId161 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId161"
    });
    $.__views.__alloyId163 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId163"
    });
    $.__views.__alloyId164 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId165"
    });
    $.__views.__alloyId163.add($.__views.__alloyId165);
    SubmitDataToServer ? $.__views.__alloyId165.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId165!click!SubmitDataToServer"] = true;
    $.__views.__alloyId161.rightNavButton = $.__views.__alloyId163;
    $.__views.__alloyId167 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId167"
    });
    CancelClicked ? $.__views.__alloyId167.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId167!click!CancelClicked"] = true;
    $.__views.__alloyId161.leftNavButton = $.__views.__alloyId167;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId161
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId161);
    $.__views.__alloyId160 = Ti.UI.createTab({
        window: $.__views.__alloyId161,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId160"
    });
    __alloyId143.push($.__views.__alloyId160);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId143,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId148!click!EditClicked"] && $.__views.__alloyId148.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId149!click!SubmitDataToServer"] && $.__views.__alloyId149.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId151!click!CancelClicked"] && $.__views.__alloyId151.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId156!click!EditClicked"] && $.__views.__alloyId156.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId157!click!SubmitDataToServer"] && $.__views.__alloyId157.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId159!click!CancelClicked"] && $.__views.__alloyId159.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId165!click!SubmitDataToServer"] && $.__views.__alloyId165.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId167!click!CancelClicked"] && $.__views.__alloyId167.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;