import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'html': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'maxWidth': [{ 'unit': 'px', 'value': 640 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'minWidth': [{ 'unit': 'px', 'value': 320 }],
    'backgroundColor': '#f8f8f8',
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
    'backgroundColor': '#f8f8f8',
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
    'backgroundColor': '#f8f8f8',
    'position': 'relative',
    'marginTop': [{ 'unit': 'px', 'value': 50 }]
  },
  'main top_banner': {
    'backgroundColor': '#000',
    'height': [{ 'unit': 'rem', 'value': 2.67857 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'position': 'relative'
  },
  'main top': {
    'position': 'relative',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'backgroundColor': '#c58d5d',
    'height': [{ 'unit': 'rem', 'value': 7.28571 }]
  },
  'main top pic': {
    'background': 'url("../img/toux.png") no-repeat center',
    'width': [{ 'unit': 'rem', 'value': 3.92857 }],
    'height': [{ 'unit': 'rem', 'value': 4.03571 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'verticalAlign': 'middle',
    'position': 'relative',
    'top': [{ 'unit': 'rem', 'value': 1.64286 }],
    'backgroundSize': '3.92857rem 4.03571rem'
  },
  'main content': {
    'position': 'relative'
  },
  'main content group': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 3.03571 }],
    'display': 'block',
    'backgroundColor': '#fff',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.92857 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.92857 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 3.03571 }],
    'display': 'block',
    'paddingTop': [{ 'unit': 'rem', 'value': 0.71429 }],
    'color': '#212121',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#efefef' }]
  },
  'main content group icon': {
    'display': 'block',
    'float': 'left',
    'marginTop': [{ 'unit': 'rem', 'value': 0.17857 }]
  },
  'main content group iconzl': {
    'background': 'url("../img/t5.png") no-repeat center',
    'backgroundSize': '1.03571rem 1.17857rem',
    'width': [{ 'unit': 'rem', 'value': 1.03571 }],
    'height': [{ 'unit': 'rem', 'value': 1.17857 }],
    'display': 'block',
    'float': 'left',
    'marginTop': [{ 'unit': 'rem', 'value': 0.17857 }]
  },
  'main content group iconht': {
    'background': 'url("../img/t2.png") no-repeat center',
    'backgroundSize': '1.07143rem 1.17857rem',
    'width': [{ 'unit': 'rem', 'value': 1.07143 }],
    'height': [{ 'unit': 'rem', 'value': 1.17857 }]
  },
  'main content group iconyd': {
    'background': 'url("../img/t4.png") no-repeat center',
    'backgroundSize': '1.14286rem 1.14286rem',
    'width': [{ 'unit': 'rem', 'value': 1.14286 }],
    'height': [{ 'unit': 'rem', 'value': 1.14286 }]
  },
  'main content group iconyy': {
    'background': 'url("../img/t3.png") no-repeat center',
    'backgroundSize': '1.14286rem 1.14286rem',
    'width': [{ 'unit': 'rem', 'value': 1.14286 }],
    'height': [{ 'unit': 'rem', 'value': 1.14286 }]
  },
  'main content group iconsz': {
    'background': 'url("../img/t1.png") no-repeat center',
    'backgroundSize': '1.21429rem 1.21429rem',
    'width': [{ 'unit': 'rem', 'value': 1.21429 }],
    'height': [{ 'unit': 'rem', 'value': 1.21429 }]
  },
  'main content group p': {
    'display': 'block',
    'float': 'left',
    'color': '#7c7c7c'
  },
  'main content group pp_con': {
    'display': 'inline-block',
    'textAlign': 'right',
    'color': '#212121',
    'float': 'right'
  },
  'main content group arrow': {
    'background': 'url("../img/arrow.png") no-repeat center',
    'backgroundSize': '0.53571rem 0.92857rem',
    'width': [{ 'unit': 'rem', 'value': 0.53571 }],
    'height': [{ 'unit': 'rem', 'value': 0.92857 }],
    'display': 'block',
    'float': 'right',
    'lineHeight': [{ 'unit': 'rem', 'value': 3.03571 }],
    'marginTop': [{ 'unit': 'rem', 'value': 0.28571 }]
  },
  'main content group btn_col': {
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
  'main content group btn_vcol': {
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
  'main content group abtn_vcol:before': {
    'content': '""',
    'borderTop': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#dcdcdc' }],
    'width': [{ 'unit': 'rem', 'value': 4.67857 }],
    'height': [{ 'unit': 'px', 'value': 1 }],
    'display': 'inline-block',
    'marginRight': [{ 'unit': 'rem', 'value': 0.71429 }]
  },
  'main content group abtn_vcol:after': {
    'content': '""',
    'borderTop': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#dcdcdc' }],
    'width': [{ 'unit': 'rem', 'value': 4.67857 }],
    'height': [{ 'unit': 'px', 'value': 1 }],
    'display': 'inline-block',
    'marginLeft': [{ 'unit': 'rem', 'value': 0.71429 }]
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
