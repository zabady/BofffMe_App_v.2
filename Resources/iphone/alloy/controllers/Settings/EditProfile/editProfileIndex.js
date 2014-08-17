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
        $[e.source.requiredViewId].tableView.editing = !$.contactInfoWin.tableView.editing;
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
    var __alloyId127 = [];
    $.__views.__alloyId129 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId129"
    });
    $.__views.__alloyId131 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId131"
    });
    $.__views.__alloyId132 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    EditClicked ? $.__views.__alloyId132.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId132!click!EditClicked"] = true;
    $.__views.__alloyId133 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId133"
    });
    $.__views.__alloyId131.add($.__views.__alloyId133);
    SubmitDataToServer ? $.__views.__alloyId133.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId133!click!SubmitDataToServer"] = true;
    $.__views.__alloyId129.rightNavButton = $.__views.__alloyId131;
    $.__views.__alloyId135 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId135"
    });
    CancelClicked ? $.__views.__alloyId135.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId135!click!CancelClicked"] = true;
    $.__views.__alloyId129.leftNavButton = $.__views.__alloyId135;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId129
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId129);
    $.__views.__alloyId128 = Ti.UI.createTab({
        window: $.__views.__alloyId129,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId128"
    });
    __alloyId127.push($.__views.__alloyId128);
    $.__views.__alloyId137 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId137"
    });
    $.__views.__alloyId139 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId139"
    });
    $.__views.__alloyId140 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId140"
    });
    $.__views.__alloyId139.add($.__views.__alloyId140);
    EditClicked ? $.__views.__alloyId140.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId140!click!EditClicked"] = true;
    $.__views.__alloyId141 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId141"
    });
    $.__views.__alloyId139.add($.__views.__alloyId141);
    SubmitDataToServer ? $.__views.__alloyId141.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId141!click!SubmitDataToServer"] = true;
    $.__views.__alloyId137.rightNavButton = $.__views.__alloyId139;
    $.__views.__alloyId143 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId143"
    });
    CancelClicked ? $.__views.__alloyId143.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId143!click!CancelClicked"] = true;
    $.__views.__alloyId137.leftNavButton = $.__views.__alloyId143;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId137
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId137);
    $.__views.__alloyId136 = Ti.UI.createTab({
        window: $.__views.__alloyId137,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId136"
    });
    __alloyId127.push($.__views.__alloyId136);
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
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
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
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId145
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId145);
    $.__views.__alloyId144 = Ti.UI.createTab({
        window: $.__views.__alloyId145,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId144"
    });
    __alloyId127.push($.__views.__alloyId144);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId127,
        id: "tabGroup"
    });
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId132!click!EditClicked"] && $.__views.__alloyId132.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId133!click!SubmitDataToServer"] && $.__views.__alloyId133.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId135!click!CancelClicked"] && $.__views.__alloyId135.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId140!click!EditClicked"] && $.__views.__alloyId140.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId141!click!SubmitDataToServer"] && $.__views.__alloyId141.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId143!click!CancelClicked"] && $.__views.__alloyId143.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId149!click!SubmitDataToServer"] && $.__views.__alloyId149.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId151!click!CancelClicked"] && $.__views.__alloyId151.addEventListener("click", CancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;