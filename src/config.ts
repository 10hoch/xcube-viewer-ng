import { blue, green, grey, purple, red, pink, yellow } from "@material-ui/core/colors";
import { LanguageDictionary } from "./util/lang";
import lang from "./resources/lang.json";

export const VIEWER_APP_NAME = 'xcube Viewer';

export const VIEWER_DEFAULT_API_SERVER = {
    id: 'local',
    name: 'Local Server',
    url: 'http://localhost:8080/xcube/api/0.1.0.dev6'
};

export const VIEWER_API_SERVERS = [
    {...VIEWER_DEFAULT_API_SERVER},
];

export const VIEWER_THEME = 'dark';
export const VIEWER_PRIMARY_COLOR = blue;
export const VIEWER_SECONDARY_COLOR = pink;

export const VIEWER_LOGO_WIDTH = 32;
export const VIEWER_HEADER_BACKGROUND_COLOR = undefined;

export const LINECHART_STROKE_SHADE_DARK = 400;
export const LINECHART_STROKE_SHADE_LIGHT = 600;

export const TIME_SERIES_COLORS = {grey, red, blue, green, yellow, purple, pink};
export const TIME_SERIES_COLOR_NAMES = Object.keys(TIME_SERIES_COLORS);

export const I18N = new LanguageDictionary(lang);