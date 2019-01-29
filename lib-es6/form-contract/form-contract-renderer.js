var DefaultFormContractRenderer = /** @class */ (function () {
    function DefaultFormContractRenderer() {
    }
    DefaultFormContractRenderer.prototype.renderHeader = function (_a) {
        var formData = _a.formData;
        return "<fieldset><legend>" + formData.label + "</legend>";
    };
    DefaultFormContractRenderer.prototype.renderFooter = function () {
        return "</fieldset>";
    };
    DefaultFormContractRenderer.prototype.renderPreField = function () {
        return "<div class='c-ui-labelinput'>";
    };
    DefaultFormContractRenderer.prototype.renderPostField = function () {
        return "</div>";
    };
    DefaultFormContractRenderer.prototype.renderTextField = function (textData, value) {
        return "<div class=\"c-ui-label\">\n              <label for=\"" + textData.id + "\">" + textData.label + "</label>\n            </div>\n            <div class=\"c-ui-input\">\n              <input \n                type=\"text\" \n                id=\"" + textData.id + "\" \n                name=\"" + textData.id + "\" \n                placeholder=\"" + textData.placeholder + "\" \n                value=\"" + value + "\">\n            </div>";
    };
    DefaultFormContractRenderer.prototype.renderDateField = function (dateData, value) {
        return "<div class=\"c-ui-label\">\n              <label for=\"" + dateData.id + "\">" + dateData.label + "</label>\n            </div>\n            <div class=\"c-ui-input\">\n              <input \n                type=\"text\" \n                id=\"" + dateData.id + "\" \n                name=\"" + dateData.id + "\" \n                placeholder=\"" + dateData.placeholder + "\" \n                value=\"" + value + "\">\n            </div>";
    };
    DefaultFormContractRenderer.prototype.renderNumberField = function (numberData, value) {
        return "<div class=\"c-ui-label\">\n              <label for=\"" + numberData.id + "\">" + numberData.label + "</label>\n            </div>\n            <div class=\"c-ui-input\">\n              <input \n                type=\"number\" \n                id=\"" + numberData.id + "\" \n                name=\"" + numberData.id + "\" \n                placeholder=\"" + numberData.placeholder + "\" \n                value=\"" + value + "\">\n            </div>";
    };
    DefaultFormContractRenderer.prototype.renderRangeField = function (rangeData, value) {
        return "<div class=\"c-ui-label\">\n              <label for=\"" + rangeData.id + "\">" + rangeData.label + "</label>\n            </div>\n            <div class=\"c-ui-input c-ui-rangeinput\">\n            <input  type=\"range\" \n                    id=\"" + rangeData.id + "\" \n                    name=\"" + rangeData.id + "\"\n                    value=\"" + value + "\" \n                    min=\"" + rangeData.min + "\"\n                    max=\"" + rangeData.max + "\"\n                    step=\"" + rangeData.step + "\"></div>";
    };
    DefaultFormContractRenderer.prototype.renderListField = function (listData, value) {
        if (listData.values.length < 3) {
            return this.renderRadioInput(listData, value);
        }
        else {
            return this.renderSelectInput(listData, value);
        }
    };
    DefaultFormContractRenderer.prototype.renderBooleanField = function (booleanData, value) {
        return "<div class=\"c-ui-label\">\n              <label for=\"" + booleanData.id + "\">" + booleanData.label + "</label>\n            </div>\n            <div class=\"c-ui-input\">\n              <input \n                type=\"checkbox\" \n                id=\"" + booleanData.id + "\" \n                name=\"" + booleanData.id + "\" \n                " + (value === true ? 'checked' : '') + ">\n            </div>";
    };
    DefaultFormContractRenderer.prototype.applyPostFormEvents = function (_a) {
        var formData = _a.formData;
        var _loop_1 = function (i, length_1) {
            var fieldInput = formData.fields[i];
            if (fieldInput.type === "range") {
                var el = document.getElementById(fieldInput.id);
                var elOutput_1 = document.getElementById(fieldInput.id + "_output");
                if (el && elOutput_1) {
                    el.insertAdjacentHTML('afterend', "<output id=\"" + fieldInput.id + "_output\"></output>");
                    el.addEventListener('change', function (event) {
                        elOutput_1.innerText = event.currentTarget.value;
                    });
                    elOutput_1.innerText = document.getElementById(fieldInput.id).value;
                }
            }
        };
        for (var i = 0, length_1 = formData.fields.length; i < length_1; i++) {
            _loop_1(i, length_1);
        }
    };
    DefaultFormContractRenderer.prototype.renderSelectInput = function (listData, values) {
        values = Array.isArray(values) ? values : [values];
        var selectHTML = "<div class=\"c-ui-label\"><label for=\"" + listData.id + "\">" + listData.label + "</label></div>";
        selectHTML += "<div class=\"c-ui-input\"><select id=\"" + listData.id + "\" name=\"" + listData.id + "\">";
        listData.values.forEach(function (data) {
            selectHTML += "<option value=\"" + data.id + "\" " + (values.indexOf(data.id) !== -1 ? 'selected' : '') + ">" + data.label + "</option>";
        });
        selectHTML += "</select></div>";
        return selectHTML;
    };
    DefaultFormContractRenderer.prototype.renderRadioInput = function (listData, value, isFieldset) {
        if (isFieldset === void 0) { isFieldset = false; }
        var radioHTML = isFieldset ? "<fieldset><div class=\"c-ui-label\"><legend>" + listData.label + "</legend></div>"
            : "<div class=\"c-ui-label\"><label>" + listData.label + "</label></div>";
        radioHTML += '<div class="c-ui-input">';
        listData.values.forEach(function (data) {
            radioHTML += "<label for=\"" + listData.id + "_" + data.id + "\">" + data.label + "</label>        <input type=\"radio\" id=\"" + listData.id + "_" + data.id + "\" name=\"" + listData.id + "\" value=\"" + data.id + "\" " + (value === data.id ? 'checked' : '') + "/>";
        });
        radioHTML += '</div>';
        radioHTML += isFieldset ? '</fieldset>' : '';
        return radioHTML;
    };
    return DefaultFormContractRenderer;
}());
export { DefaultFormContractRenderer };
//# sourceMappingURL=../../src/src/form-contract/form-contract-renderer.js.map