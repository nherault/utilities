import { DefaultFormContractRenderer } from './form-contract-renderer';
var FormContractManager = /** @class */ (function () {
    function FormContractManager(renderer) {
        this.renderer = renderer || new DefaultFormContractRenderer();
    }
    ///////////////////////////////////////////
    // Get form data
    ///////////////////////////////////////////
    FormContractManager.generateFormJson = function (formId) {
        var el = document.getElementById(formId);
        var obj = {};
        for (var i = 0; i < el.elements.length; i++) {
            var item = el.elements.item(i);
            if (item.name !== "" && item.type !== "radio" && item.type !== "checkbox") {
                obj[item.name] = item.value;
            }
            else if (item.type === "radio" && item.checked) {
                obj[item.name] = item.value;
            }
            else if (item.type === "checkbox") {
                obj[item.name] = item.checked;
            }
        }
        return obj;
    };
    ///////////////////////////////////////////
    // Render the form
    ///////////////////////////////////////////
    FormContractManager.prototype.displayForm = function (domId, formData, initializedData) {
        if (initializedData === void 0) { initializedData = {}; }
        var formHTML = "<form id=\"" + formData.id + "\" name='" + formData.id + "'>";
        formHTML += this.renderer.renderHeader({ formData: formData, initializedData: initializedData });
        for (var i = 0, length_1 = formData.fields.length; i < length_1; i++) {
            var fieldInput = formData.fields[i];
            formHTML += this.renderer.renderPreField();
            if (fieldInput.type === "text") {
                formHTML += this.renderer.renderTextField(fieldInput, initializedData[fieldInput.id]);
            }
            else if (fieldInput.type === "number") {
                formHTML += this.renderer.renderNumberField(fieldInput, initializedData[fieldInput.id]);
            }
            else if (fieldInput.type === "range") {
                formHTML += this.renderer.renderRangeField(fieldInput, initializedData[fieldInput.id]);
            }
            else if (fieldInput.type === "date") {
                formHTML += this.renderer.renderDateField(fieldInput, initializedData[fieldInput.id]);
            }
            else if (fieldInput.type === "boolean") {
                formHTML += this.renderer.renderBooleanField(fieldInput, initializedData[fieldInput.id]);
            }
            else if (fieldInput.type === "list") {
                formHTML += this.renderer.renderListField(fieldInput, initializedData[fieldInput.id]);
            }
            else {
                console.error("FieldInput Type Not Implemented: " + JSON.stringify(fieldInput));
            }
            formHTML += this.renderer.renderPostField();
        }
        formHTML += this.renderer.renderFooter(formData, initializedData);
        formHTML += '</form>';
        var formWrapperEl = document.getElementById(domId);
        var formEl = document.getElementById(formData.id);
        if (formWrapperEl && formEl) {
            formWrapperEl.innerHTML = formHTML;
            formEl.addEventListener('submit', function () { return false; });
        }
        this.renderer.applyPostFormEvents({ domId: domId, formData: formData, initializedData: initializedData });
    };
    return FormContractManager;
}());
export { FormContractManager };
//# sourceMappingURL=../../src/src/form-contract/form-contract-manager.js.map