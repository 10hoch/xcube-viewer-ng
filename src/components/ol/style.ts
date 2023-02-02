/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019-2022 by the xcube development team and contributors.
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

import { default as OlStyle } from "ol/style/Style";
import { default as  OlFeature} from "ol/Feature";
import { default as OlFillStyle } from "ol/style/Fill";
import { default as OlStrokeStyle } from "ol/style/Stroke";
import { default as OlCircleStyle } from "ol/style/Circle";
import { Color as OlColor } from "ol/color";
import { default as OlPoint } from "ol/geom/Point";
import rgba from "color-rgba";


export function setFeatureStyle(feature: OlFeature, color: string, fillOpacity?: number) {
    if (feature.getGeometry() instanceof OlPoint) {
        feature.setStyle(createPointGeometryStyle(7, color, 'white', 1));
    } else {
        fillOpacity = typeof fillOpacity === "number" ? fillOpacity : 0.25;
        let fillColorRgba = rgba(color);
        if (Array.isArray(fillColorRgba)) {
            fillColorRgba = [fillColorRgba[0], fillColorRgba[1], fillColorRgba[2], fillOpacity];
        } else {
            fillColorRgba = [255, 255, 255, fillOpacity];
        }
        feature.setStyle(createGeometryStyle(fillColorRgba, color, 2));
    }
}


export function createPointGeometryStyle(radius: number,
                                         fillColor: string,
                                         strokeColor: string,
                                         strokeWidth: number): OlStyle {
    const fill = new OlFillStyle(
        {
            color: fillColor,
        });
    const stroke = new OlStrokeStyle(
        {
            color: strokeColor,
            width: strokeWidth,
        }
    );
    return new OlStyle(
        {
            image: new OlCircleStyle({radius, fill, stroke})
        }
    );
}

export function createGeometryStyle(fillColor: string | OlColor,
                                    strokeColor: string | OlColor,
                                    strokeWidth: number): OlStyle {
    const fill = new OlFillStyle(
        {
            color: fillColor,
        });
    const stroke = new OlStrokeStyle(
        {
            color: strokeColor,
            width: strokeWidth,
        }
    );
    return new OlStyle({fill, stroke});
}
