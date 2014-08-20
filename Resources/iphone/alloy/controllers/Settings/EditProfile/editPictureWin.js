function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function optionDialogClicked(e) {
        0 == e.index ? Ti.Media.showCamera({
            success: function(event) {
                $.profile_picture.image = event.media;
            },
            cancel: function() {
                alert("You have cancelled !");
            },
            error: function(error) {
                alert("Unexpected error: " + error.code);
            },
            saveToPhotoGallery: false,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        }) : 1 == e.index && Ti.Media.openPhotoGallery({
            success: function(event) {
                $.profile_picture.image = event.media;
            },
            cancel: function() {
                alert("You've Cancelled !");
            },
            error: function(error) {
                alert("Unexpected error: " + error.code);
            },
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    function displayDialog() {
        $.optionDialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editPictureWin";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.editPictureWin = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "#D0D0D0",
        id: "editPictureWin"
    });
    $.__views.editPictureWin && $.addTopLevelView($.__views.editPictureWin);
    $.__views.profile_picture = Ti.UI.createImageView({
        height: 100,
        width: 100,
        left: 20,
        image: "/images/contact_photo.png",
        id: "profile_picture"
    });
    $.__views.editPictureWin.add($.__views.profile_picture);
    $.__views.__alloyId131 = Ti.UI.createButton({
        left: 180,
        title: "Edit",
        id: "__alloyId131"
    });
    $.__views.editPictureWin.add($.__views.__alloyId131);
    displayDialog ? $.__views.__alloyId131.addEventListener("click", displayDialog) : __defers["$.__views.__alloyId131!click!displayDialog"] = true;
    $.__views.profile_picture_privacy = Ti.UI.createLabel({
        text: "Default",
        id: "profile_picture_privacy",
        right: "10"
    });
    $.__views.editPictureWin.add($.__views.profile_picture_privacy);
    var __alloyId133 = [];
    __alloyId133.push("Open Camera");
    __alloyId133.push("Choose from Library");
    __alloyId133.push("Cancel");
    $.__views.optionDialog = Ti.UI.createOptionDialog({
        options: __alloyId133,
        id: "optionDialog",
        cancel: "2"
    });
    $.__views.optionDialog && $.addTopLevelView($.__views.optionDialog);
    optionDialogClicked ? $.__views.optionDialog.addEventListener("click", optionDialogClicked) : __defers["$.__views.optionDialog!click!optionDialogClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId131!click!displayDialog"] && $.__views.__alloyId131.addEventListener("click", displayDialog);
    __defers["$.__views.optionDialog!click!optionDialogClicked"] && $.__views.optionDialog.addEventListener("click", optionDialogClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;