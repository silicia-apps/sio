export type SioColorType =
  | 'danger'
  | 'dark'
  | 'light'
  | 'medium'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'tertiary'
  | 'warning'
  | (string & Record<never, never>)
  | undefined;