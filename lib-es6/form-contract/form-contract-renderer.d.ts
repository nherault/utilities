import { TextField, RangeField, ListField, BooleanField, FormContract, DateField } from './form-contract.types';
export interface FormContractRenderer {
    renderHeader(data: {
        formData: any;
        initializedData?: any;
    }): string;
    renderFooter(formData?: any, initializedData?: any): string;
    renderPreField(): string;
    renderPostField(): string;
    renderTextField(textData: TextField, value: string): string;
    renderDateField(dateData: DateField, value: string): string;
    renderNumberField(numberData: TextField, value: number): string;
    renderRangeField(rangeData: RangeField, value: number): string;
    renderListField(listData: ListField, value: any): string;
    renderBooleanField(booleanData: BooleanField, value: boolean): string;
    applyPostFormEvents({ formData }: {
        domId: string;
        formData: FormContract;
        initializedData?: any;
    }): void;
}
export declare class DefaultFormContractRenderer implements FormContractRenderer {
    renderHeader({ formData }: {
        formData: any;
        initializedData?: any;
    }): string;
    renderFooter(): string;
    renderPreField(): string;
    renderPostField(): string;
    renderTextField(textData: TextField, value: string): string;
    renderDateField(dateData: DateField, value: string): string;
    renderNumberField(numberData: TextField, value: number): string;
    renderRangeField(rangeData: RangeField, value: number): string;
    renderListField(listData: ListField, value: any): string;
    renderBooleanField(booleanData: BooleanField, value: boolean): string;
    applyPostFormEvents({ formData }: {
        domId: string;
        formData: FormContract;
        initializedData?: any;
    }): void;
    private renderSelectInput;
    private renderRadioInput;
}
