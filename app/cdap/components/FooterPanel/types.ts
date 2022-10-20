import { ReactNode } from 'react';

export interface IFooterPanelProps {
  recipeStepsCount: number;
  dataCounts: IFooterDataCount;
  columnViewPanelOpened: boolean;
}

interface IFooterDataCount {
  rowCount: number;
  columnCount: number;
}
