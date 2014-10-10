function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId181() {
        $.__views.tabGroup.removeEventListener("open", __alloyId181);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId180 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId179"
            };
            $.__views.__alloyId179 = e.menu.add(_.pick(__alloyId180, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId179.applyProperties(_.omit(__alloyId180, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId179.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId179!click!SubmitDataToServer"] = true;
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
    var __alloyId153 = [];
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
        requiredViewId: "contactInfoWin",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    EditClicked ? $.__views.__alloyId158.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId158!click!EditClicked"] = true;
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
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId155
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId155);
    $.__views.__alloyId154 = Ti.UI.createTab({
        window: $.__views.__alloyId155,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId154"
    });
    __alloyId153.push($.__views.__alloyId154);
    $.__views.__alloyId163 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId163"
    });
    $.__views.__alloyId165 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId165"
    });
    $.__views.__alloyId166 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    EditClicked ? $.__views.__alloyId166.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId166!click!EditClicked"] = true;
    $.__views.__alloyId167 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId167"
    });
    $.__views.__alloyId165.add($.__views.__alloyId167);
    SubmitDataToServer ? $.__views.__alloyId167.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId167!click!SubmitDataToServer"] = true;
    $.__views.__alloyId163.rightNavButton = $.__views.__alloyId165;
    $.__views.__alloyId169 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId169"
    });
    CancelClicked ? $.__views.__alloyId169.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId169!click!CancelClicked"] = true;
    $.__views.__alloyId163.leftNavButton = $.__views.__alloyId169;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId163
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId163);
    $.__views.__alloyId162 = Ti.UI.createTab({
        window: $.__views.__alloyId163,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId162"
    });
    __alloyId153.push($.__views.__alloyId162);
    $.__views.__alloyId171 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId171"
    });
    $.__views.__alloyId173 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId173"
    });
    $.__views.__alloyId174 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId174"
    });
    $.__views.__alloyId173.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId175"
    });
    $.__views.__alloyId173.add($.__views.__alloyId175);
    SubmitDataToServer ? $.__views.__alloyId175.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId175!click!SubmitDataToServer"] = true;
    $.__views.__alloyId171.rightNavButton = $.__views.__alloyId173;
    $.__views.__alloyId177 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId177"
    });
    CancelClicked ? $.__views.__alloyId177.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId177!click!CancelClicked"] = true;
    $.__views.__alloyId171.leftNavButton = $.__views.__alloyId177;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId171
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId171);
    $.__views.__alloyId170 = Ti.UI.createTab({
        window: $.__views.__alloyId171,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId170"
    });
    __alloyId153.push($.__views.__alloyId170);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId153,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId181);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId158!click!EditClicked"] && $.__views.__alloyId158.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId159!click!SubmitDataToServer"] && $.__views.__alloyId159.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId161!click!CancelClicked"] && $.__views.__alloyId161.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId166!click!EditClicked"] && $.__views.__alloyId166.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId167!click!SubmitDataToServer"] && $.__views.__alloyId167.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId169!click!CancelClicked"] && $.__views.__alloyId169.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId175!click!SubmitDataToServer"] && $.__views.__alloyId175.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId177!click!CancelClicked"] && $.__views.__alloyId177.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId179!click!SubmitDataToServer"] && $.__views.__alloyId179.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;