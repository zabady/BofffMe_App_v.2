function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

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
        e.source.blur();
        $.editView.visible = true;
        $.fieldTitle.text = "Type " + e.source.hintText;
        $.fieldValue.hintText = e.source.hintText;
        e.source.value != e.source.hintText && ($.fieldValue.value = e.source.value);
        $.fieldValue.keyboardType = e.source.keyboardType;
        $.fieldValue.focus();
        e.source.fieldType && (addableTextOldValue = e.source.value);
        clickedTextField = e.source;
    }
    function editViewTextChanged() {
        clickedTextField.value = $.fieldValue.value;
        if ("" == $.fieldValue.value) {
            clickedTextField.value = clickedTextField.hintText;
            clickedTextField.color = "blue";
        } else clickedTextField.color = "black";
        if (clickedTextField.fieldType) {
            changeValueOfAddableField(userDataInArrays, clickedTextField.fieldType, addableTextOldValue, clickedTextField.value);
            addableTextOldValue = clickedTextField.value;
        } else changeValueOfNonAddableField(userDataInArrays, clickedTextField.id, clickedTextField.value);
    }
    function NonAddableTextChanged() {}
    function AddableTextChanged() {}
    function PrivacyLabelClicked(e) {
        DismissKeyboardClicked();
        $.pickerContainer.pickerView.visible = true;
        $.pickerContainer.picker.setSelectedRow(0, privacyIndex[e.source.text], {
            animated: true
        });
        clickedPrivacyLabel = e.source;
    }
    function SelectedPrivacyChanged() {
        var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        var newPrivacy;
        clickedPrivacyLabel.id ? changePrivacyOfNonAddableField(userDataInArrays, clickedPrivacyLabel.id, newPrivacy) : changePrivacyOfAddableField(userDataInArrays, clickedPrivacyLabel.fieldType, clickedPrivacyLabel.text, newPrivacy);
        clickedPrivacyLabel.text = newPrivacy;
    }
    function editViewBlur() {
        $.editView.visible = false;
        $.fieldValue.blur();
    }
    function DismissKeyboardClicked() {
        clickedTextField && clickedTextField.blur();
    }
    function DismissPicker() {
        $.pickerContainer.pickerView.visible = false;
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
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId110 = [];
    $.__views.__alloyId111 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId111"
    });
    __alloyId110.push($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
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
    __alloyId110.push($.__views.__alloyId114);
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
    var __alloyId118 = [];
    $.__views.__alloyId119 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId118.push($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done",
        id: "__alloyId120"
    });
    __alloyId118.push($.__views.__alloyId120);
    DismissKeyboardClicked ? $.__views.__alloyId120.addEventListener("click", DismissKeyboardClicked) : __defers["$.__views.__alloyId120!click!DismissKeyboardClicked"] = true;
    $.__views.keyboardToolbar = Ti.UI.iOS.createToolbar({
        items: __alloyId118,
        id: "keyboardToolbar"
    });
    $.__views.primary_mobile = Ti.UI.createTextField({
        bubbleParent: false,
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        keyboardToolbar: $.__views.keyboardToolbar,
        id: "primary_mobile",
        editable: "false"
    });
    $.__views.__alloyId114.add($.__views.primary_mobile);
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
    $.__views.__alloyId114.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId121 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId121"
    });
    __alloyId110.push($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId122"
    });
    __alloyId110.push($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId124"
    });
    $.__views.__alloyId122.add($.__views.__alloyId124);
    AddRowButtonClicked ? $.__views.__alloyId124.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId124!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId125 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId125"
    });
    __alloyId110.push($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.primary_email = Ti.UI.createTextField({
        bubbleParent: false,
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        id: "primary_email",
        hintText: "Email address",
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    });
    $.__views.__alloyId125.add($.__views.primary_email);
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
    $.__views.__alloyId125.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId127 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId127"
    });
    __alloyId110.push($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId128"
    });
    __alloyId110.push($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.skype = Ti.UI.createTextField({
        bubbleParent: false,
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        id: "skype",
        hintText: "Skype name"
    });
    $.__views.__alloyId128.add($.__views.skype);
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
    $.__views.__alloyId128.add($.__views.skype_privacy);
    $.__views.__alloyId130 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId130"
    });
    __alloyId110.push($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId131"
    });
    __alloyId110.push($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    $.__views.bbm = Ti.UI.createTextField({
        bubbleParent: false,
        left: "29%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        id: "bbm",
        hintText: "BBM Pin Number"
    });
    $.__views.__alloyId131.add($.__views.bbm);
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
    $.__views.__alloyId131.add($.__views.bbm_privacy);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId110,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    TableViewRowClicked ? $.__views.tableView.addEventListener("click", TableViewRowClicked) : __defers["$.__views.tableView!click!TableViewRowClicked"] = true;
    DeletePressed ? $.__views.tableView.addEventListener("delete", DeletePressed) : __defers["$.__views.tableView!delete!DeletePressed"] = true;
    $.__views.editView = Ti.UI.createView({
        id: "editView",
        visible: "false",
        height: "100%",
        layout: "vertical"
    });
    $.__views.editView && $.addTopLevelView($.__views.editView);
    $.__views.__alloyId133 = Ti.UI.createView({
        opacity: "0.5",
        height: "25%",
        backgroundColor: "black",
        id: "__alloyId133"
    });
    $.__views.editView.add($.__views.__alloyId133);
    editViewBlur ? $.__views.__alloyId133.addEventListener("click", editViewBlur) : __defers["$.__views.__alloyId133!click!editViewBlur"] = true;
    $.__views.__alloyId134 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "white",
        height: Ti.UI.SIZE,
        id: "__alloyId134"
    });
    $.__views.editView.add($.__views.__alloyId134);
    $.__views.fieldTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bubbleParent: false,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldTitle",
        color: "#2279bc"
    });
    $.__views.__alloyId134.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        bubbleParent: false,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: 60,
        width: "100%",
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "fieldValue"
    });
    $.__views.__alloyId134.add($.__views.fieldValue);
    editViewBlur ? $.__views.fieldValue.addEventListener("return", editViewBlur) : __defers["$.__views.fieldValue!return!editViewBlur"] = true;
    editViewTextChanged ? $.__views.fieldValue.addEventListener("change", editViewTextChanged) : __defers["$.__views.fieldValue!change!editViewTextChanged"] = true;
    $.__views.__alloyId135 = Ti.UI.createView({
        opacity: "0.5",
        height: "60%",
        backgroundColor: "black",
        id: "__alloyId135"
    });
    $.__views.editView.add($.__views.__alloyId135);
    editViewBlur ? $.__views.__alloyId135.addEventListener("click", editViewBlur) : __defers["$.__views.__alloyId135!click!editViewBlur"] = true;
    $.__views.pickerContainer = Alloy.createController("Settings/EditProfile/privacyPicker", {
        id: "pickerContainer",
        __parentSymbol: __parentSymbol
    });
    $.__views.pickerContainer && $.addTopLevelView($.__views.pickerContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/editProfileHelper.js");
    userDataInArrays = convertAddableFieldsToArrays(userData);
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
    $.pickerContainer.picker.addEventListener("change", SelectedPrivacyChanged);
    $.pickerContainer.transparentView1.addEventListener("click", DismissPicker);
    $.pickerContainer.btn_toolBarDone.addEventListener("click", DismissPicker);
    __defers["$.__views.__alloyId113!click!AddRowButtonClicked"] && $.__views.__alloyId113.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId120!click!DismissKeyboardClicked"] && $.__views.__alloyId120.addEventListener("click", DismissKeyboardClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId124!click!AddRowButtonClicked"] && $.__views.__alloyId124.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email!focus!TextFieldFocused"] && $.__views.primary_email.addEventListener("focus", TextFieldFocused);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    __defers["$.__views.__alloyId133!click!editViewBlur"] && $.__views.__alloyId133.addEventListener("click", editViewBlur);
    __defers["$.__views.fieldValue!return!editViewBlur"] && $.__views.fieldValue.addEventListener("return", editViewBlur);
    __defers["$.__views.fieldValue!change!editViewTextChanged"] && $.__views.fieldValue.addEventListener("change", editViewTextChanged);
    __defers["$.__views.__alloyId135!click!editViewBlur"] && $.__views.__alloyId135.addEventListener("click", editViewBlur);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;