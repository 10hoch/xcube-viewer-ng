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

import { connect } from "react-redux";

import _VariableSelect from "@/components/VariableSelect";
import { AppState } from "@/states/appState";
import { addTimeSeries } from "@/actions/dataActions";
import {
  selectVariable,
  toggleVariableCompareMode,
} from "@/actions/controlActions";
import {
  canAddTimeSeriesSelector,
  selectedDatasetVariablesSelector,
} from "@/selectors/controlSelectors";

const mapStateToProps = (state: AppState) => {
  return {
    locale: state.controlState.locale,
    selectedVariableName: state.controlState.selectedVariableName,
    canAddTimeSeries: canAddTimeSeriesSelector(state),
    variables: selectedDatasetVariablesSelector(state),
    variableCompareMode: state.controlState.variableCompareMode,
  };
};

const mapDispatchToProps = {
  selectVariable,
  addTimeSeries,
  toggleVariableCompareMode,
};

const VariableSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_VariableSelect);
export default VariableSelect;
