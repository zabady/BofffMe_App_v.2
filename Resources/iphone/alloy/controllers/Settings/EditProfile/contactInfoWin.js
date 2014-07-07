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
        true && clickedPrivacyLabel && DismissPicker();
        e.source.fieldType && (addableTextOldValue = e.source.value);
        clickedTextField = e.source;
    }
    function AndroidEditViewTextChanged() {
        clickedTextField.value = $.fieldValue.value;
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
    function AndroidEditViewBlur() {
        $.androidEditView.visible = false;
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
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId124 = [];
    $.__views.__alloyId125 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId125"
    });
    __alloyId124.push($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId127"
    });
    $.__views.__alloyId125.add($.__views.__alloyId127);
    AddRowButtonClicked ? $.__views.__alloyId127.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId127!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId129 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId129"
    });
    __alloyId124.push($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    var __alloyId133 = [];
    $.__views.__alloyId134 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId133.push($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Done",
        id: "__alloyId135"
    });
    __alloyId133.push($.__views.__alloyId135);
    DismissKeyboardClicked ? $.__views.__alloyId135.addEventListener("click", DismissKeyboardClicked) : __defers["$.__views.__alloyId135!click!DismissKeyboardClicked"] = true;
    $.__views.keyboardToolbar = Ti.UI.iOS.createToolbar({
        items: __alloyId133,
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
    $.__views.__alloyId129.add($.__views.primary_mobile);
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
    $.__views.__alloyId129.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId136 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId136"
    });
    __alloyId124.push($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId137"
    });
    __alloyId124.push($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createButton({
        right: 10,
        style: Ti.UI.iPhone.SystemButton.CONTACT_ADD,
        id: "__alloyId139"
    });
    $.__views.__alloyId137.add($.__views.__alloyId139);
    AddRowButtonClicked ? $.__views.__alloyId139.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId139!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId141 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId141"
    });
    __alloyId124.push($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
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
    $.__views.__alloyId141.add($.__views.primary_email);
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
    $.__views.__alloyId141.add($.__views.primary_email_privacy);
    PrivacyLabelClicked ? $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId143 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId143"
    });
    __alloyId124.push($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId144"
    });
    __alloyId124.push($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Skype Name",
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
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
    $.__views.__alloyId144.add($.__views.skype);
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
    $.__views.__alloyId144.add($.__views.skype_privacy);
    $.__views.__alloyId146 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId146"
    });
    __alloyId124.push($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId147"
    });
    __alloyId124.push($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        left: "5%",
        width: "22%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "BBM Pin",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
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
    $.__views.__alloyId147.add($.__views.bbm);
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
    $.__views.__alloyId147.add($.__views.bbm_privacy);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId124,
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
    $.pickerContainer.btn_toolBarDone.addEventListener("click", DismissPicker);
    __defers["$.__views.__alloyId127!click!AddRowButtonClicked"] && $.__views.__alloyId127.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId128!click!AddRowButtonClicked"] && $.__views.__alloyId128.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId135!click!DismissKeyboardClicked"] && $.__views.__alloyId135.addEventListener("click", DismissKeyboardClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId139!click!AddRowButtonClicked"] && $.__views.__alloyId139.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.__alloyId140!click!AddRowButtonClicked"] && $.__views.__alloyId140.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email!focus!TextFieldFocused"] && $.__views.primary_email.addEventListener("focus", TextFieldFocused);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    __defers["$.__views.__alloyId149!click!AndroidEditViewBlur"] && $.__views.__alloyId149.addEventListener("click", AndroidEditViewBlur);
    __defers["$.__views.fieldValue!return!AndroidEditViewBlur"] && $.__views.fieldValue.addEventListener("return", AndroidEditViewBlur);
    __defers["$.__views.fieldValue!change!AndroidEditViewTextChanged"] && $.__views.fieldValue.addEventListener("change", AndroidEditViewTextChanged);
    __defers["$.__views.__alloyId151!click!AndroidEditViewBlur"] && $.__views.__alloyId151.addEventListener("click", AndroidEditViewBlur);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;