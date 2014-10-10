function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function validate_name() {
        var regexp = /^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/;
        if ($.txt_name.value.match(regexp) && $.txt_name.value.length > 2) {
            Alloy.Globals.userSignUpData.name = $.txt_name.value;
            return true;
        }
        alert("Invalid name, it should be greater than 2 charachters and text only !");
        $.txt_name.focus();
        return false;
    }
    function validate_email() {
        var emailvalid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ($.txt_email.value.match(emailvalid)) {
            Alloy.Globals.userSignUpData.email = $.txt_email.value;
            return true;
        }
        alert("Invalid email !");
        $.txt_email.focus();
        return false;
    }
    function checkGender() {
        if ("temp" == Alloy.Globals.userSignUpData.gender) {
            alert("Please Select Gender");
            return false;
        }
        return true;
    }
    function facebookFinished() {
        $.txt_name.value = Alloy.Globals.userSignUpData.name;
        $.txt_email.value = Alloy.Globals.userSignUpData.email;
        Alloy.Globals.userSignUpData.gender ? $.img_gender_male.fireEvent("click") : $.img_gender_female.fireEvent("click");
        $.img_user.image = Alloy.Globals.userSignUpData.profilePicture.large.read();
        $.img_user.height = 100;
        $.img_user.width = Ti.UI.SIZE;
    }
    function resizeAndSaveProfilePictures(image) {
        var resizedImage = image.imageAsResized(500, 500 * image.height / image.width);
        Alloy.Globals.userSignUpData.profilePicture.large = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "img_profile_pic_large.jpg");
        Alloy.Globals.userSignUpData.profilePicture.large.write(resizedImage);
        resizedImage = image.imageAsResized(50, 50);
        Alloy.Globals.userSignUpData.profilePicture.icon = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "img_profile_pic_icon.jpg");
        Alloy.Globals.userSignUpData.profilePicture.icon.write(resizedImage);
        $.img_user.image = Alloy.Globals.userSignUpData.profilePicture.large.read();
        $.img_user.height = 100;
        $.img_user.width = Ti.UI.SIZE;
    }
    function allowScroll() {
        $.scrollView.scrollingEnabled = true;
    }
    function disableScroll() {
        $.scrollView.scrollingEnabled = false;
    }
    function facebookImgPressed() {
        Ti.include("/facebookFunctions.js");
        loginWithFacebook(requestWithGraphPath, getNameEmailPicture);
    }
    function imgPressed() {
        $.optionDialog.show();
    }
    function optionDialogClick(e) {
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
    function txtNameReturnKeyPressed() {
        $.txt_email.focus();
    }
    function genderSelected(e) {
        if ("img_gender_male" == e.source.id) {
            $.lbl_gender_male.font = {
                fontSize: "20"
            };
            $.lbl_gender_female.font = {
                fontSize: "17"
            };
            $.lbl_gender_male.color = "#2279bc";
            $.lbl_gender_female.color = "gray";
            $.img_gender_male.image = "/images/gender_male.png";
            $.img_gender_female.image = "/images/gender_female[shaded].png";
            Alloy.Globals.userSignUpData.gender = "male";
        } else {
            $.lbl_gender_male.font = {
                fontSize: "17"
            };
            $.lbl_gender_female.font = {
                fontSize: "20"
            };
            $.img_gender_male.image = "/images/gender_male[shaded].png";
            $.img_gender_female.image = "/images/gender_female.png";
            $.lbl_gender_male.color = "gray";
            $.lbl_gender_female.color = "#2279bc";
            Alloy.Globals.userSignUpData.gender = "female";
        }
    }
    function continueBtnPressed() {
        if (validate_name() && validate_email() && checkGender()) {
            $.win.fireEvent("click");
            var singUpWin = Alloy.createController("FTR/signUpWin").getView();
            Alloy.Globals.mainNav.openWindow(singUpWin);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FTR/userMainDetailsWin";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        title: "Enter Your Details",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.scrollView = Ti.UI.createScrollView({
        height: Ti.UI.SIZE,
        top: "10dp",
        id: "scrollView",
        layout: "vertical",
        scrollingEnabled: "false"
    });
    $.__views.win.add($.__views.scrollView);
    $.__views.img_facebook = Ti.UI.createImageView({
        top: "10",
        bottom: "12",
        height: "40",
        width: "200",
        image: "/images/facebook_btn.png",
        id: "img_facebook"
    });
    $.__views.scrollView.add($.__views.img_facebook);
    facebookImgPressed ? $.__views.img_facebook.addEventListener("click", facebookImgPressed) : __defers["$.__views.img_facebook!click!facebookImgPressed"] = true;
    $.__views.__alloyId86 = Ti.UI.createLabel({
        font: {
            fontSize: "17dp"
        },
        color: "#2279bc",
        width: "75%",
        top: "8dp",
        height: Ti.UI.SIZE,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        text: "OR",
        id: "__alloyId86"
    });
    $.__views.scrollView.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createView({
        width: "200",
        height: "100",
        id: "__alloyId87"
    });
    $.__views.scrollView.add($.__views.__alloyId87);
    $.__views.img_user = Ti.UI.createImageView({
        top: "12",
        height: "100",
        width: "100",
        image: "/images/contact_photo.png",
        id: "img_user"
    });
    $.__views.__alloyId87.add($.__views.img_user);
    imgPressed ? $.__views.img_user.addEventListener("click", imgPressed) : __defers["$.__views.img_user!click!imgPressed"] = true;
    $.__views.txt_name = Ti.UI.createTextField({
        bubbleParent: false,
        width: "75%",
        top: "8dp",
        height: Ti.UI.SIZE,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Your Name",
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        id: "txt_name"
    });
    $.__views.scrollView.add($.__views.txt_name);
    txtNameReturnKeyPressed ? $.__views.txt_name.addEventListener("return", txtNameReturnKeyPressed) : __defers["$.__views.txt_name!return!txtNameReturnKeyPressed"] = true;
    allowScroll ? $.__views.txt_name.addEventListener("focus", allowScroll) : __defers["$.__views.txt_name!focus!allowScroll"] = true;
    disableScroll ? $.__views.txt_name.addEventListener("blur", disableScroll) : __defers["$.__views.txt_name!blur!disableScroll"] = true;
    $.__views.txt_email = Ti.UI.createTextField({
        bubbleParent: false,
        width: "75%",
        top: "8dp",
        height: Ti.UI.SIZE,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "Your email",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        id: "txt_email"
    });
    $.__views.scrollView.add($.__views.txt_email);
    allowScroll ? $.__views.txt_email.addEventListener("focus", allowScroll) : __defers["$.__views.txt_email!focus!allowScroll"] = true;
    disableScroll ? $.__views.txt_email.addEventListener("blur", disableScroll) : __defers["$.__views.txt_email!blur!disableScroll"] = true;
    $.__views.__alloyId88 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId88"
    });
    $.__views.scrollView.add($.__views.__alloyId88);
    $.__views.lbl_gender_male = Ti.UI.createLabel({
        font: {
            fontSize: "17dp"
        },
        color: "gray",
        width: "75",
        text: "Male",
        id: "lbl_gender_male",
        textAlign: "right"
    });
    $.__views.__alloyId88.add($.__views.lbl_gender_male);
    $.__views.img_gender_male = Ti.UI.createImageView({
        image: "/images/gender_male[shaded].png",
        width: "75",
        height: "75",
        id: "img_gender_male"
    });
    $.__views.__alloyId88.add($.__views.img_gender_male);
    genderSelected ? $.__views.img_gender_male.addEventListener("click", genderSelected) : __defers["$.__views.img_gender_male!click!genderSelected"] = true;
    $.__views.img_gender_female = Ti.UI.createImageView({
        image: "/images/gender_female[shaded].png",
        width: "75",
        height: "75",
        id: "img_gender_female"
    });
    $.__views.__alloyId88.add($.__views.img_gender_female);
    genderSelected ? $.__views.img_gender_female.addEventListener("click", genderSelected) : __defers["$.__views.img_gender_female!click!genderSelected"] = true;
    $.__views.lbl_gender_female = Ti.UI.createLabel({
        font: {
            fontSize: "17dp"
        },
        color: "gray",
        width: "75",
        text: "Female",
        id: "lbl_gender_female",
        textAlign: "left"
    });
    $.__views.__alloyId88.add($.__views.lbl_gender_female);
    $.__views.__alloyId89 = Ti.UI.createButton({
        top: "10dp",
        borderRadius: 5,
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "40dp",
        width: "55%",
        backgroundColor: "#2279bc",
        color: "white",
        bubbleParent: false,
        title: "Continue",
        id: "__alloyId89"
    });
    $.__views.scrollView.add($.__views.__alloyId89);
    continueBtnPressed ? $.__views.__alloyId89.addEventListener("click", continueBtnPressed) : __defers["$.__views.__alloyId89!click!continueBtnPressed"] = true;
    var __alloyId91 = [];
    __alloyId91.push("Open Camera");
    __alloyId91.push("Choose from Library");
    __alloyId91.push("Cancel");
    $.__views.optionDialog = Ti.UI.createOptionDialog({
        options: __alloyId91,
        id: "optionDialog",
        cancel: "2"
    });
    optionDialogClick ? $.__views.optionDialog.addEventListener("click", optionDialogClick) : __defers["$.__views.optionDialog!click!optionDialogClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("facebookFinished", facebookFinished);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("facebookFinished", facebookFinished);
    });
    $.win.addEventListener("click", function() {
        $.txt_name.blur();
        $.txt_email.blur();
    });
    $.win.leftNavButton = Ti.UI.createButton();
    __defers["$.__views.img_facebook!click!facebookImgPressed"] && $.__views.img_facebook.addEventListener("click", facebookImgPressed);
    __defers["$.__views.img_user!click!imgPressed"] && $.__views.img_user.addEventListener("click", imgPressed);
    __defers["$.__views.txt_name!return!txtNameReturnKeyPressed"] && $.__views.txt_name.addEventListener("return", txtNameReturnKeyPressed);
    __defers["$.__views.txt_name!focus!allowScroll"] && $.__views.txt_name.addEventListener("focus", allowScroll);
    __defers["$.__views.txt_name!blur!disableScroll"] && $.__views.txt_name.addEventListener("blur", disableScroll);
    __defers["$.__views.txt_email!focus!allowScroll"] && $.__views.txt_email.addEventListener("focus", allowScroll);
    __defers["$.__views.txt_email!blur!disableScroll"] && $.__views.txt_email.addEventListener("blur", disableScroll);
    __defers["$.__views.img_gender_male!click!genderSelected"] && $.__views.img_gender_male.addEventListener("click", genderSelected);
    __defers["$.__views.img_gender_female!click!genderSelected"] && $.__views.img_gender_female.addEventListener("click", genderSelected);
    __defers["$.__views.__alloyId89!click!continueBtnPressed"] && $.__views.__alloyId89.addEventListener("click", continueBtnPressed);
    __defers["$.__views.optionDialog!click!optionDialogClick"] && $.__views.optionDialog.addEventListener("click", optionDialogClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;