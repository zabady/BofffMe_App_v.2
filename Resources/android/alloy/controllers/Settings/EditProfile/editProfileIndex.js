function Controller() {
    function __alloyId155() {
        $.__views.tabGroup.removeEventListener("open", __alloyId155);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId154 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId153"
            };
            $.__views.__alloyId153 = e.menu.add(_.pick(__alloyId154, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId153.applyProperties(_.omit(__alloyId154, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId153.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId153!click!SubmitDataToServer"] = true;
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
    var __alloyId134 = [];
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.__alloyId137 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId137"
    });
    $.__views.__alloyId138 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    EditClicked ? $.__views.__alloyId138.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId138!click!EditClicked"] = true;
    $.__views.__alloyId139 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId139"
    });
    $.__views.__alloyId137.add($.__views.__alloyId139);
    SubmitDataToServer ? $.__views.__alloyId139.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId139!click!SubmitDataToServer"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId137;
    $.__views.__alloyId141 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId141"
    });
    CancelClicked ? $.__views.__alloyId141.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId141!click!CancelClicked"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId141;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.win
    });
    $.__views.contactInfoWin.setParent($.__views.win);
    $.__views.__alloyId135 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Contact Info",
        icon: "/images/man-7aram.png",
        id: "__alloyId135"
    });
    __alloyId134.push($.__views.__alloyId135);
    $.__views.basicInfoWin = Alloy.createController("Settings/EditProfile/basicInfoWin", {
        id: "basicInfoWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId142 = Ti.UI.createTab({
        window: $.__views.basicInfoWin.getViewEx({
            recurse: true
        }),
        title: "Basic Info",
        icon: "/images/QR-code-7aram.png",
        id: "__alloyId142"
    });
    __alloyId134.push($.__views.__alloyId142);
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
    $.__views.__alloyId144 = Ti.UI.createTab({
        window: $.__views.__alloyId145,
        title: "Info",
        icon: "/images/love-7aram.png",
        id: "__alloyId144"
    });
    __alloyId134.push($.__views.__alloyId144);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId134,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId155);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId138!click!EditClicked"] && $.__views.__alloyId138.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId139!click!SubmitDataToServer"] && $.__views.__alloyId139.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId141!click!CancelClicked"] && $.__views.__alloyId141.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId149!click!SubmitDataToServer"] && $.__views.__alloyId149.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId151!click!CancelClicked"] && $.__views.__alloyId151.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId153!click!SubmitDataToServer"] && $.__views.__alloyId153.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;