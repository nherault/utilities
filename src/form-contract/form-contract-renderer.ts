import { TextField, RangeField, ListField, BooleanField, FormContract, DateField } from './form-contract.types';

export interface FormContractRenderer {
  renderHeader(data: { formData: any, initializedData?: any }): string;
  renderFooter(formData?: any, initializedData?: any): string;
  renderPreField(): string;
  renderPostField(): string;
  renderTextField(textData: TextField, value: string): string;
  renderDateField(dateData: DateField, value: string): string;
  renderNumberField(numberData: TextField, value: number): string;
  renderRangeField(rangeData: RangeField, value: number): string;
  renderListField(listData: ListField, value: any): string;
  renderBooleanField(booleanData: BooleanField, value: boolean): string;
  applyPostFormEvents({ formData }: { domId: string, formData: FormContract, initializedData?: any }): void;
}

export class DefaultFormContractRenderer implements FormContractRenderer {

  renderHeader({ formData }: { formData: any, initializedData?: any }): string {
    return `<fieldset><legend>${formData.label}</legend>`;
  }

  renderFooter(): string {
    return `</fieldset>`;
  }

  renderPreField(): string {
    return "<div class='c-ui-labelinput'>";
  }

  renderPostField(): string {
    return "</div>";
  }

  renderTextField(textData: TextField, value: string): string {
    return `<div class="c-ui-label">
              <label for="${textData.id}">${textData.label}</label>
            </div>
            <div class="c-ui-input">
              <input 
                type="text" 
                id="${textData.id}" 
                name="${textData.id}" 
                placeholder="${textData.placeholder}" 
                value="${value}">
            </div>`;
  }

  renderDateField(dateData: DateField, value: string): string {
    return `<div class="c-ui-label">
              <label for="${dateData.id}">${dateData.label}</label>
            </div>
            <div class="c-ui-input">
              <input 
                type="text" 
                id="${dateData.id}" 
                name="${dateData.id}" 
                placeholder="${dateData.placeholder}" 
                value="${value}">
            </div>`;
  }

  renderNumberField(numberData: TextField, value: number): string {
    return `<div class="c-ui-label">
              <label for="${numberData.id}">${numberData.label}</label>
            </div>
            <div class="c-ui-input">
              <input 
                type="number" 
                id="${numberData.id}" 
                name="${numberData.id}" 
                placeholder="${numberData.placeholder}" 
                value="${value}">
            </div>`;
  }

  renderRangeField(rangeData: RangeField, value: number): string {
    return `<div class="c-ui-label">
              <label for="${rangeData.id}">${rangeData.label}</label>
            </div>
            <div class="c-ui-input c-ui-rangeinput">
            <input  type="range" 
                    id="${rangeData.id}" 
                    name="${rangeData.id}"
                    value="${value}" 
                    min="${rangeData.min}"
                    max="${rangeData.max}"
                    step="${rangeData.step}"></div>`;
  }

  renderListField(listData: ListField, value: any): string {
    if (listData.values.length < 3) {
      return this.renderRadioInput(listData, value);
    } else {
      return this.renderSelectInput(listData, value);
    }
  }

  renderBooleanField(booleanData: BooleanField, value: boolean): string {
    return `<div class="c-ui-label">
              <label for="${booleanData.id}">${booleanData.label}</label>
            </div>
            <div class="c-ui-input">
              <input 
                type="checkbox" 
                id="${booleanData.id}" 
                name="${booleanData.id}" 
                ${value === true ? 'checked' : ''}>
            </div>`;
  }

  applyPostFormEvents({ formData }: { domId: string, formData: FormContract, initializedData?: any }): void {
    for (let i = 0, length = formData.fields.length; i < length; i++) {
      const fieldInput = formData.fields[i];
      if (fieldInput.type === "range") {
        const el = document.getElementById(fieldInput.id);
        const elOutput = document.getElementById(`${fieldInput.id}_output`);
        if (el && elOutput) {
          el.insertAdjacentHTML('afterend', `<output id="${fieldInput.id}_output"></output>`);
          el.addEventListener('change', (event: Event) => {
            elOutput.innerText = (<any>event.currentTarget).value;
          });
          elOutput.innerText = (<HTMLInputElement>document.getElementById(fieldInput.id)).value;
        }        
      }
    }
  }

  private renderSelectInput(listData: ListField, values: any[]): string {
    values = Array.isArray(values) ? values : [values];

    let selectHTML = `<div class="c-ui-label"><label for="${listData.id}">${listData.label}</label></div>`
    selectHTML += `<div class="c-ui-input"><select id="${listData.id}" name="${listData.id}">`;
    listData.values.forEach((data) => {
      selectHTML += `<option value="${data.id}" ${values.indexOf(data.id) !== -1 ? 'selected' : ''}>${data.label}</option>`
    });
    selectHTML += `</select></div>`;
    return selectHTML;
  }

  private renderRadioInput(listData: ListField, value: number, isFieldset: boolean = false): string {

    let radioHTML = isFieldset ? `<fieldset><div class="c-ui-label"><legend>${listData.label}</legend></div>`
      : `<div class="c-ui-label"><label>${listData.label}</label></div>`;
    radioHTML += '<div class="c-ui-input">'
    listData.values.forEach((data) => {
      radioHTML += `<label for="${listData.id}_${data.id}">${data.label}</label>\
        <input type="radio" id="${listData.id}_${data.id}" name="${listData.id}" value="${data.id}" ${value === data.id ? 'checked' : ''}/>`
    });

    radioHTML += '</div>';
    radioHTML += isFieldset ? '</fieldset>' : '';
    return radioHTML;
  }
}
