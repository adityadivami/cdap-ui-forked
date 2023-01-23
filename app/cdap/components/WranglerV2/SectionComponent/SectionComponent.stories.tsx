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

// import { Typography } from '@material-ui/core';
// import SectionComponent from 'components/WranglerV2/SectionComponent';
// import React from 'react';

// export default {
//   title: 'SectionComponent',
//   component: SectionComponent,
// };

// const title: string = 'Function';
// const showDivider: boolean = true;
// const showTickIcon: boolean = true;
// // const children =
// // <SectionBodyText component="span">{transformationName}</SectionBodyText>
// // <a href="https://mui.com/material-ui/material-icons/">icon</a>;

// export function AddTransformationStep(args) {
//   const { children } = args;
//   return <SectionComponent {...args}>{children}</SectionComponent>;
// }

// AddTransformationStep.args = {
//   title,
//   showDivider,
//   showTickIcon,
//   children: (
//     <>
//       <Typography component="span">String</Typography>
//       <a href="https://mui.com/material-ui/material-icons/">icon</a>
//     </>
//   ),
// };

import { Typography } from '@material-ui/core';
import SectionComponent from 'components/WranglerV2/SectionComponent';
import React from 'react';

export default {
  component: SectionComponent,
  title: 'SectionComponent',
};

export const Function = () => (
  <SectionComponent title="Function" showDivider={true} showTickIcon={true}>
    Transformation Name and Icon
  </SectionComponent>
);
export const Select = () => (
  <SectionComponent title="Select" showDivider={true} showTickIcon={true}>
    Select Columns Button
  </SectionComponent>
);
