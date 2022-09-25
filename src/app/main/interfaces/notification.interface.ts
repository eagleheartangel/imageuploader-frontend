export interface NotificationInterface {
  showHide: boolean;
  title: string;
  description: string;
  color: Color;
}

interface Color {
  modal: string;
}
