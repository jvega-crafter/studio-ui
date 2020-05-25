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

import {
  createGenerateClassName,
  createMuiTheme,
  darken,
  fade,
  ThemeOptions
} from '@material-ui/core/styles';
import palette from './palette';

export const backgroundColor = palette.gray.light1;
export const RedColor = palette.red.main;

const defaultTheme = createMuiTheme();

export const themeOptions: ThemeOptions = {
  typography: {
    button: {
      textTransform: 'none'
    },
    fontSize: 14,
    fontFamily: '"Source Sans Pro", "Open Sans", sans-serif'
  },
  palette: {
    primary: {
      main: palette.blue.main,
      contrastText: palette.white
    },
    text: {
      secondary: palette.gray.medium4
    },
    error: {
      main: palette.red.main,
      light: palette.red.highlight,
      contrastText: palette.black
    },
    type: 'light'
  },
  overrides: {
    MuiFormLabel: {
      root: {
        transform: 'translate(0, 1.5px) scale(1) !important',
        transformOrigin: 'top left !important'
      },
      asterisk: {
        color: RedColor
      }
    },
    MuiInputBase: {
      root: {
        'label + &': {
          marginTop: `${defaultTheme.spacing(3)}px !important`
        },
        '&.MuiInput-underline::before': {
          display: 'none'
        },
        '&.MuiInput-underline::after': {
          display: 'none'
        },
        '&$error .MuiInputBase-input': {
          color: RedColor,
          borderColor: RedColor,
          '&:focus': {
            boxShadow: 'rgba(244, 67, 54, 0.25) 0 0 0 0.2rem'
          }
        },
        '&$multiline textarea': {
          padding: '10px 12px'
        }
      },
      input: {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #ced4da',
        background: palette.white,
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: defaultTheme.transitions.create(['border-color', 'box-shadow']),
        '&:focus:invalid': {
          boxShadow: `${fade(palette.blue.main, 0.25)} 0 0 0 0.2rem`
        },
        '&:focus': {
          boxShadow: `${fade(palette.blue.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: palette.blue.main
        }
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: palette.blue.main
      }
    },
    MuiButton: {
      contained: {
        color: palette.gray.dark4,
        backgroundColor: palette.white,
        textTransform: 'inherit',
        '&:hover': {
          backgroundColor: palette.white
        }
      },
      outlinedPrimary: {
        color: darken(palette.blue.main, 0.10),
        border: `1px solid ${darken(palette.blue.main, 0.10)}`
      }
    }
  }
};

export const theme = createMuiTheme(themeOptions);

export const generateClassName = createGenerateClassName({
  productionPrefix: 'craftercms-'
});
