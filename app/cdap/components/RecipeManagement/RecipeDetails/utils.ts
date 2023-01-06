/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

/**
 * @param  {string} millisecondsTime
 * @return {string} This function is used convert milliseconds to 12 October, 4:30PM date format
 */
export const getFormattedDate = (millisecondsTime) => {
  const normalDateString = new Date(millisecondsTime);
  const splitTime = normalDateString.toLocaleTimeString('en-US').split(':');
  const timeFormat = `${splitTime[0]}:${splitTime[1]}${splitTime[2].split(' ')[1]}`;
  const getMonthName = normalDateString.toLocaleString('default', { month: 'long' });
  const finalFormat = `${normalDateString.getDate()} ${getMonthName}, ${timeFormat}`;
  return finalFormat;
};
