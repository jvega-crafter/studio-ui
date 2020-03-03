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

import React, { useEffect } from 'react';
import { createStyles, makeStyles, Menu, Theme } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import EmbeddedLegacyEditors from '../modules/Preview/EmbeddedLegacyEditors';
import PublishDialog from '../modules/Content/Publish/PublishDialog';
import { palette } from '../styles/theme';
import { useSelection, useSpreadState } from '../utils/hooks';
import { getItem } from '../services/content';
import { popPiece } from '../utils/string';
import { LookupTable } from '../models/LookupTable';
import ContentInstance from '../models/ContentInstance';

const useStyles = makeStyles((theme: Theme) => createStyles({
  separator: {
    borderTop: `1px solid ${palette.gray.light3}`,
    borderBottom: `1px solid ${palette.gray.light3}`
  }
}));

interface ComponentMenu {
  anchorEl: Element;
  site: string;
  modelId: string;
  parentId?: string;
  embeddedParentPath?: string;

  handleClose(): void;
}

export default function ComponentMenu(props: ComponentMenu) {
  const classes = useStyles({});
  const { anchorEl, site, modelId, parentId, handleClose, embeddedParentPath = null } = props;
  const models = useSelection<LookupTable<ContentInstance>>(state => state.preview.guest?.models);
  const contentTypesBranch = useSelection(state => state.contentTypes);
  const AUTHORING_BASE = useSelection<string>(state => state.env.AUTHORING_BASE);
  const defaultSrc = `${AUTHORING_BASE}/legacy/form?`;
  const [dialogConfig, setDialogConfig] = useSpreadState({
    open: false,
    src: null,
    type: null,
    inProgress: true
  });

  const [publishDialog, setPublishDialog] = useSpreadState({
    open: false,
    item: null,
    scheduling: null
  });


  //Effect used to open the publish Dialog
  useEffect(() => {
    if (models && modelId) {
      let path = models[modelId].craftercms.path;
      if (embeddedParentPath) path = models[parentId].craftercms.path;
      getItem(site, path).subscribe(
        (item) => {
          setPublishDialog({ item })
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }, [models, modelId, setPublishDialog, site, embeddedParentPath, parentId]);

  const handleEdit = (type: string) => {
    handleClose();
    switch (type) {
      case 'schedule': {
        setPublishDialog({ open: true, scheduling: 'custom' });
        break;
      }
      case 'publish': {
        setPublishDialog({ open: true, scheduling: 'now' });
        break;
      }
      case 'form':
      case 'template':
      case 'controller': {
        let src = `${defaultSrc}site=${site}&path=${getPath(type)}&type=${type}`;
        if (embeddedParentPath) {
          src = `${defaultSrc}site=${site}&path=${embeddedParentPath}&isHidden=true&modelId=${modelId}&type=form`;
        }
        setDialogConfig(
          {
            open: true,
            src,
            type
          });
        break;
      }
    }
  };

  const getPath = (type?: string) => {
    switch (type) {
      case 'publish':
      case 'form': {
        if (embeddedParentPath) return embeddedParentPath;
        return models[modelId].craftercms.path;
      }
      case 'template': {
        return contentTypesBranch.byId[models[modelId].craftercms.contentType].displayTemplate;
      }
      case 'controller': {
        let pageName = popPiece(models[modelId].craftercms.contentType, '/');
        return `/scripts/pages/${pageName}.groovy`;
      }
      default: {
        return models[modelId].craftercms.path;
      }
    }
  };

  const onSuccessPublish = () => {
    setPublishDialog({ open: false, scheduling: null, item: { ...publishDialog.item, isLive: true } });
  };

  const onClosePublish = () => {
    setPublishDialog({ open: false, scheduling: null });
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEdit('form')}>
          <FormattedMessage
            id="previewToolBar.menu.edit"
            defaultMessage="Edit"
          />
        </MenuItem>
        {
          (!publishDialog.item?.lockOwner && !publishDialog.item?.isLive) &&
          <MenuItem onClick={() => handleEdit('schedule')}>
            <FormattedMessage
              id="previewToolBar.menu.schedule"
              defaultMessage="Schedule"
            />
          </MenuItem>
        }
        {
          (!publishDialog.item?.lockOwner && !publishDialog.item?.isLive) &&
          <MenuItem onClick={() => handleEdit('publish')}>
            <FormattedMessage
              id="previewToolBar.menu.publish"
              defaultMessage="Publish"
            />
          </MenuItem>
        }
        <MenuItem onClick={handleClose}>
          <FormattedMessage
            id="previewToolBar.menu.history"
            defaultMessage="History"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FormattedMessage
            id="previewToolBar.menu.dependencies"
            defaultMessage="Dependencies"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FormattedMessage
            id="previewToolBar.menu.delete"
            defaultMessage="Delete"
          />
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.separator}>
          <FormattedMessage
            id="previewToolBar.menu.infoSheet"
            defaultMessage="Info Sheet"
          />
        </MenuItem>
        <MenuItem onClick={() => handleEdit('template')}>
          <FormattedMessage
            id="previewToolBar.menu.editTemplate"
            defaultMessage="Edit Template"
          />
        </MenuItem>
        {
          publishDialog.item && contentTypesBranch.byId[publishDialog.item.contentType]?.type === 'page' &&
          <MenuItem onClick={() => handleEdit('controller')}>
            <FormattedMessage
              id="previewToolBar.menu.editController"
              defaultMessage="Edit Controller"
            />
          </MenuItem>
        }
      </Menu>
      {
        dialogConfig.open &&
        <EmbeddedLegacyEditors dialogConfig={dialogConfig} setDialogConfig={setDialogConfig} getPath={getPath}/>
      }
      {
        publishDialog.open &&
        <PublishDialog scheduling={publishDialog.scheduling} items={[publishDialog.item]} onSuccess={onSuccessPublish}
                       onClose={onClosePublish}/>
      }
    </>
  )
}

