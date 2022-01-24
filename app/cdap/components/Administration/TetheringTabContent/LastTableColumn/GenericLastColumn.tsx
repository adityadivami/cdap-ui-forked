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

import React from 'react';
import IconSVG from 'components/shared/IconSVG';
import ActionsPopover from '../ActionPopover';

interface IGenericLastColumnProps {
  instanceName: string;
  handleEdit: (connType: string, peer: string) => void;
  handleDelete: (connType: string, peer: string) => void;
  connType?: string;
}

const GenericLastColumn = ({
  instanceName,
  handleEdit,
  handleDelete,
  connType,
}: IGenericLastColumnProps) => {
  const actionsElem = () => {
    return <IconSVG name="icon-more" />;
  };
  return (
    <ActionsPopover
      target={actionsElem}
      onDeleteClick={() => handleDelete(connType, instanceName)}
      onEditClick={() => handleEdit(connType, instanceName)}
    />
  );
};

export default GenericLastColumn;
