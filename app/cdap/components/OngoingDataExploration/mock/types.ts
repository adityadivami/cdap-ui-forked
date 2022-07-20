export interface IMockData {
  [key: string]: string | number;
}
export interface IOngoingExplorationCardProps {
  itemData: IMockData[];
}
export interface ICardContentDataProps {
  item: IMockData;
  styles: Record<string, string>;
}

export interface ILinearProgressBarProps {
  [key: string]: string | number;
}
