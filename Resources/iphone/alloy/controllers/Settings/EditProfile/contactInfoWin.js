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
    function NonAddableTextChanged(e) {
        changeValueOfNonAddableField(userDataInArrays, e.source.id, e.source.value);
    }
    function AddableTextChanged(e) {
        changeValueOfAddableField(userDataInArrays, e.source.fieldType, addableTextOldValue, e.source.value);
        addableTextOldValue = e.source.value;
    }
    function TextFieldFocused(e) {
        clickedPrivacyLabel && $.pickerContainer.btn_toolBarDone.fireEvent("click");
        e.source.fieldType && (addableTextOldValue = e.source.value);
        clickedTextField = e.source;
    }
    function PrivacyLabelClicked(e) {
        DismissKeyboardClicked();
        $.pickerContainer.pickerView.visible = true;
        $.pickerContainer.picker.setSelectedRow(0, privacyIndex[e.source.text], {
            animated: true
        });
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
    var __alloyId99 = [];
    $.__views.__alloyId100 = Ti.UI.createTableViewRow({
        editable: false,
        top: 20,
        height: Ti.UI.SIZE,
        isPhone: "1",
        id: "__alloyId100"
    });
    __alloyId99.push($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    AddRowButtonClicked ? $.__views.__alloyId102.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId102!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId103 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId103"
    });
    __alloyId99.push($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
    var __alloyId107 = [];
    $.__views.__alloyId108 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId107.push($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done",
        id: "__alloyId109"
    });
    __alloyId107.push($.__views.__alloyId109);
    DismissKeyboardClicked ? $.__views.__alloyId109.addEventListener("click", DismissKeyboardClicked) : __defers["$.__views.__alloyId109!click!DismissKeyboardClicked"] = true;
    $.__views.keyboardToolbar = Ti.UI.iOS.createToolbar({
        items: __alloyId107,
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
    $.__views.__alloyId103.add($.__views.primary_mobile);
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
    $.__views.__alloyId103.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId110 = Ti.UI.createTableViewRow({
        editable: false,
        backgroundColor: "#D0D0D0",
        id: "__alloyId110"
    });
    __alloyId99.push($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createTableViewRow({
        editable: false,
        top: 20,
        height: Ti.UI.SIZE,
        isPhone: "0",
        id: "__alloyId111"
    });
    __alloyId99.push($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId113"
    });
    $.__views.__alloyId111.add($.__views.__alloyId113);
    AddRowButtonClicked ? $.__views.__alloyId113.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId113!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId114 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId114"
    });
    __alloyId99.push($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
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
    $.__views.__alloyId114.add($.__views.primary_email);
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
    $.__views.__alloyId114.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId116 = Ti.UI.createTableViewRow({
        editable: false,
        backgroundColor: "#D0D0D0",
        id: "__alloyId116"
    });
    __alloyId99.push($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId117"
    });
    __alloyId99.push($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId118"
    });
    $.__views.__alloyId117.add($.__views.__alloyId118);
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
    $.__views.__alloyId117.add($.__views.skype);
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
    $.__views.__alloyId117.add($.__views.skype_privacy);
    $.__views.__alloyId119 = Ti.UI.createTableViewRow({
        editable: false,
        backgroundColor: "#D0D0D0",
        id: "__alloyId119"
    });
    __alloyId99.push($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId120"
    });
    __alloyId99.push($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
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
    $.__views.__alloyId120.add($.__views.bbm);
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
    $.__views.__alloyId120.add($.__views.bbm_privacy);
    $.__views.tableView = Ti.UI.createTableView({
        data: __alloyId99,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    TableViewRowClicked ? $.__views.tableView.addEventListener("click", TableViewRowClicked) : __defers["$.__views.tableView!click!TableViewRowClicked"] = true;
    DeletePressed ? $.__views.tableView.addEventListener("delete", DeletePressed) : __defers["$.__views.tableView!delete!DeletePressed"] = true;
    $.__views.pickerContainer = Alloy.createController("/Settings/EditProfile/privacyPicker", {
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
    var privacyIndex = {
        "public": 0,
        friends: 1,
        favorites: 2,
        onlyMe: 3
    };
    var clickedTextField;
    $.pickerContainer.picker.addEventListener("change", function() {
        var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        clickedPrivacyLabel.id ? changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy) : changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);
        clickedPrivacyLabel.text = newPrivacy;
    });
    $.pickerContainer.btn_toolBarDone.addEventListener("click", function() {
        $.pickerContainer.pickerView.visible = false;
    });
    __defers["$.__views.__alloyId102!click!AddRowButtonClicked"] && $.__views.__alloyId102.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId109!click!DismissKeyboardClicked"] && $.__views.__alloyId109.addEventListener("click", DismissKeyboardClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId113!click!AddRowButtonClicked"] && $.__views.__alloyId113.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email!focus!TextFieldFocused"] && $.__views.primary_email.addEventListener("focus", TextFieldFocused);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;