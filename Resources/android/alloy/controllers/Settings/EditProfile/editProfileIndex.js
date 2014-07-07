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
        var validReturnString = postUserDataUpdatesOnServer(userData, userDataInArrays);
        validReturnString.search("Wrong") >= 0 && alert(validReturnString);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editProfileIndex";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId159 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.__alloyId162 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId162"
    });
    $.__views.__alloyId163 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    EditClicked ? $.__views.__alloyId163.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId163!click!EditClicked"] = true;
    $.__views.__alloyId164 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId164"
    });
    $.__views.__alloyId162.add($.__views.__alloyId164);
    SubmitDataToServer ? $.__views.__alloyId164.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId164!click!SubmitDataToServer"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId162;
    $.__views.__alloyId166 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId166"
    });
    CancelClicked ? $.__views.__alloyId166.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId166!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId166;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId160 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact Info",
        icon: "/images/man-7aram.png",
        id: "__alloyId160"
    });
    __alloyId159.push($.__views.__alloyId160);
    $.__views.basicInfoWin = Alloy.createController("Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId167 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "Basic Info",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId167"
    });
    __alloyId159.push($.__views.__alloyId167);
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
    $.__views.__alloyId169 = Ti.UI.createTab({
        window: $.__views.__alloyId170,
        title: "Info",
        icon: "/images/love-7aram.png",
        id: "__alloyId169"
    });
    __alloyId159.push($.__views.__alloyId169);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId159,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId180);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId163!click!EditClicked"] && $.__views.__alloyId163.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId164!click!SubmitDataToServer"] && $.__views.__alloyId164.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId166!click!CancelClicked"] && $.__views.__alloyId166.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId174!click!SubmitDataToServer"] && $.__views.__alloyId174.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId176!click!CancelClicked"] && $.__views.__alloyId176.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId178!click!SubmitDataToServer"] && $.__views.__alloyId178.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;