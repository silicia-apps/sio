export interface SioCoreFormComponentInputInterface {
  name: string;
  value?: string | number | boolean | null;
  label?: string | null;
  required?: boolean | null;
  order?: number | null;
  controlType?: string | null;
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  options?: { key: string; value: string }[];
}
