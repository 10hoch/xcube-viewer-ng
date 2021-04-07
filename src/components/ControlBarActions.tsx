import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import InfoIcon from '@material-ui/icons/Info';
import JSZip from 'jszip';

import { I18N } from '../config';
import { TimeSeriesGroup, timeSeriesGroupsToGeoJSON } from '../model/timeSeries';
import { WithLocale } from '../util/lang';

const saveAs = require('file-saver');

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        formControl: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginLeft: 'auto',
        },
    });

interface ControlBarActionsProps extends WithStyles<typeof styles>, WithLocale {
    visible: boolean;
    flyToSelectedObject: () => void;
    infoCardOpen: boolean;
    showInfoCard: (open: boolean) => void;
    timeSeriesGroups: TimeSeriesGroup[];
}

const ControlBarActions: React.FC<ControlBarActionsProps> = ({
                                                                 classes,
                                                                 visible,
                                                                 flyToSelectedObject,
                                                                 infoCardOpen,
                                                                 showInfoCard,
                                                                 timeSeriesGroups,
                                                             }) => {

    if (!visible) {
        return null;
    }

    let downloadButton;
    if (timeSeriesGroups && timeSeriesGroups.length) {
        downloadButton = (
            <Tooltip arrow title={I18N.get('Download time-series data')}>
                <IconButton onClick={() => downloadTimeSeries(timeSeriesGroups)}>
                    {<CloudDownloadIcon/>}
                </IconButton>
            </Tooltip>
        );
    }

    const flyToButton = (
        <Tooltip arrow title={I18N.get('Show selected place in map')}>
            <IconButton onClick={flyToSelectedObject}>
                <MyLocationIcon/>
            </IconButton>
        </Tooltip>
    );

    let infoButton;
    if (!infoCardOpen) {
        infoButton = (
            <Tooltip arrow title={I18N.get('Open information panel')}>
                <IconButton onClick={() => showInfoCard(true)}>
                    {<InfoIcon/>}
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <FormControl className={classes.formControl}>
            <Box>
                {downloadButton}
                {flyToButton}
                {infoButton}
            </Box>
        </FormControl>
    );
};

export default withStyles(styles)(ControlBarActions);


function downloadTimeSeries(timeSeriesGroups: TimeSeriesGroup[], saveCollection: boolean = false) {
    const featureCollection = timeSeriesGroupsToGeoJSON(timeSeriesGroups)
    const zip = new JSZip();
    if (saveCollection) {
        zip.file(`time-series.geojson`, JSON.stringify(featureCollection, null, 2))
    } else {
        for (let feature of featureCollection.features) {
            zip.file(`${feature.id}.geojson`, JSON.stringify(feature, null, 2))
        }
    }
    zip.generateAsync({type: "blob"})
       .then((content) => saveAs(content, "time-series.zip"));
}

