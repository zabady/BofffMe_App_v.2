function Controller() {
    function createBindingRowData(fieldValue, privacy, isPhone) {
        var data = {
            TextOfFieldTitle: isPhone ? "Phone" : "Email",
            HintTextOfField: isPhone ? "Phone number" : "Email address",
            FieldType: isPhone ? "phone_numbers" : "mails",
            KeyboardType: isPhone ? Ti.UI.KEYBOARD_DECIMAL_PAD : Ti.UI.KEYBOARD_EMAIL,
            KeyboardToolbar: isPhone ? $.keyboardToolbar : null,
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
    function PrimaryPhoneTextLongclick() {
        alert("How will we allow the user to change primary phone ?\nMaybe with FTR.");
    }
    function TextFieldFocused(e) {
        true && clickedPrivacyLabel && $.pickerContainer.btn_toolBarDone.fireEvent("click");
        e.source.fieldType && (addableTextOldValue = e.source.value);
        clickedTextField = e.source;
    }
    function AndroidEditViewTextChanged() {
        clickedTextField.value = $.fieldValue.value;
    }
    function AndroidEditViewBlur() {
        $.androidEditView.visible = false;
    }
    function NonAddableTextChanged(e) {
        changeValueOfNonAddableField(userDataInArrays, e.source.id, e.source.value);
    }
    function AddableTextChanged(e) {
        changeValueOfAddableField(userDataInArrays, e.source.fieldType, addableTextOldValue, e.source.value);
        addableTextOldValue = e.source.value;
    }
    function PrivacyLabelClicked(e) {
        DismissKeyboardClicked();
        clickedPrivacyLabel = e.source;
    }
    function DismissKeyboardClicked() {
        clickedTextField && clickedTextField.blur();
    }
    function addNewRowAfter(data, rowNum) {
        var fieldTitleLabel = Ti.UI.createLabel({
            text: data.TextOfFieldTitle
        });
        $.addClass(fieldTitleLabel, "fieldTitleLabel");
        var fieldTextField = Ti.UI.createTextField({
            value: data.TextOfField,
            hintText: data.HintTextOfField,
            fieldType: data.FieldType,
            keyboardType: data.KeyboardType,
            keyboardToolbar: data.KeyboardToolbar
        });
        fieldTextField.addEventListener("change", AddableTextChanged);
        fieldTextField.addEventListener("focus", TextFieldFocused);
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
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId96 = [];
    $.__views.__alloyId97 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId97"
    });
    __alloyId96.push($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId99"
    });
    $.__views.__alloyId97.add($.__views.__alloyId99);
    AddRowButtonClicked ? $.__views.__alloyId99.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId99!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId101 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId101"
    });
    __alloyId96.push($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId102"
    });
    $.__views.__alloyId101.add($.__views.__alloyId102);
    var __alloyId105 = [];
    $.__views.__alloyId106 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId105.push($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done",
        id: "__alloyId107"
    });
    __alloyId105.push($.__views.__alloyId107);
    DismissKeyboardClicked ? $.__views.__alloyId107.addEventListener("click", DismissKeyboardClicked) : __defers["$.__views.__alloyId107!click!DismissKeyboardClicked"] = true;
    $.__views.keyboardToolbar = Ti.UI.iOS.createToolbar({
        items: __alloyId105,
        id: "keyboardToolbar"
    });
    $.__views.primary_mobile = Ti.UI.createTextField({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        keyboardToolbar: $.__views.keyboardToolbar,
        id: "primary_mobile",
        editable: "false"
    });
    $.__views.__alloyId101.add($.__views.primary_mobile);
    PrimaryPhoneTextLongclick ? $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick) : __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] = true;
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
    $.__views.__alloyId101.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId108 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId108"
    });
    __alloyId96.push($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId109"
    });
    __alloyId96.push($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId110"
    });
    $.__views.__alloyId109.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId111"
    });
    $.__views.__alloyId109.add($.__views.__alloyId111);
    AddRowButtonClicked ? $.__views.__alloyId111.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId111!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId113 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId113"
    });
    __alloyId96.push($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
    $.__views.primary_email = Ti.UI.createTextField({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        id: "primary_email",
        hintText: "Email address",
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    });
    $.__views.__alloyId113.add($.__views.primary_email);
    NonAddableTextChanged ? $.__views.primary_email.addEventListener("change", NonAddableTextChanged) : __defers["$.__views.primary_email!change!NonAddableTextChanged"] = true;
    TextFieldFocused ? $.__views.primary_email.addEventListener("focus", TextFieldFocused) : __defers["$.__views.primary_email!focus!TextFieldFocused"] = true;
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
    $.__views.__alloyId113.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId115 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId115"
    });
    __alloyId96.push($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId116"
    });
    __alloyId96.push($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId117"
    });
    $.__views.__alloyId116.add($.__views.__alloyId117);
    $.__views.skype = Ti.UI.createTextField({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        id: "skype",
        hintText: "Skype name"
    });
    $.__views.__alloyId116.add($.__views.skype);
    $.__views.skype_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "skype_privacy"
    });
    $.__views.__alloyId116.add($.__views.skype_privacy);
    $.__views.__alloyId118 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId118"
    });
    __alloyId96.push($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId119"
    });
    __alloyId96.push($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId120"
    });
    $.__views.__alloyId119.add($.__views.__alloyId120);
    $.__views.bbm = Ti.UI.createTextField({
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        id: "bbm",
        hintText: "BBM Pin Number"
    });
    $.__views.__alloyId119.add($.__views.bbm);
    $.__views.bbm_privacy = Ti.UI.createLabel({
        left: "73%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        text: "Default",
        id: "bbm_privacy"
    });
    $.__views.__alloyId119.add($.__views.bbm_privacy);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId96,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    TableViewRowClicked ? $.__views.tableView.addEventListener("click", TableViewRowClicked) : __defers["$.__views.tableView!click!TableViewRowClicked"] = true;
    DeletePressed ? $.__views.tableView.addEventListener("delete", DeletePressed) : __defers["$.__views.tableView!delete!DeletePressed"] = true;
    $.__views.pickerContainer = Alloy.createController("Settings/EditProfile/privacyPicker", {
        id: "pickerContainer",
        __parentSymbol: __parentSymbol
    });
    $.__views.pickerContainer && $.addTopLevelView($.__views.pickerContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/userDataProcessing.js");
    arguments[0] || {};
    userDataInArrays = convertAddableFieldsToArrays(userData);
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
    var clickedTextField;
    $.pickerContainer.picker.addEventListener("change", function() {
        var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        clickedPrivacyLabel.id ? changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy) : changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);
        clickedPrivacyLabel.text = newPrivacy;
    });
    $.pickerContainer.btn_toolBarDone.addEventListener("click", function() {
        $.pickerContainer.pickerView.visible = false;
    });
    __defers["$.__views.__alloyId99!click!AddRowButtonClicked"] && $.__views.__alloyId99.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId100!click!AddRowButtonClicked"] && $.__views.__alloyId100.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId107!click!DismissKeyboardClicked"] && $.__views.__alloyId107.addEventListener("click", DismissKeyboardClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId111!click!AddRowButtonClicked"] && $.__views.__alloyId111.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId112!click!AddRowButtonClicked"] && $.__views.__alloyId112.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email!focus!TextFieldFocused"] && $.__views.primary_email.addEventListener("focus", TextFieldFocused);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    __defers["$.__views.__alloyId121!click!AndroidEditViewBlur"] && $.__views.__alloyId121.addEventListener("click", AndroidEditViewBlur);
    __defers["$.__views.fieldValue!return!AndroidEditViewBlur"] && $.__views.fieldValue.addEventListener("return", AndroidEditViewBlur);
    __defers["$.__views.fieldValue!change!AndroidEditViewTextChanged"] && $.__views.fieldValue.addEventListener("change", AndroidEditViewTextChanged);
    __defers["$.__views.__alloyId123!click!AndroidEditViewBlur"] && $.__views.__alloyId123.addEventListener("click", AndroidEditViewBlur);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;