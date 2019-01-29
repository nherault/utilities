import { FormContractRenderer } from './form-contract-renderer';
export declare class FormContractManager {
    private renderer;
    static generateFormJson(formId: string): any;
    constructor(renderer?: FormContractRenderer);
    displayForm(domId: string, formData: any, initializedData?: any): void;
}
