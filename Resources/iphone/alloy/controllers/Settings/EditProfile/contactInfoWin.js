function Controller() {
    function createBindingRowData(fieldValue, privacy, isPhone) {
        var data = {
            TextOfFieldTitle: isPhone ? "Phone" : "Email",
            HintTextOfField: isPhone ? "Phone number" : "Email address",
            FieldType: isPhone ? "phone_numbers" : "mails",
            TextOfField: fieldValue,
            TextOfPrivacy: privacy
        };
        return data;
    }
    function AddRowButtonClicked() {
        addNewRow = true;
    }
    function TableViewRowClicked(e) {
        if (addNewRow) {
            addNewFieldToUserData(userDataInArrays, e.row.isPhone > 0 ? "phone_numbers" : "mails");
            var data = createBindingRowData("", "public", e.row.isPhone > 0);
            addNewRowAfter(data, e.index + 1);
            addNewRow = false;
        }
    }
    function DeletePressed(e) {
        deleteAddableField(userDataInArrays, e.source.fieldType, e.source.fieldValue);
    }
    function NonAddableTextChanged(e) {
        changeValueOfNonAddableField(userDataInArrays, e.source.id, e.source.value);
    }
    function AddableTextChanged(e) {
        changeValueOfAddableField(userDataInArrays, e.source.fieldType, addableTextOldValue, e.source.value);
        addableTextOldValue = e.source.value;
    }
    function AddableTextFocused(e) {
        addableTextOldValue = e.source.value;
    }
    function PrivacyLabelClicked(e) {
        $.pickerContainer.pickerView.visible = true;
        $.pickerContainer.picker.setSelectedRow(0, privacyIndex[e.source.text], {
            animated: true
        });
        clickedPrivacyLabel = e.source;
    }
    function CancelPressed() {
        $.win.close();
    }
    function EditPressed() {
        $.tableView.editing = !$.tableView.editing;
    }
    function DonePressed() {
        var stringArray = convertAddableFieldsToStrings(userDataInArrays);
        updateBofff(Alloy.Globals.userPin, userData, stringArray, bofffsSpecificData);
    }
    function addNewRowAfter(data, rowNum) {
        var fieldTitleLabel = Ti.UI.createLabel({
            text: data.TextOfFieldTitle
        });
        $.addClass(fieldTitleLabel, "fieldTitleLabel");
        var fieldTextField = Ti.UI.createTextField({
            value: data.TextOfField,
            hintText: data.HintTextOfField,
            fieldType: data.FieldType
        });
        fieldTextField.addEventListener("change", AddableTextChanged);
        fieldTextField.addEventListener("focus", AddableTextFocused);
        $.addClass(fieldTextField, "fieldText");
        var privacyLabel = Ti.UI.createLabel({
            text: data.TextOfPrivacy,
            fieldType: data.FieldType
        });
        privacyLabel.addEventListener("click", PrivacyLabelClicked);
        $.addClass(privacyLabel, "privacyLabel");
        var newRow = Ti.UI.createTableViewRow({
            fieldType: data.FieldType,
            fieldValue: data.TextOfField
        });
        $.addClass(newRow, "fieldRow");
        newRow.add(fieldTitleLabel);
        newRow.add(fieldTextField);
        newRow.add(privacyLabel);
        $.tableView.insertRowAfter(rowNum, newRow, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/contactInfoWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId100 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId100"
    });
    $.__views.__alloyId101 = Ti.UI.createButton({
        title: "Edit",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    EditPressed ? $.__views.__alloyId101.addEventListener("click", EditPressed) : __defers["$.__views.__alloyId101!click!EditPressed"] = true;
    $.__views.__alloyId102 = Ti.UI.createButton({
        title: " Done",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    DonePressed ? $.__views.__alloyId102.addEventListener("click", DonePressed) : __defers["$.__views.__alloyId102!click!DonePressed"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId100;
    $.__views.__alloyId104 = Ti.UI.createButton({
        title: "Cancel",
        id: "__alloyId104"
    });
    CancelPressed ? $.__views.__alloyId104.addEventListener("click", CancelPressed) : __defers["$.__views.__alloyId104!click!CancelPressed"] = true;
    $.__views.win.leftNavButton = $.__views.__alloyId104;
    var __alloyId105 = [];
    $.__views.__alloyId106 = Ti.UI.createTableViewRow({
        editable: false,
        top: 20,
        height: Ti.UI.SIZE,
        isPhone: "1",
        id: "__alloyId106"
    });
    __alloyId105.push($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId108"
    });
    $.__views.__alloyId106.add($.__views.__alloyId108);
    AddRowButtonClicked ? $.__views.__alloyId108.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId108!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId109 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId109"
    });
    __alloyId105.push($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId110"
    });
    $.__views.__alloyId109.add($.__views.__alloyId110);
    $.__views.primary_mobile = Ti.UI.createTextField({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        id: "primary_mobile",
        hintText: "Primary Phone"
    });
    $.__views.__alloyId109.add($.__views.primary_mobile);
    NonAddableTextChanged ? $.__views.primary_mobile.addEventListener("change", NonAddableTextChanged) : __defers["$.__views.primary_mobile!change!NonAddableTextChanged"] = true;
    $.__views.primary_mobile_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "primary_mobile_privacy"
    });
    $.__views.__alloyId109.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId111 = Ti.UI.createTableViewRow({
        editable: false,
        backgroundColor: "#D0D0D0",
        id: "__alloyId111"
    });
    __alloyId105.push($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createTableViewRow({
        editable: false,
        top: 20,
        height: Ti.UI.SIZE,
        isPhone: "0",
        id: "__alloyId112"
    });
    __alloyId105.push($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId114"
    });
    $.__views.__alloyId112.add($.__views.__alloyId114);
    AddRowButtonClicked ? $.__views.__alloyId114.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId114!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId115 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId115"
    });
    __alloyId105.push($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.primary_email = Ti.UI.createTextField({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        id: "primary_email",
        hintText: "Email address"
    });
    $.__views.__alloyId115.add($.__views.primary_email);
    NonAddableTextChanged ? $.__views.primary_email.addEventListener("change", NonAddableTextChanged) : __defers["$.__views.primary_email!change!NonAddableTextChanged"] = true;
    $.__views.primary_email_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "primary_email_privacy"
    });
    $.__views.__alloyId115.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId117 = Ti.UI.createTableViewRow({
        editable: false,
        backgroundColor: "#D0D0D0",
        id: "__alloyId117"
    });
    __alloyId105.push($.__views.__alloyId117);
    $.__views.tableView = Ti.UI.createTableView({
        data: __alloyId105,
        id: "tableView"
    });
    $.__views.win.add($.__views.tableView);
    TableViewRowClicked ? $.__views.tableView.addEventListener("click", TableViewRowClicked) : __defers["$.__views.tableView!click!TableViewRowClicked"] = true;
    DeletePressed ? $.__views.tableView.addEventListener("delete", DeletePressed) : __defers["$.__views.tableView!delete!DeletePressed"] = true;
    $.__views.pickerContainer = Alloy.createController("/Settings/EditProfile/privacyPicker", {
        id: "pickerContainer",
        __parentSymbol: $.__views.win
    });
    $.__views.pickerContainer.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/userDataProcessing.js");
    arguments[0] || {};
    var userData = Titanium.App.Properties.getObject("userData");
    var bofffsSpecificData = Titanium.App.Properties.getObject("bofffsSpecificData");
    var userDataInArrays = convertAddableFieldsToArrays(userData);
    var rows = $.tableView.sections[0].rows;
    for (var i = 0; rows.length > i; i++) {
        var children = rows[i].children;
        for (var j = 0; children.length > j; j++) switch (children[j].id) {
          case "primary_mobile":
          case "primary_email":
            children[j].value = userData[children[j].id];
            break;

          case "primary_mobile_privacy":
          case "primary_email_privacy":
            children[j].text = userData[children[j].id];
        }
    }
    for (var i = userDataInArrays.mails.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.mails[i], userDataInArrays.mails_privacy[i], false);
        addNewRowAfter(data, 4);
    }
    for (var i = userDataInArrays.phone_numbers.length - 1; i >= 0; i--) {
        var data = createBindingRowData(userDataInArrays.phone_numbers[i], userDataInArrays.phone_numbers_privacy[i], true);
        addNewRowAfter(data, 1);
    }
    var addNewRow = false;
    var addableTextOldValue = "";
    var clickedPrivacyLabel;
    var privacyIndex = {
        "public": 0,
        friends: 1,
        favorites: 2,
        onlyMe: 3
    };
    $.pickerContainer.picker.addEventListener("change", function() {
        var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        clickedPrivacyLabel.id ? changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy) : changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);
        clickedPrivacyLabel.text = newPrivacy;
    });
    $.pickerContainer.btn_toolBarDone.addEventListener("click", function() {
        $.pickerContainer.pickerView.visible = false;
    });
    __defers["$.__views.__alloyId101!click!EditPressed"] && $.__views.__alloyId101.addEventListener("click", EditPressed);
    __defers["$.__views.__alloyId102!click!DonePressed"] && $.__views.__alloyId102.addEventListener("click", DonePressed);
    __defers["$.__views.__alloyId104!click!CancelPressed"] && $.__views.__alloyId104.addEventListener("click", CancelPressed);
    __defers["$.__views.__alloyId108!click!AddRowButtonClicked"] && $.__views.__alloyId108.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_mobile!change!NonAddableTextChanged"] && $.__views.primary_mobile.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId114!click!AddRowButtonClicked"] && $.__views.__alloyId114.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;