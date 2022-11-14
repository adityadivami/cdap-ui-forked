import { MENU_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/menuOptions';
import {
  ColumnIcon,
  FragmentIcon,
  GridIcon,
  MathIcon,
  NullIcon,
  OtherIcon,
  Redo,
  SecurityIcon,
  StructureIcon,
  Undo,
} from 'components/GridTable/components/TransformationToolbar/iconStore';
import { TOOLBAR_ICONS_LABEL_PREFIX } from 'components/GridTable/components/TransformationToolbar/constants';
import T from 'i18n-react';
import { OTHER_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/otherOptions';

export const nestedMenuOptions = [
  {
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.undoIcon`).toString(),
    action: 'undo',
    dataType: ['all'],
    icon: Undo,
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.undoIcon`).toString(),
    options: [],
    open: false,
  },
  {
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.redoIcon`).toString(),
    action: 'redo',
    dataType: ['all'],
    icon: Redo,
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.redoIcon`).toString(),
    options: [],
    open: false,
  },
  {
    options: [],
    icon: NullIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.nullIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.nullIcon`).toString(),
    open: false,
  },
  {
    options: [],
    icon: ColumnIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.columnIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.columnIcon`).toString(),
    open: false,
  },
  {
    options: MENU_OPTIONS,
    icon: StructureIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.structureIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.structureIcon`).toString(),
    open: false,
  },
  {
    options: [],
    icon: FragmentIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.fragmentIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.fragmentIcon`).toString(),
    open: false,
  },
  {
    options: [],
    icon: MathIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.mathIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.mathIcon`).toString(),
    open: false,
  },
  {
    options: [],
    icon: SecurityIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.securityIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.securityIcon`).toString(),
    open: false,
  },
  {
    options: OTHER_OPTIONS,
    icon: OtherIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.otherIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.otherIcon`).toString(),
    open: false,
  },
  {
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.gridIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.gridIcon`).toString(),
    icon: GridIcon,
    options: [],
    open: false,
  },
];
