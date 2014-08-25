function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId191() {
        $.__views.tabGroup.removeEventListener("open", __alloyId191);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId190 = {
                title: "Done",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId189"
            };
            $.__views.__alloyId189 = e.menu.add(_.pick(__alloyId190, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId189.applyProperties(_.omit(__alloyId190, Alloy.Android.menuItemCreateArgs));
            SubmitDataToServer ? $.__views.__alloyId189.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId189!click!SubmitDataToServer"] = true;
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
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId163 = [];
    $.__views.__alloyId165 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId165"
    });
    $.__views.__alloyId167 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId167"
    });
    $.__views.__alloyId168 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "contactInfoWin",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    EditClicked ? $.__views.__alloyId168.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId168!click!EditClicked"] = true;
    $.__views.__alloyId169 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId169"
    });
    $.__views.__alloyId167.add($.__views.__alloyId169);
    SubmitDataToServer ? $.__views.__alloyId169.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId169!click!SubmitDataToServer"] = true;
    $.__views.__alloyId165.rightNavButton = $.__views.__alloyId167;
    $.__views.__alloyId171 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId171"
    });
    CancelClicked ? $.__views.__alloyId171.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId171!click!CancelClicked"] = true;
    $.__views.__alloyId165.leftNavButton = $.__views.__alloyId171;
    $.__views.contactInfoWin = Alloy.createController("Settings/EditProfile/contactInfoWin", {
        id: "contactInfoWin",
        __parentSymbol: $.__views.__alloyId165
    });
    $.__views.contactInfoWin.setParent($.__views.__alloyId165);
    $.__views.__alloyId164 = Ti.UI.createTab({
        window: $.__views.__alloyId165,
        title: "Contact",
        icon: "/images/man-7aram.png",
        id: "__alloyId164"
    });
    __alloyId163.push($.__views.__alloyId164);
    $.__views.__alloyId173 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId173"
    });
    $.__views.__alloyId175 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId175"
    });
    $.__views.__alloyId176 = Ti.UI.createButton({
        title: "Edit",
        requiredViewId: "generalInfoWin",
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    EditClicked ? $.__views.__alloyId176.addEventListener("click", EditClicked) : __defers["$.__views.__alloyId176!click!EditClicked"] = true;
    $.__views.__alloyId177 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId177"
    });
    $.__views.__alloyId175.add($.__views.__alloyId177);
    SubmitDataToServer ? $.__views.__alloyId177.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId177!click!SubmitDataToServer"] = true;
    $.__views.__alloyId173.rightNavButton = $.__views.__alloyId175;
    $.__views.__alloyId179 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId179"
    });
    CancelClicked ? $.__views.__alloyId179.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId179!click!CancelClicked"] = true;
    $.__views.__alloyId173.leftNavButton = $.__views.__alloyId179;
    $.__views.generalInfoWin = Alloy.createController("Settings/EditProfile/generalInfoWin", {
        id: "generalInfoWin",
        __parentSymbol: $.__views.__alloyId173
    });
    $.__views.generalInfoWin.setParent($.__views.__alloyId173);
    $.__views.__alloyId172 = Ti.UI.createTab({
        window: $.__views.__alloyId173,
        title: "General",
        icon: "/images/man-7aram.png",
        id: "__alloyId172"
    });
    __alloyId163.push($.__views.__alloyId172);
    $.__views.__alloyId181 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "__alloyId181"
    });
    $.__views.__alloyId183 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId183"
    });
    $.__views.__alloyId184 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId184"
    });
    $.__views.__alloyId183.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId185"
    });
    $.__views.__alloyId183.add($.__views.__alloyId185);
    SubmitDataToServer ? $.__views.__alloyId185.addEventListener("click", SubmitDataToServer) : __defers["$.__views.__alloyId185!click!SubmitDataToServer"] = true;
    $.__views.__alloyId181.rightNavButton = $.__views.__alloyId183;
    $.__views.__alloyId187 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId187"
    });
    CancelClicked ? $.__views.__alloyId187.addEventListener("click", CancelClicked) : __defers["$.__views.__alloyId187!click!CancelClicked"] = true;
    $.__views.__alloyId181.leftNavButton = $.__views.__alloyId187;
    $.__views.workAndEdWin = Alloy.createController("Settings/EditProfile/workAndEdWin", {
        id: "workAndEdWin",
        __parentSymbol: $.__views.__alloyId181
    });
    $.__views.workAndEdWin.setParent($.__views.__alloyId181);
    $.__views.__alloyId180 = Ti.UI.createTab({
        window: $.__views.__alloyId181,
        title: "Work & Ed.",
        icon: "/images/man-7aram.png",
        id: "__alloyId180"
    });
    __alloyId163.push($.__views.__alloyId180);
    $.__views.tabGroup = Ti.UI.createTabGroup({
        tabs: __alloyId163,
        id: "tabGroup"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId191);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    __defers["$.__views.__alloyId168!click!EditClicked"] && $.__views.__alloyId168.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId169!click!SubmitDataToServer"] && $.__views.__alloyId169.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId171!click!CancelClicked"] && $.__views.__alloyId171.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId176!click!EditClicked"] && $.__views.__alloyId176.addEventListener("click", EditClicked);
    __defers["$.__views.__alloyId177!click!SubmitDataToServer"] && $.__views.__alloyId177.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId179!click!CancelClicked"] && $.__views.__alloyId179.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId185!click!SubmitDataToServer"] && $.__views.__alloyId185.addEventListener("click", SubmitDataToServer);
    __defers["$.__views.__alloyId187!click!CancelClicked"] && $.__views.__alloyId187.addEventListener("click", CancelClicked);
    __defers["$.__views.__alloyId189!click!SubmitDataToServer"] && $.__views.__alloyId189.addEventListener("click", SubmitDataToServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;