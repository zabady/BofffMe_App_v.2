function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId176() {
        $.__views.tabGroup.removeEventListener("open", __alloyId176);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId175 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId174"
            };
            $.__views.__alloyId174 = e.menu.add(_.pick(__alloyId175, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId174.applyProperties(_.omit(__alloyId175, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId174.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId174!click!SubmitDataToServer"] = true;
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
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId155 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
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
    $.__views.win.rightNavButton = $.__views.__alloyId158;
    $.__views.__alloyId162 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId162"
    });
    CancelClicked ? $.__views.__alloyId162.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId162!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId162;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId156 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId156"
    });
    __alloyId155.push($.__views.__alloyId156);
    $.__views.basicInfoWin = Alloy.createController("Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId163 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId163"
    });
    __alloyId155.push($.__views.__alloyId163);
    $.__views.__alloyId166 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId166"
    });
    $.__views.__alloyId168 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId168"
    });
    $.__views.__alloyId169 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId169"
    });
    $.__views.__alloyId168.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId170"
    });
    $.__views.__alloyId168.add($.__views.__alloyId170);
    SubmitDataToServer ? $.__views.__alloyId170.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId170!click!SubmitDataToServer"] = true;
    $.__views.__alloyId166.rightNavButton = $.__views.__alloyId168;
    $.__views.__alloyId172 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId172"
    });
    CancelClicked ? $.__views.__alloyId172.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId172!click!CancelClicked"] = true;
    $.__views.__alloyId166.leftNavButton = $.__views.__alloyId172;
    $.__views.__alloyId165 = Ti.UI.createTab({
        window: $.__views.__alloyId166,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId165"
    });
    __alloyId155.push($.__views.__alloyId165);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId155,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId176);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId159!click!EditClicked"] && $.__views.__alloyId159.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId160!click!SubmitDataToServer"] && $.__views.__alloyId160.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId162!click!CancelClicked"] && $.__views.__alloyId162.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId170!click!SubmitDataToServer"] && $.__views.__alloyId170.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId172!click!CancelClicked"] && $.__views.__alloyId172.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId174!click!SubmitDataToServer"] && $.__views.__alloyId174.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;