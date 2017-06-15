import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'html': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'maxWidth': [{ 'unit': 'px', 'value': 640 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'minWidth': [{ 'unit': 'px', 'value': 320 }],
    'screen&&>w320': {
      'fontSize': [{ 'unit': 'px', 'value': 14 }]
    },
    'screen&&>w360': {
      'fontSize': [{ 'unit': 'px', 'value': 16 }]
    },
    'screen&&>w400': {
      'fontSize': [{ 'unit': 'px', 'value': 18 }]
    },
    'screen&&>w440': {
      'fontSize': [{ 'unit': 'px', 'value': 20 }]
    },
    'screen&&>w480': {
      'fontSize': [{ 'unit': 'px', 'value': 22 }]
    },
    'screen&&>w640': {
      'fontSize': [{ 'unit': 'px', 'value': 28 }]
    }
  },
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'maxWidth': [{ 'unit': 'px', 'value': 640 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'minWidth': [{ 'unit': 'px', 'value': 320 }],
    'screen&&>w320': {
      'fontSize': [{ 'unit': 'px', 'value': 14 }]
    },
    'screen&&>w360': {
      'fontSize': [{ 'unit': 'px', 'value': 16 }]
    },
    'screen&&>w400': {
      'fontSize': [{ 'unit': 'px', 'value': 18 }]
    },
    'screen&&>w440': {
      'fontSize': [{ 'unit': 'px', 'value': 20 }]
    },
    'screen&&>w480': {
      'fontSize': [{ 'unit': 'px', 'value': 22 }]
    },
    'screen&&>w640': {
      'fontSize': [{ 'unit': 'px', 'value': 28 }]
    }
  },
  '*': {
    'fontFamily': '"PingFang SC", "Microsoft Yahei", "Droid Sans", Helvetica, Arial, sans-serif'
  },
  'main': {
    'position': 'relative',
    'marginTop': [{ 'unit': 'px', 'value': 50 }]
  },
  'main top': {
    'position': 'relative',
    'padding': [{ 'unit': 'rem', 'value': 3.5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 1.32143 }, { 'unit': 'px', 'value': 0 }]
  },
  'main top logo': {
    'background': 'url("../img/icon.png") no-repeat center',
    'width': [{ 'unit': 'rem', 'value': 5.46429 }],
    'height': [{ 'unit': 'rem', 'value': 5.64286 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'backgroundSize': '5.35714rem 5.85714rem'
  },
  'main content': {
    'position': 'relative',
    'marginTop': [{ 'unit': 'rem', 'value': 4.89286 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.89286 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.89286 }]
  },
  'main content container': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'marginBottom': [{ 'unit': 'rem', 'value': 1.07143 }],
    'display': 'block'
  },
  'main content containerchecknum': {
    'display': 'block',
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'float': 'left'
  },
  'main content containerchecknum input': {
    'width': [{ 'unit': 'rem', 'value': 12.64286 }],
    'display': 'block',
    'float': 'left'
  },
  'main content containerchecknum divtimenum': {
    'display': 'inline-block',
    'width': [{ 'unit': 'rem', 'value': 6.42857 }],
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'marginLeft': [{ 'unit': 'rem', 'value': 0.78571 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#212121' }],
    'borderRadius': '5px 5px',
    'float': 'right',
    'marginTop': [{ 'unit': 'rem', 'value': 0.07143 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 2.5 }],
    'textAlign': 'center',
    'color': '#3b3b3b',
    'fontSize': [{ 'unit': 'rem', 'value': 0.92857 }]
  },
  'main content container btn_col': {
    'display': 'inline-block',
    'marginTop': [{ 'unit': 'rem', 'value': 1.78571 }],
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.92857 }],
    'backgroundColor': '#c58d5d',
    'color': '#fff',
    'paddingLeft': [{ 'unit': 'rem', 'value': 0.78571 }],
    'borderRadius': '5px 5px',
    'textAlign': 'center',
    'lineHeight': [{ 'unit': 'rem', 'value': 2.5 }]
  },
  'main content container btn_vcol': {
    'display': 'inline-block',
    'marginTop': [{ 'unit': 'rem', 'value': 1.78571 }],
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.92857 }],
    'color': '#9b9b9b',
    'paddingLeft': [{ 'unit': 'rem', 'value': 0.78571 }],
    'borderRadius': '5px 5px',
    'textAlign': 'center',
    'lineHeight': [{ 'unit': 'rem', 'value': 2.5 }]
  },
  'main content container abtn_vcol:before': {
    'content': '""',
    'borderTop': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#dcdcdc' }],
    'width': [{ 'unit': 'rem', 'value': 4.67857 }],
    'height': [{ 'unit': 'px', 'value': 1 }],
    'display': 'inline-block',
    'marginRight': [{ 'unit': 'rem', 'value': 0.71429 }]
  },
  'main content container abtn_vcol:after': {
    'content': '""',
    'borderTop': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#dcdcdc' }],
    'width': [{ 'unit': 'rem', 'value': 4.67857 }],
    'height': [{ 'unit': 'px', 'value': 1 }],
    'display': 'inline-block',
    'marginLeft': [{ 'unit': 'rem', 'value': 0.71429 }]
  },
  'main content container input': {
    'marginTop': [{ 'unit': 'rem', 'value': 0.07143 }],
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'rem', 'value': 0.92857 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e6e6e6' }],
    'paddingLeft': [{ 'unit': 'rem', 'value': 0.78571 }],
    'borderRadius': '5px 5px'
  },
  '::-webkit-input-placeholder': {
    'color': '#c5c5c5'
  },
  '::-moz-placeholder': {
    'color': '#c5c5c5'
  },
  ':-moz-placeholder': {
    'color': '#c5c5c5'
  }
});
