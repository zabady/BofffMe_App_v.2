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
        } else if (true && androidDeleteRowFlag) {
            DeletePressed({
                source: {
                    fieldType: e.row.fieldType,
                    fieldValue: e.row.fieldValue
                }
            });
            $.tableView.deleteRow(e.index);
            androidDeleteRowFlag = false;
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
        $.fieldValue.value = e.source.value;
        $.fieldValue.keyboardType = e.source.keyboardType;
        $.fieldValue.focus();
        e.source.fieldType && (addableTextOldValue = e.source.value);
        clickedTextField = e.source;
    }
    function editViewTextChanged() {
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
        if (true && "                                             " == newPrivacy) {
            $.pickerContainer.picker.setSelectedRow(0, 3);
            var newPrivacy = $.pickerContainer.picker.getSelectedRow(0).title;
        }
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
        var removeIcon = Ti.UI.createImageView();
        removeIcon.addEventListener("click", function() {
            androidDeleteRowFlag = true;
        });
        $.addClass(removeIcon, "removeRowImage");
        newRow.add(removeIcon);
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
    var __alloyId131 = [];
    $.__views.__alloyId132 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "1",
        id: "__alloyId132"
    });
    __alloyId131.push($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Phone Numbers",
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    AddRowButtonClicked ? $.__views.__alloyId134.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId134!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId135 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId135"
    });
    __alloyId131.push($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createLabel({
        left: "5%",
        width: "18%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Priamry",
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    $.__views.primary_mobile = Ti.UI.createTextField({
        bubbleParent: false,
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        id: "primary_mobile",
        editable: "false"
    });
    $.__views.__alloyId135.add($.__views.primary_mobile);
    PrimaryPhoneTextLongclick ? $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick) : __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] = true;
    $.__views.primary_mobile_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "primary_mobile_privacy"
    });
    $.__views.__alloyId135.add($.__views.primary_mobile_privacy);
    PrivacyLabelClicked ? $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId137 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId137"
    });
    __alloyId131.push($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createTableViewRow({
        editable: false,
        height: Ti.UI.SIZE,
        top: 20,
        isPhone: "0",
        id: "__alloyId138"
    });
    __alloyId131.push($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: "17"
        },
        color: "#2279bc",
        text: "Email Addresses",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createImageView({
        right: 10,
        width: 22,
        height: 22,
        image: "/images/addIcon-44x44.png",
        id: "__alloyId140"
    });
    $.__views.__alloyId138.add($.__views.__alloyId140);
    AddRowButtonClicked ? $.__views.__alloyId140.addEventListener("click", AddRowButtonClicked) : __defers["$.__views.__alloyId140!click!AddRowButtonClicked"] = true;
    $.__views.__alloyId141 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId141"
    });
    __alloyId131.push($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createLabel({
        left: "5%",
        width: "18%",
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
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        left: "25%",
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
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
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
    __alloyId131.push($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId144"
    });
    __alloyId131.push($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createLabel({
        left: "5%",
        width: "18%",
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
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        id: "skype",
        hintText: "Skype name"
    });
    $.__views.__alloyId144.add($.__views.skype);
    $.__views.skype_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
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
    __alloyId131.push($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId147"
    });
    __alloyId131.push($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        left: "5%",
        width: "18%",
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
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        id: "bbm",
        hintText: "BBM Pin Number"
    });
    $.__views.__alloyId147.add($.__views.bbm);
    $.__views.bbm_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "bbm_privacy"
    });
    $.__views.__alloyId147.add($.__views.bbm_privacy);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId131,
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
    $.__views.__alloyId149 = Ti.UI.createView({
        opacity: "0.5",
        height: "25%",
        backgroundColor: "black",
        id: "__alloyId149"
    });
    $.__views.editView.add($.__views.__alloyId149);
    editViewBlur ? $.__views.__alloyId149.addEventListener("click", editViewBlur) : __defers["$.__views.__alloyId149!click!editViewBlur"] = true;
    $.__views.__alloyId150 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "white",
        height: Ti.UI.SIZE,
        id: "__alloyId150"
    });
    $.__views.editView.add($.__views.__alloyId150);
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
    $.__views.__alloyId150.add($.__views.fieldTitle);
    $.__views.fieldValue = Ti.UI.createTextField({
        bubbleParent: false,
        color: "black",
        ellipsize: true,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
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
    $.__views.__alloyId150.add($.__views.fieldValue);
    editViewBlur ? $.__views.fieldValue.addEventListener("return", editViewBlur) : __defers["$.__views.fieldValue!return!editViewBlur"] = true;
    editViewTextChanged ? $.__views.fieldValue.addEventListener("change", editViewTextChanged) : __defers["$.__views.fieldValue!change!editViewTextChanged"] = true;
    $.__views.__alloyId151 = Ti.UI.createView({
        opacity: "0.5",
        height: "60%",
        backgroundColor: "black",
        id: "__alloyId151"
    });
    $.__views.editView.add($.__views.__alloyId151);
    editViewBlur ? $.__views.__alloyId151.addEventListener("click", editViewBlur) : __defers["$.__views.__alloyId151!click!editViewBlur"] = true;
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
    var androidDeleteRowFlag = false;
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
    $.pickerContainer.transparentView2.addEventListener("click", DismissPicker);
    __defers["$.__views.__alloyId134!click!AddRowButtonClicked"] && $.__views.__alloyId134.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_mobile!longclick!PrimaryPhoneTextLongclick"] && $.__views.primary_mobile.addEventListener("longclick", PrimaryPhoneTextLongclick);
    __defers["$.__views.primary_mobile_privacy!click!PrivacyLabelClicked"] && $.__views.primary_mobile_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.__alloyId140!click!AddRowButtonClicked"] && $.__views.__alloyId140.addEventListener("click", AddRowButtonClicked);
    __defers["$.__views.primary_email!change!NonAddableTextChanged"] && $.__views.primary_email.addEventListener("change", NonAddableTextChanged);
    __defers["$.__views.primary_email!focus!TextFieldFocused"] && $.__views.primary_email.addEventListener("focus", TextFieldFocused);
    __defers["$.__views.primary_email_privacy!click!PrivacyLabelClicked"] && $.__views.primary_email_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.tableView!click!TableViewRowClicked"] && $.__views.tableView.addEventListener("click", TableViewRowClicked);
    __defers["$.__views.tableView!delete!DeletePressed"] && $.__views.tableView.addEventListener("delete", DeletePressed);
    __defers["$.__views.__alloyId149!click!editViewBlur"] && $.__views.__alloyId149.addEventListener("click", editViewBlur);
    __defers["$.__views.fieldValue!return!editViewBlur"] && $.__views.fieldValue.addEventListener("return", editViewBlur);
    __defers["$.__views.fieldValue!change!editViewTextChanged"] && $.__views.fieldValue.addEventListener("change", editViewTextChanged);
    __defers["$.__views.__alloyId151!click!editViewBlur"] && $.__views.__alloyId151.addEventListener("click", editViewBlur);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;