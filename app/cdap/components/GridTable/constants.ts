/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { getCurrentNamespace } from 'services/NamespaceStore';
import T from 'i18n-react';
import { IBreadcrumbItemProps } from 'components/GridTable/components/Breadcrumb/types';
const PREFIX = 'features.WranglerNewUI.Breadcrumb';
export const MISSING_NULL = 'Missing/Null';

export const getWrangleGridBreadcrumbOptions = (workspaceName, location) => {
  const finalBreadcrumbList: IBreadcrumbItemProps[] = [
    {
      link: `/ns/${getCurrentNamespace()}/home`,
      label: T.translate(`${PREFIX}.labels.wrangleHome`).toString(),
    },
  ];

  const requestFromAddress = location?.state?.from;
  const sourcePath =
    requestFromAddress === T.translate(`${PREFIX}.labels.wrangleHome`)
      ? T.translate(`${PREFIX}.params.wrangleHome`)
      : `${T.translate(`${PREFIX}.params.connectionsList`)}/${location?.state?.path}`;

  const intermediateBreadcrumb = {
    link: `/ns/${getCurrentNamespace()}/${sourcePath}`,
    label: requestFromAddress,
  };

  requestFromAddress !== T.translate(`${PREFIX}.labels.wrangleHome`) &&
    finalBreadcrumbList.push(intermediateBreadcrumb);

  finalBreadcrumbList.push({
    label: workspaceName.toString(),
  });

  return finalBreadcrumbList;
};
