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
                resizeAndSaveProfilePictures(event.media);
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
                resizeAndSaveProfilePictures(event.media);
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
    function resizeAndSaveProfilePictures(image) {
        var resizedImage = image.imageAsResized(500, 500 * image.height / image.width);
        var imageFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "img_profile_pic_large.jpg");
        imageFile.write(resizedImage);
        $.profile_picture.image = imageFile.read();
        userDataInArrays.profile_picture = imageFile.read();
        userDataInArrays.new_profile_picture = true;
    }
    function displayDialog() {
        $.optionDialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/editPictureWin";
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
    $.__views.editPictureWin = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "#D0D0D0",
        id: "editPictureWin"
    });
    $.__views.editPictureWin && $.addTopLevelView($.__views.editPictureWin);
    $.__views.profile_picture = Ti.UI.createImageView({
        height: 100,
        image: "/images/contact_photo.png",
        id: "profile_picture"
    });
    $.__views.editPictureWin.add($.__views.profile_picture);
    $.__views.__alloyId137 = Ti.UI.createButton({
        left: 30,
        title: "Edit",
        id: "__alloyId137"
    });
    $.__views.editPictureWin.add($.__views.__alloyId137);
    displayDialog ? $.__views.__alloyId137.addEventListener("click", displayDialog) : __defers["$.__views.__alloyId137!click!displayDialog"] = true;
    $.__views.profile_picture_privacy = Ti.UI.createLabel({
        right: 20,
        text: "Default",
        id: "profile_picture_privacy"
    });
    $.__views.editPictureWin.add($.__views.profile_picture_privacy);
    var __alloyId139 = [];
    __alloyId139.push("Open Camera");
    __alloyId139.push("Choose from Library");
    __alloyId139.push("Cancel");
    $.__views.optionDialog = Ti.UI.createOptionDialog({
        options: __alloyId139,
        id: "optionDialog",
        cancel: "2"
    });
    $.__views.optionDialog && $.addTopLevelView($.__views.optionDialog);
    optionDialogClicked ? $.__views.optionDialog.addEventListener("click", optionDialogClicked) : __defers["$.__views.optionDialog!click!optionDialogClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId137!click!displayDialog"] && $.__views.__alloyId137.addEventListener("click", displayDialog);
    __defers["$.__views.optionDialog!click!optionDialogClicked"] && $.__views.optionDialog.addEventListener("click", optionDialogClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;