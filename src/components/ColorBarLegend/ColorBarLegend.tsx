/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019-2024 by the xcube development team and contributors.
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

import { MouseEvent, useRef, useState } from "react";
import Popover from "@mui/material/Popover";

import ColorBarLegendCategorical from "./ColorBarLegendCategorical";
import ColorBarLegendContinuous from "./ColorBarLegendContinuous";
import ColorBarColorEditor from "./ColorBarColorEditor";
import { ColorBar, ColorBars } from "@/model/colorBar";
import { UserColorBar } from "@/model/userColorBar";
import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material";
import { ColorBarNorm } from "@/model/variable";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: "small",
    fontWeight: "bold",
    width: "100%",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    paddingBottom: theme.spacing(0.5),
  },
  container: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
    color: "black",
  },
}));

interface ColorBarLegendProps {
  variableName: string | null;
  variableUnits: string;
  variableColorBarName: string;
  variableColorBarMinMax: [number, number];
  variableColorBarNorm: ColorBarNorm;
  variableColorBar: ColorBar;
  variableOpacity: number;
  updateVariableColorBar: (
    colorBarName: string,
    colorBarMinMax: [number, number],
    colorBarNorm: ColorBarNorm,
    opacity: number,
  ) => void;
  colorBars: ColorBars;
  userColorBars: UserColorBar[];
  addUserColorBar: (userColorBarId: string) => void;
  removeUserColorBar: (userColorBarId: string) => void;
  updateUserColorBar: (userColorBar: UserColorBar) => void;
  updateUserColorBars: (userColorBars: UserColorBar[]) => void;
  onOpenColorBarEditor: (event: MouseEvent<HTMLCanvasElement>) => void;
}

export default function ColorBarLegend(
  props: Omit<ColorBarLegendProps, "onOpenColorBarEditor">,
) {
  const classes = useStyles();

  const {
    variableName,
    variableUnits,
    variableColorBar,
    variableColorBarNorm,
  } = props;

  const colorBarSelectAnchorRef = useRef<HTMLDivElement | null>(null);
  const [colorBarSelectAnchorEl, setColorBarSelectAnchorEl] =
    useState<HTMLDivElement | null>(null);

  const handleOpenColorBarSelect = () => {
    setColorBarSelectAnchorEl(colorBarSelectAnchorRef.current);
  };

  const handleCloseColorBarSelect = () => {
    setColorBarSelectAnchorEl(null);
  };

  if (!variableName) {
    return null;
  }

  const variableTitle = variableColorBar.categories
    ? variableName
    : `${variableName} (${variableUnits || "-"})`;

  return (
    <div
      className={"ol-control " + classes.container}
      ref={colorBarSelectAnchorRef}
    >
      <div className={classes.title}>
        <span>{variableTitle}</span>
      </div>
      {variableColorBarNorm === "cat" && variableColorBar.categories ? (
        <ColorBarLegendCategorical
          variableColorBarCategories={variableColorBar.categories}
          onOpenColorBarEditor={handleOpenColorBarSelect}
          {...props}
        />
      ) : (
        <ColorBarLegendContinuous
          variableTitle={variableName}
          onOpenColorBarEditor={handleOpenColorBarSelect}
          {...props}
        />
      )}
      <Popover
        anchorEl={colorBarSelectAnchorEl}
        open={Boolean(colorBarSelectAnchorEl)}
        onClose={handleCloseColorBarSelect}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <ColorBarColorEditor {...props} />
      </Popover>
    </div>
  );
}
