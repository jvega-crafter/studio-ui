/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { createReducer } from '@reduxjs/toolkit';
import GlobalState from '../../../models/GlobalState';
import { ViewVersionDialogStateProps } from '../../../modules/Content/History/ViewVersionDialog';
import {
  closeViewVersionDialog,
  fetchContentVersion,
  fetchContentVersionComplete,
  fetchContentVersionFailed,
  showHistoryDialog,
  showViewVersionDialog
} from '../../actions/dialogs';

const initialState: ViewVersionDialogStateProps = {
  open: false,
  isFetching: null,
  error: null,
  version: null,
  rightActions: null,
  leftActions: null,
  onClose: null,
  onDismiss: null
};

export default createReducer<GlobalState['dialogs']['viewVersion']>(initialState, {
  [showViewVersionDialog.type]: (state, { payload }) => ({
    ...state,
    onDismiss: closeViewVersionDialog(),
    ...payload,
    open: true
  }),
  [closeViewVersionDialog.type]: (state) => ({
    ...initialState,
    onClose: state.onClose
  }),
  [fetchContentVersion.type]: (state) => ({
    ...state,
    isFetching: true
  }),
  [fetchContentVersionComplete.type]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    version: payload
  }),
  [fetchContentVersionFailed.type]: (state) => ({
    ...state,
    isFetching: false
  }),
  [showHistoryDialog.type]: (state) => initialState
});
