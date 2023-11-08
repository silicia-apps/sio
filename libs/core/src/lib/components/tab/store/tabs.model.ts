export interface SioCoreTabInterface {
  id: number;
  icon: string;
  caption: string;
  url: string;
  disabled: boolean;
  download: string | undefined;
}

export interface SioCoreTabsStateModel {
  id: string;
  visible: boolean;
  tabs: { [id: number]: SioCoreTabInterface };
}
