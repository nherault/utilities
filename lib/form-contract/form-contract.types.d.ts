export interface FormContract {
    id: string;
    type: "form";
    label?: string;
    fields: Field[];
}
export interface Field {
    id: string;
    label: string;
    type: "text" | "date" | "range" | "list" | "boolean" | "number";
}
export interface TextField extends Field {
    placeholder?: string;
}
export interface DateField extends Field {
    placeholder?: string;
}
export interface RangeField extends Field {
    min?: number;
    max?: number;
    step?: number;
}
export interface ListField extends Field {
    values: {
        id: number;
        label: string;
    }[];
}
export interface BooleanField extends Field {
}
