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

import {
  selectedDatasetSelector,
  selectedPlaceInfoSelector,
  selectedServerSelector,
  selectedVariableColorBarSelector,
  selectedVariableSelector,
  selectedVolumeIdSelector,
} from "@/selectors/controlSelectors";
import { AppState } from "@/states/appState";
import {
  setVolumeRenderMode,
  showVolumeCard,
  updateVolumeState,
} from "@/actions/controlActions";
import { updateVariableVolume } from "@/actions/dataActions";
import _VolumeCard from "@/components/VolumeCard";

const mapStateToProps = (state: AppState) => {
  return {
    locale: state.controlState.locale,
    volumeCardOpen: state.controlState.volumeCardOpen,
    selectedDataset: selectedDatasetSelector(state),
    selectedVariable: selectedVariableSelector(state),
    selectedPlaceInfo: selectedPlaceInfoSelector(state),
    variableColorBar: selectedVariableColorBarSelector(state),
    volumeRenderMode: state.controlState.volumeRenderMode,
    volumeId: selectedVolumeIdSelector(state),
    volumeStates: state.controlState.volumeStates,
    serverUrl: selectedServerSelector(state).url,
  };
};

const mapDispatchToProps = {
  showVolumeCard,
  setVolumeRenderMode,
  updateVolumeState,
  updateVariableVolume,
};

const VolumeCard = connect(mapStateToProps, mapDispatchToProps)(_VolumeCard);
export default VolumeCard;
