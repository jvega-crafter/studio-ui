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

import { LookupTable } from './LookupTable';
import { User } from './User';
import { Site } from './Site';
import ContentType from './ContentType';
import { WidthAndHeight } from './WidthAndHeight';
import PreviewTool from './PreviewTool';
import { ElasticParams, MediaItem } from './Search';
import ContentInstance from './ContentInstance';
import { ContentTypeReceptacle } from './ContentTypeReceptacle';
import { ConfirmDialogStateProps } from '../components/Dialogs/ConfirmDialog';
import { ErrorDialogStateProps } from '../components/SystemStatus/ErrorDialog';
import { MinimizedDialogsStateProps } from './MinimizedDialog';
import { NewContentDialogStateProps } from '../modules/Content/Authoring/NewContentDialog';
import { HistoryDialogStateProps } from '../modules/Content/History/HistoryDialog';
import { PublishDialogStateProps } from '../modules/Content/Publish/PublishDialog';
import { DependenciesDialogStateProps } from '../modules/Content/Dependencies/DependenciesDialog';
import { DeleteDialogStateProps } from '../modules/Content/Delete/DeleteDialog';
import { EntityState } from './EntityState';
import { ApiResponse } from './ApiResponse';
import { ViewVersionDialogStateProps } from '../modules/Content/History/ViewVersionDialog';
import { CompareVersionsDialogStateProps } from '../modules/Content/History/CompareVersionsDialog';
import { VersionsStateProps } from './Version';
import QuickCreateItem from './content/QuickCreateItem';
import { WorkflowCancellationDialogStateProps } from '../components/Dialogs/WorkflowCancellationDialog';
import { RejectDialogStateProps } from '../components/Dialogs/RejectDialog';
import { SidebarConfigItem } from '../services/configuration';
import { WidgetState } from '../components/Navigation/PathNavigator/Widget';
import { LegacyFormDialogStateProps } from '../components/Dialogs/LegacyFormDialog';
import { LegacyCodeEditorDialogStateProps } from '../components/Dialogs/LegacyCodeEditorDialog';
import { DetailedItem } from './Item';
import { CreateFolderStateProps } from '../components/Dialogs/CreateFolderDialog';
import { CopyDialogStateProps } from '../components/Dialogs/CopyDialog';
import { CreateFileStateProps } from '../components/Dialogs/CreateFileDialog';
import { BulkUploadStateProps } from '../components/Dialogs/BulkUploadDialog';
import { PreviewDialogStateProps } from '../components/Dialogs/PreviewDialog';
import { EditSiteDialogStateProps } from '../modules/System/Sites/Edit/EditSiteDialog';

export interface PagedEntityState<T = any> extends EntityState<T> {
  page: any;
  pageNumber: number;
  count: number;
  query: ElasticParams;
}

export interface EditSelection {
  modelId: string;
  fieldId: string[];
  index: string | number;
}

export interface GuestData {
  url: string;
  origin: string;
  models: LookupTable<ContentInstance>;
  childrenMap: LookupTable<string[]>;
  modelId: string;
  path: string;
  selected: EditSelection[];
  itemBeingDragged: boolean;
}

export interface GlobalState {
  auth: {
    error: ApiResponse;
    isFetching: boolean;
    active: boolean;
  };
  user: User;
  sites: {
    active: string;
    isFetching: boolean;
    byId: LookupTable<Site>;
  };
  content: {
    quickCreate: {
      error: ApiResponse;
      isFetching: boolean;
      items: QuickCreateItem[];
    };
    items: {
      byPath: LookupTable<DetailedItem>
      permissionsByPath: LookupTable<LookupTable<boolean>>;
    };
    clipboard: string;
  }
  contentTypes: EntityState<ContentType>;
  env: {
    authoringBase: string;
    guestBase: string;
    xsrfHeader: string;
    xsrfArgument: string;
    siteCookieName: string;
    previewLandingBase: string;
    version: string;
  };
  preview: {
    editMode: boolean;
    currentUrl: string;
    computedUrl: string;
    showToolsPanel: boolean;
    selectedTool: PreviewTool;
    previousTool: PreviewTool;
    tools: Array<any>;
    hostSize: WidthAndHeight;
    guest: GuestData;
    assets: PagedEntityState<MediaItem>;
    audiencesPanel: {
      isFetching: boolean;
      isApplying: boolean;
      error: ApiResponse;
      contentType: ContentType;
      model: ContentInstance;
      applied: boolean;
    };
    components: PagedEntityState<ContentInstance>;
    receptacles: {
      selectedContentType: string;
      byId: LookupTable<ContentTypeReceptacle>;
    };
  };
  versions: VersionsStateProps;
  dialogs: {
    confirm: ConfirmDialogStateProps;
    error: ErrorDialogStateProps;
    minimizedDialogs: MinimizedDialogsStateProps;
    newContent: NewContentDialogStateProps;
    history: HistoryDialogStateProps;
    viewVersion: ViewVersionDialogStateProps;
    compareVersions: CompareVersionsDialogStateProps;
    publish: PublishDialogStateProps;
    dependencies: DependenciesDialogStateProps;
    delete: DeleteDialogStateProps;
    edit: LegacyFormDialogStateProps;
    codeEditor: LegacyCodeEditorDialogStateProps;
    workflowCancellation: WorkflowCancellationDialogStateProps;
    reject: RejectDialogStateProps;
    createFolder: CreateFolderStateProps;
    createFile: CreateFileStateProps;
    copy: CopyDialogStateProps;
    upload: BulkUploadStateProps;
    preview: PreviewDialogStateProps;
    editSite: EditSiteDialogStateProps;
  };
  translation: {
    siteLocales: {
      error: ApiResponse
      isFetching: boolean;
      localeCodes: string[],
      defaultLocaleCode: string
    }
  }
  configuration: {
    sidebar: {
      error: ApiResponse;
      items: Array<SidebarConfigItem>;
      isFetching: boolean;
    },
    publishing: {
      submission: {
        commentMaxLength: number
      }
    }
  };
  pathNavigator: {
    [id: string]: WidgetState;
  };
}

export default GlobalState;