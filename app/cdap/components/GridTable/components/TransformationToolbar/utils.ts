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
import {TOOLBAR_ICONS_LABEL_PREFIX} from 'components/GridTable/components/TransformationToolbar/constants'
import T from 'i18n-react';

export const nestedMenuOptions = [
  {
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.undoIcon`).toString(),
    action: 'undo',
    dataType: ['all'],
    toolName: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.undoIcon`
    ).toString(),
    icon: Undo,
    options: [],
    open: false,
  },
  {
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.redoIcon`).toString(),
    action: 'redo',
    dataType: ['all'],
    toolName: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.redoIcon`
    ).toString(),
    icon: Redo,
    options: [],
    open: false,
  },
  {
    options: [],
    icon: NullIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.nullIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.nullIcon`),
    open: false,
  },
  {
    options: [],
    icon: InvalidIcon,
    title: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.invalidIcon`
    ).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.invalidIcon`),
    open: false,
  },
  {
    options: [],
    icon: ColumnIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.columnIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.columnIcon`),
    open: false,
  },
  {
    options: MENU_OPTIONS,
    icon: StructureIcon,
    title: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.structureIcon`
    ).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.structureIcon`),
    open: false,
  },
  {
    options: [],
    icon: FragmentIcon,
    title: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.fragmentIcon`
    ).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.fragmentIcon`),
    open: false,
  },
  {
    options: [],
    icon: MathIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.mathIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.mathIcon`),
    open: false,
  },
  {
    options: [],
    icon: SecurityIcon,
    title: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.securityIcon`
    ).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.securityIcon`),
    open: false,
  },
  {
    options: [],
    icon: OtherIcon,
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.otherIcon`).toString(),
    toolName: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.otherIcon`),
    open: false,
  },
  {
    title: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.gridIcon`).toString(),
    toolName: T.translate(
      `${TOOLBAR_ICONS_LABEL_PREFIX}.gridIcon`
    ).toString(),
    icon: GridIcon,
    options: [],
    open: false,
  },
];
