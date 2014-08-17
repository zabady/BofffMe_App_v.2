function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId180() {
        $.__views.tabGroup.removeEventListener("open", __alloyId180);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId179 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId178"
            };
            $.__views.__alloyId178 = e.menu.add(_.pick(__alloyId179, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId178.applyProperties(_.omit(__alloyId179, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId178.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId178!click!SubmitDataToServer"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
    var __alloyId152 = [];
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
        requiredViewId: "contactInfoWin",
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    EditClicked ? $.__views.__alloyId157.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId157!click!EditClicked"] = true;
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
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId154
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId154);
    $.__views.__alloyId153 = Ti.UI.createTab({
        window: $.__views.__alloyId154,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId153"
    });
    __alloyId152.push($.__views.__alloyId153);
    $.__views.__alloyId162 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId162"
    });
    $.__views.__alloyId164 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId164"
    });
    $.__views.__alloyId165 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId165"
    });
    $.__views.__alloyId164.add($.__views.__alloyId165);
    EditClicked ? $.__views.__alloyId165.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId165!click!EditClicked"] = true;
    $.__views.__alloyId166 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId166"
    });
    $.__views.__alloyId164.add($.__views.__alloyId166);
    SubmitDataToServer ? $.__views.__alloyId166.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId166!click!SubmitDataToServer"] = true;
    $.__views.__alloyId162.rightNavButton = $.__views.__alloyId164;
    $.__views.__alloyId168 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId168"
    });
    CancelClicked ? $.__views.__alloyId168.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId168!click!CancelClicked"] = true;
    $.__views.__alloyId162.leftNavButton = $.__views.__alloyId168;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId162
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId162);
    $.__views.__alloyId161 = Ti.UI.createTab({
        window: $.__views.__alloyId162,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId161"
    });
    __alloyId152.push($.__views.__alloyId161);
    $.__views.__alloyId170 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId170"
    });
    $.__views.__alloyId172 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId172"
    });
    $.__views.__alloyId173 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId174"
    });
    $.__views.__alloyId172.add($.__views.__alloyId174);
    SubmitDataToServer ? $.__views.__alloyId174.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId174!click!SubmitDataToServer"] = true;
    $.__views.__alloyId170.rightNavButton = $.__views.__alloyId172;
    $.__views.__alloyId176 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId176"
    });
    CancelClicked ? $.__views.__alloyId176.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId176!click!CancelClicked"] = true;
    $.__views.__alloyId170.leftNavButton = $.__views.__alloyId176;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId170
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId170);
    $.__views.__alloyId169 = Ti.UI.createTab({
        window: $.__views.__alloyId170,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId169"
    });
    __alloyId152.push($.__views.__alloyId169);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId152,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId180);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId157!click!EditClicked"] && $.__views.__alloyId157.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId158!click!SubmitDataToServer"] && $.__views.__alloyId158.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId160!click!CancelClicked"] && $.__views.__alloyId160.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId165!click!EditClicked"] && $.__views.__alloyId165.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId166!click!SubmitDataToServer"] && $.__views.__alloyId166.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId168!click!CancelClicked"] && $.__views.__alloyId168.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId174!click!SubmitDataToServer"] && $.__views.__alloyId174.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId176!click!CancelClicked"] && $.__views.__alloyId176.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId178!click!SubmitDataToServer"] && $.__views.__alloyId178.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;