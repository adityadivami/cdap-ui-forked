import { MENU_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/menuOptions';
import {
  ColumnIcon,
  FragmentIcon,
  GridIcon,
  InvalidIcon,
  MathIcon,
  NullIcon,
  OtherIcon,
  Redo,
  SecurityIcon,
  StructureIcon,
  Undo,
} from 'components/GridTable/components/TransformationToolbar/iconStore';
import T from 'i18n-react';
import { OTHER_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/otherOptions';

export const nestedMenuOptions = [
  {
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.undoIcon').toString(),
    action: 'undo',
    dataType: ['all'],
    toolName: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.undoIcon'
    ).toString(),
    icon: Undo,
    options: [],
    open: false,
  },
  {
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.redoIcon').toString(),
    action: 'redo',
    dataType: ['all'],
    toolName: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.redoIcon'
    ).toString(),
    icon: Redo,
    options: [],
    open: false,
  },
  {
    options: [],
    icon: NullIcon,
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.nullIcon').toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.nullIcon'),
    open: false,
  },
  {
    options: [],
    icon: InvalidIcon,
    title: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.invalidIcon'
    ).toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.invalidIcon'),
    open: false,
  },
  {
    options: [],
    icon: ColumnIcon,
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.columnIcon').toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.columnIcon'),
    open: false,
  },
  {
    options: MENU_OPTIONS,
    icon: StructureIcon,
    title: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.structureIcon'
    ).toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.structureIcon'),
    open: false,
  },
  {
    options: [],
    icon: FragmentIcon,
    title: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.fragmentIcon'
    ).toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.fragmentIcon'),
    open: false,
  },
  {
    options: [],
    icon: MathIcon,
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.mathIcon').toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.mathIcon'),
    open: false,
  },
  {
    options: [],
    icon: SecurityIcon,
    title: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.securityIcon'
    ).toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.securityIcon'),
    open: false,
  },
  {
    options: OTHER_OPTIONS,
    icon: OtherIcon,
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.otherIcon').toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.otherIcon'),
    open: false,
  },
  {
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.gridIcon').toString(),
    toolName: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.gridIcon'
    ).toString(),
    icon: GridIcon,
    options: [],
    open: false,
  },
];
