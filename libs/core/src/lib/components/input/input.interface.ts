export interface SioCoreFormComponentInputInterface {
  name: string;
  value?: string | number | boolean | File[] | null;
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
    | 'password-withtoogle'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'file'
    | 'url'
    | 'week';
  options?: { key: string; value: string }[];
}
