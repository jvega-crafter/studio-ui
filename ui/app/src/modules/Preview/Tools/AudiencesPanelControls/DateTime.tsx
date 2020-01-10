/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 */

import React from "react";
import DateTimePicker from "../../../../components/DateTimePicker";

interface Control {
  field: any;
  value: string;
  onChange: Function;
  disabled: boolean;
}

export default function DateTime(props: Control) {
  const {
    field,
    value,
    onChange,
    disabled
  } = props;

  const dateTimePickerChange = (name: string) => (scheduledDateTime: any) => {
    const datetime = scheduledDateTime.toISOString();
    const timezone = scheduledDateTime.tz();

    onChange(name, datetime);
    timezone && onChange(`${name}_tz`, encodeURIComponent(timezone));
  };

  return (
    <DateTimePicker
      initialDate={value}
      timezone={field.timezone}
      onChange={dateTimePickerChange(field.id)}
      disabled={disabled}/>
  )
}
