import { DefaultFormContractRenderer, FormContractRenderer } from './form-contract-renderer';

export class FormContractManager {

  private renderer: FormContractRenderer;

  ///////////////////////////////////////////
  // Get form data
  ///////////////////////////////////////////
  static generateFormJson(formId: string) {
    const el: HTMLFormElement = <HTMLFormElement> document.getElementById(formId);
    let obj:any = {};
    for (let i = 0 ; i < el.elements.length ; i++) {
      let item: HTMLInputElement = <HTMLInputElement> el.elements.item(i);
      if (item.name !== "" && item.type !== "radio" && item.type !== "checkbox") {
        obj[item.name] = item.value;
      } else if (item.type === "radio" && item.checked) {
        obj[item.name] = item.value;
      } else if (item.type === "checkbox") {
        obj[item.name] = item.checked;
      }
    }
    return obj;
  }

  constructor(renderer?: FormContractRenderer) {
    this.renderer = renderer || new DefaultFormContractRenderer();
  }

  ///////////////////////////////////////////
  // Render the form
  ///////////////////////////////////////////
  displayForm(domId: string, formData: any, initializedData: any = {}) {

    let formHTML: string = `<form id="${formData.id}" name='${formData.id}'>`;
    formHTML += this.renderer.renderHeader({ formData, initializedData });
    for (let i = 0, length = formData.fields.length; i < length; i++) {
      const fieldInput = formData.fields[i];
      formHTML += this.renderer.renderPreField();
      if (fieldInput.type === "text") {
        formHTML += this.renderer.renderTextField(fieldInput, initializedData[fieldInput.id]);
      } else if (fieldInput.type === "number") {
        formHTML += this.renderer.renderNumberField(fieldInput, initializedData[fieldInput.id]);
      } else if (fieldInput.type === "range") {
        formHTML += this.renderer.renderRangeField(fieldInput, initializedData[fieldInput.id]);
      } else if (fieldInput.type === "date") {
        formHTML += this.renderer.renderDateField(fieldInput, initializedData[fieldInput.id]);
      } else if (fieldInput.type === "boolean") {
        formHTML += this.renderer.renderBooleanField(fieldInput, initializedData[fieldInput.id]);
      } else if (fieldInput.type === "list") {
        formHTML += this.renderer.renderListField(fieldInput, initializedData[fieldInput.id]);
      } else {
        console.error("FieldInput Type Not Implemented: " + JSON.stringify(fieldInput));
      }
      formHTML += this.renderer.renderPostField();
    }

    formHTML += this.renderer.renderFooter(formData, initializedData);
    formHTML += '</form>';

    const formWrapperEl = document.getElementById(domId);
    const formEl = document.getElementById(formData.id);
    if (formWrapperEl && formEl) {
      formWrapperEl.innerHTML = formHTML;
      formEl.addEventListener('submit', () => false);
    }

    this.renderer.applyPostFormEvents({ domId, formData, initializedData });
  }
}
