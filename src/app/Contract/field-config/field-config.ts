export interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'date';
    required?: boolean;
  }