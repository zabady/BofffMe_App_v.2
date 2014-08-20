function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function ValueLabelClicked(e) {
        DisplayEditView(e.source);
        clickedTextField = e.source;
        addableTextOldValue = e.source.fieldType && clickedTextField.text != clickedTextField.hintText ? e.source.text : "";
    }
    function EditViewTextChanged() {
        if (false == $.editViewContainer.editView.visible) return;
        clickedTextField.text = $.editViewContainer.fieldValue.value;
        if ("" == $.editViewContainer.fieldValue.value) {
            clickedTextField.text = clickedTextField.hintText;
            clickedTextField.color = "#C8C8C8";
        } else clickedTextField.color = "black";
        NonAddableFieldTextChanged();
    }
    function EditViewBlur() {
        $.editViewContainer.editView.visible = false;
        $.editViewContainer.fieldValue.blur();
        $.editViewContainer.fieldValue.value = "";
        $.tableView.appendRow(Ti.UI.createTableViewRow());
        $.tableView.deleteRow($.tableView.sections[0].rows.length - 1);
    }
    function PrivacyLabelClicked(e) {
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
    function DismissPicker() {
        $.pickerContainer.pickerView.visible = false;
    }
    function DisplayEditView(clickedLabel) {
        $.editViewContainer.editView.visible = true;
        $.editViewContainer.fieldTitle.text = "Type " + clickedLabel.hintText;
        $.editViewContainer.fieldValue.hintText = clickedLabel.hintText;
        clickedLabel.text != clickedLabel.hintText && ($.editViewContainer.fieldValue.value = clickedLabel.text);
        $.editViewContainer.fieldValue.keyboardType = clickedLabel.keyboardType;
        $.editViewContainer.fieldValue.focus();
    }
    function NonAddableFieldTextChanged() {
        changeValueOfNonAddableField(userDataInArrays, clickedTextField.id, clickedTextField.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Settings/EditProfile/workAndEdWin";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId225 = [];
    $.__views.__alloyId226 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId226"
    });
    __alloyId225.push($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId227"
    });
    __alloyId225.push($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Job Title",
        id: "__alloyId228"
    });
    $.__views.__alloyId227.add($.__views.__alloyId228);
    $.__views.job_title = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Job Title",
        id: "job_title",
        hintText: "Job Title"
    });
    $.__views.__alloyId227.add($.__views.job_title);
    ValueLabelClicked ? $.__views.job_title.addEventListener("click", ValueLabelClicked) : __defers["$.__views.job_title!click!ValueLabelClicked"] = true;
    $.__views.job_title_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "job_title_privacy"
    });
    $.__views.__alloyId227.add($.__views.job_title_privacy);
    PrivacyLabelClicked ? $.__views.job_title_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.job_title_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId229 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId229"
    });
    __alloyId225.push($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId230"
    });
    __alloyId225.push($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Company",
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
    $.__views.company = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Company",
        id: "company",
        hintText: "Company"
    });
    $.__views.__alloyId230.add($.__views.company);
    ValueLabelClicked ? $.__views.company.addEventListener("click", ValueLabelClicked) : __defers["$.__views.company!click!ValueLabelClicked"] = true;
    $.__views.company_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "company_privacy"
    });
    $.__views.__alloyId230.add($.__views.company_privacy);
    PrivacyLabelClicked ? $.__views.company_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.company_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId232 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId232"
    });
    __alloyId225.push($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        id: "__alloyId233"
    });
    __alloyId225.push($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        color: "#2279bc",
        bubbleParent: false,
        text: "Education",
        id: "__alloyId234"
    });
    $.__views.__alloyId233.add($.__views.__alloyId234);
    $.__views.education = Ti.UI.createLabel({
        left: "25%",
        width: "42%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "#C8C8C8",
        text: "Education",
        id: "education",
        hintText: "Education"
    });
    $.__views.__alloyId233.add($.__views.education);
    ValueLabelClicked ? $.__views.education.addEventListener("click", ValueLabelClicked) : __defers["$.__views.education!click!ValueLabelClicked"] = true;
    $.__views.education_privacy = Ti.UI.createLabel({
        left: "71%",
        width: "20%",
        font: {
            fontSize: "15"
        },
        bubbleParent: false,
        color: "black",
        text: "Default",
        id: "education_privacy"
    });
    $.__views.__alloyId233.add($.__views.education_privacy);
    PrivacyLabelClicked ? $.__views.education_privacy.addEventListener("click", PrivacyLabelClicked) : __defers["$.__views.education_privacy!click!PrivacyLabelClicked"] = true;
    $.__views.__alloyId235 = Ti.UI.createTableViewRow({
        editable: false,
        height: 50,
        backgroundColor: "#D0D0D0",
        id: "__alloyId235"
    });
    __alloyId225.push($.__views.__alloyId235);
    $.__views.tableView = Ti.UI.createTableView({
        bottom: 0,
        data: __alloyId225,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    $.__views.editViewContainer = Alloy.createController("Settings/EditProfile/editFieldView", {
        id: "editViewContainer",
        __parentSymbol: __parentSymbol
    });
    $.__views.editViewContainer && $.addTopLevelView($.__views.editViewContainer);
    $.__views.pickerContainer = Alloy.createController("Settings/EditProfile/privacyPicker", {
        id: "pickerContainer",
        __parentSymbol: __parentSymbol
    });
    $.__views.pickerContainer && $.addTopLevelView($.__views.pickerContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
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
          case "job_title":
          case "company":
          case "education":
          case "job_title_privacy":
          case "company_privacy":
          case "education_privacy":
            if ("" != userData[children[j].id] && null != userData[children[j].id]) {
                children[j].text = userData[children[j].id];
                children[j].color = "black";
            }
        }
    }
    $.pickerContainer.picker.addEventListener("change", SelectedPrivacyChanged);
    $.pickerContainer.transparentView1.addEventListener("click", DismissPicker);
    $.pickerContainer.transparentView2.addEventListener("click", DismissPicker);
    $.editViewContainer.cancelView1.addEventListener("click", EditViewBlur);
    $.editViewContainer.cancelView2.addEventListener("click", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("return", EditViewBlur);
    $.editViewContainer.fieldValue.addEventListener("change", EditViewTextChanged);
    __defers["$.__views.job_title!click!ValueLabelClicked"] && $.__views.job_title.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.job_title_privacy!click!PrivacyLabelClicked"] && $.__views.job_title_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.company!click!ValueLabelClicked"] && $.__views.company.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.company_privacy!click!PrivacyLabelClicked"] && $.__views.company_privacy.addEventListener("click", PrivacyLabelClicked);
    __defers["$.__views.education!click!ValueLabelClicked"] && $.__views.education.addEventListener("click", ValueLabelClicked);
    __defers["$.__views.education_privacy!click!PrivacyLabelClicked"] && $.__views.education_privacy.addEventListener("click", PrivacyLabelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;