import { COLUMN_OPTIONS } from '../NestedMenu/menuOptions/columnOptions';
import { FRAGMENT_OPTIONS } from '../NestedMenu/menuOptions/fragmentOptions';
import { INVALID_ICON_OPTIONS } from '../NestedMenu/menuOptions/invalidIconOptions';
import { MATH_OPTIONS } from '../NestedMenu/menuOptions/mathOptions';
import { MENU_OPTIONS } from '../NestedMenu/menuOptions/menuOptions';
import { NULL_MISSING_OPTIONS } from '../NestedMenu/menuOptions/nullAndMissingOptions';
import { OTHER_OPTIONS } from '../NestedMenu/menuOptions/otherOptions';
import { SECURITY_OPTIONS } from '../NestedMenu/menuOptions/securityOptions';
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
} from './iconStore';
import T from 'i18n-react';

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
    options: NULL_MISSING_OPTIONS,
    icon: NullIcon,
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.nullIcon').toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.nullIcon'),
    open: false,
  },
  {
    options: INVALID_ICON_OPTIONS,
    icon: InvalidIcon,
    title: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.invalidIcon'
    ).toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.invalidIcon'),
    open: false,
  },
  {
    options: COLUMN_OPTIONS,
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
    options: FRAGMENT_OPTIONS,
    icon: FragmentIcon,
    title: T.translate(
      'features.WranglerNewUI.GridPage.toolbarIcons.labels.fragmentIcon'
    ).toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.fragmentIcon'),
    open: false,
  },
  {
    options: MATH_OPTIONS,
    icon: MathIcon,
    title: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.mathIcon').toString(),
    toolName: T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.mathIcon'),
    open: false,
  },
  {
    options: SECURITY_OPTIONS,
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
