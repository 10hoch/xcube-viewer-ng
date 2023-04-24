/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019-2021 by the xcube development team and contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as React from 'react';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { WithStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import i18n from '../i18n';
import { Time, TimeRange } from '../model/timeSeries';
import { WithLocale } from '../util/lang';
import { dateTimeToUtcTime, utcTimeToIsoDate } from '../util/time';
import ControlBarItem from './ControlBarItem';


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        dateTimePicker: {
            marginTop: theme.spacing(2)
        }
    }
);

interface TimeSelectProps extends WithStyles<typeof styles>, WithLocale {
    hasTimeDimension?: boolean;
    selectedTime: Time | null;
    selectTime: (time: Time | null) => void;
    selectedTimeRange: TimeRange | null;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
                                                   classes,
                                                   hasTimeDimension,
                                                   selectedTime,
                                                   selectedTimeRange,
                                                   selectTime
                                               }) => {

    const handleTimeChange = (date: Date | null) => {
        selectTime(date !== null ? dateTimeToUtcTime(date!) : null);
    };

    const timeInputLabel = (
        <InputLabel
            shrink
            htmlFor="time-select"
        >
            {`${i18n.get('Time')} (UTC)`}
        </InputLabel>
    );

    const isValid = typeof selectedTime === 'number';
    const timeValue = isValid ? utcTimeToIsoDate(selectedTime!) : null;

    let minTimeValue, maxTimeValue;
    if (Array.isArray(selectedTimeRange)) {
        minTimeValue = utcTimeToIsoDate(selectedTimeRange[0]);
        maxTimeValue = utcTimeToIsoDate(selectedTimeRange[1]);
    }

    const timeInput = (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                disabled={!hasTimeDimension}
                variant="inline"
                emptyLabel={
                    !hasTimeDimension
                        ? i18n.get('Missing time axis')
                        : undefined
                }
                className={classes.dateTimePicker}
                inputFormat="yyyy-MM-dd hh:mm:ss"
                id="time-select"
                value={timeValue}
                minDateTime={minTimeValue}
                maxDateTime={maxTimeValue}
                onChange={handleTimeChange}
                ampm={false}
                renderInput={(props: any) => (
                    <TextField
                        {...props}
                        variant="standard"
                        size="small"
                    />
                )}
            />
        </LocalizationProvider>
    );

    return (
        <ControlBarItem
            label={timeInputLabel}
            control={timeInput}
        />
    );
};

export default withStyles(styles)(TimeSelect);
