function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId182() {
        $.__views.tabGroup.removeEventListener("open", __alloyId182);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId181 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId180"
            };
            $.__views.__alloyId180 = e.menu.add(_.pick(__alloyId181, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId180.applyProperties(_.omit(__alloyId181, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId180.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId180!click!SubmitDataToServer"] = true;
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
    var __alloyId154 = [];
    $.__views.__alloyId156 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId156"
    });
    $.__views.__alloyId158 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId158"
    });
    $.__views.__alloyId159 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    EditClicked ? $.__views.__alloyId159.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId159!click!EditClicked"] = true;
    $.__views.__alloyId160 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId160"
    });
    $.__views.__alloyId158.add($.__views.__alloyId160);
    SubmitDataToServer ? $.__views.__alloyId160.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId160!click!SubmitDataToServer"] = true;
    $.__views.__alloyId156.rightNavButton = $.__views.__alloyId158;
    $.__views.__alloyId162 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId162"
    });
    CancelClicked ? $.__views.__alloyId162.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId162!click!CancelClicked"] = true;
    $.__views.__alloyId156.leftNavButton = $.__views.__alloyId162;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId156
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId156);
    $.__views.__alloyId155 = Ti.UI.createTab({
        window: $.__views.__alloyId156,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId155"
    });
    __alloyId154.push($.__views.__alloyId155);
    $.__views.__alloyId164 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId164"
    });
    $.__views.__alloyId166 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId166"
    });
    $.__views.__alloyId167 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId167"
    });
    $.__views.__alloyId166.add($.__views.__alloyId167);
    EditClicked ? $.__views.__alloyId167.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId167!click!EditClicked"] = true;
    $.__views.__alloyId168 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId168"
    });
    $.__views.__alloyId166.add($.__views.__alloyId168);
    SubmitDataToServer ? $.__views.__alloyId168.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId168!click!SubmitDataToServer"] = true;
    $.__views.__alloyId164.rightNavButton = $.__views.__alloyId166;
    $.__views.__alloyId170 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId170"
    });
    CancelClicked ? $.__views.__alloyId170.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId170!click!CancelClicked"] = true;
    $.__views.__alloyId164.leftNavButton = $.__views.__alloyId170;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId164
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId164);
    $.__views.__alloyId163 = Ti.UI.createTab({
        window: $.__views.__alloyId164,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId163"
    });
    __alloyId154.push($.__views.__alloyId163);
    $.__views.__alloyId172 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId172"
    });
    $.__views.__alloyId174 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId174"
    });
    $.__views.__alloyId175 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId176"
    });
    $.__views.__alloyId174.add($.__views.__alloyId176);
    SubmitDataToServer ? $.__views.__alloyId176.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId176!click!SubmitDataToServer"] = true;
    $.__views.__alloyId172.rightNavButton = $.__views.__alloyId174;
    $.__views.__alloyId178 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId178"
    });
    CancelClicked ? $.__views.__alloyId178.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId178!click!CancelClicked"] = true;
    $.__views.__alloyId172.leftNavButton = $.__views.__alloyId178;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId172
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId172);
    $.__views.__alloyId171 = Ti.UI.createTab({
        window: $.__views.__alloyId172,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId171"
    });
    __alloyId154.push($.__views.__alloyId171);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId154,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId182);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId159!click!EditClicked"] && $.__views.__alloyId159.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId160!click!SubmitDataToServer"] && $.__views.__alloyId160.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId162!click!CancelClicked"] && $.__views.__alloyId162.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId167!click!EditClicked"] && $.__views.__alloyId167.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId168!click!SubmitDataToServer"] && $.__views.__alloyId168.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId170!click!CancelClicked"] && $.__views.__alloyId170.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId176!click!SubmitDataToServer"] && $.__views.__alloyId176.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId178!click!CancelClicked"] && $.__views.__alloyId178.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId180!click!SubmitDataToServer"] && $.__views.__alloyId180.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;