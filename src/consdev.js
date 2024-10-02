(function(global) {

'use strict';

var rattributes = new RegExp('(?:(fg)\s*=\s*(?:#|rgb)*([^\s;]+)\s*;|(bg)\s*=\s*(?:#|rgb)*([^\s;]+)\s*;|'+
  // [align=right|left|center] [padding=n] [width=]
  // (capture: 3) (capture: 4) (capture: 5)
  '(align)\s*=\s*(left|right|center)\s*;|(padding)\s*=\s*([\\d]+)\s*;|(width)\s*=\s*([\\d]+)\s*;*)','g');

var rformatter = /<(?:([\w-]+)|([^>]+))>((?:.|[\r\n])*)?<(?:\/(\1)|\/)>/g;
var rspecifier = /%(?:(-)?(\d+)?([sdiufFcpxXoeE]))/gm;
var CRLF       = /[\r\n]/g;

var _default = {bg: '9932cc', fg: 'f1ecec', padding: 1, width: 8};
var arr      = [];
var slice    = arr.slice;
var push     = arr.push;
var isArray  = Array.isArray;
//
var styles = {
  warning: {bg: 'ffffff', fg: '5fd126', padding: 0, align: 'start', width: 'auto'},
  success: {bg: 'ffffff', fg: '049904', padding: 0, align: 'start', width: 'auto'},
  danger: {bg: 'ffffff', fg: 'f11111', padding: 0, align: 'start', width: 'auto'},
  error: {bg: 'ffffff', fg: 'f11111', padding: 0, align: 'start', width: 'auto'},
  comment: {bg: 'ffffff', fg: 'c6a200', padding: 0, align: 'start', width: 'auto'},
  info: {bg: 'ffffff', fg: '0451a5', padding: 0, align: 'start', width: 'auto'},
  question: {bg: 'ffffff', fg: '5fd126', padding: 0, align: 'start', width: 'auto'},
  note: {bg: 'ffffff', fg: '27403c', padding: 0, align: 'start', width: 'auto'},
  multicomment: {bg: 'ffffff', fg: '', padding: 0, align: 'start', width: 'auto'},
};

var colors = {
  aliceblue: {bg: 'f0f8ff', fg: '228b22',},
  antiquewhite: {bg: 'faebd7', fg: '228b22',},
  aqua: {bg: '00ffff', fg: '228b22',},
  aquamarine: {bg: '7fffd4', fg: '228b22',},
  azure: {bg: 'f0ffff', fg: '228b22',},
  beige: {bg: 'f5f5dc', fg: '228b22',},
  bisque: {bg: 'ffe4c4', fg: '228b22',},
  black: {bg: '000000', fg: 'e3dcdc',},
  blanchedalmond: {bg: 'ffebcd', fg: '228b22',},
  blue: {bg: '0000ff', fg: 'e3dcdc',},
  blueviolet: {bg: '8a2be2', fg: 'e3dcdc',},
  brown: {bg: 'a52a2a', fg: 'e3dcdc',},
  burlywood: {bg: 'deb887', fg: 'e3dcdc',},
  cadetblue: {bg: '5f9ea0', fg: 'e3dcdc',},
  chartreuse: {bg: '7fff00', fg: 'e3dcdc',},
  chocolate: {bg: 'd2691e', fg: 'e3dcdc',},
  coral: {bg: 'ff7f50', fg: 'e3dcdc',},
  cornflowerblue: {bg: '6495ed', fg: 'e3dcdc',},
  cornsilk: {bg: 'fff8dc', fg: '228b22',},
  crimson: {bg: 'dc143c', fg: 'e3dcdc',},
  cyan: {bg: '00ffff', fg: '228b22',},
  darkblue: {bg: '00008b', fg: 'e3dcdc',},
  darkcyan: {bg: '008b8b', fg: 'e3dcdc',},
  darkgoldenrod: {bg: 'b8860b', fg: 'e3dcdc',},
  darkgray: {bg: 'a9a9a9', fg: 'e3dcdc',},
  darkgreen: {bg: '006400', fg: 'e3dcdc',},
  darkgrey: {bg: 'a9a9a9', fg: 'e3dcdc',},
  darkkhaki: {bg: 'bdb76b', fg: 'e3dcdc',},
  darkmagenta: {bg: '8b008b', fg: 'e3dcdc',},
  darkolivegreen: {bg: '556b2f', fg: 'e3dcdc',},
  darkorange: {bg: 'ff8c00', fg: 'e3dcdc',},
  darkorchid: {bg: '9932cc', fg: 'e3dcdc',},
  darkred: {bg: '8b0000', fg: 'e3dcdc',},
  darksalmon: {bg: 'e9967a', fg: 'e3dcdc',},
  darkseagreen: {bg: '8fbc8f', fg: 'e3dcdc',},
  darkslateblue: {bg: '483d8b', fg: 'e3dcdc',},
  darkslategray: {bg: '2f4f4f', fg: 'e3dcdc',},
  darkslategrey: {bg: '2f4f4f', fg: 'e3dcdc',},
  darkturquoise: {bg: '00ced1', fg: 'e3dcdc',},
  darkviolet: {bg: '9400d3', fg: 'e3dcdc',},
  deeppink: {bg: 'ff1493', fg: 'e3dcdc',},
  deepskyblue: {bg: '00bfff', fg: 'e3dcdc',},
  dimgray: {bg: '696969', fg: 'e3dcdc',},
  dimgrey: {bg: '696969', fg: 'e3dcdc',},
  dodgerblue: {bg: '1e90ff', fg: 'e3dcdc',},
  firebrick: {bg: 'b22222', fg: 'e3dcdc',},
  floralwhite: {bg: 'fffaf0', fg: '228b22',},
  forestgreen: {bg: '228b22', fg: 'e3dcdc',},
  fuchsia: {bg: 'ff00ff', fg: 'e3dcdc',},
  gainsboro: {bg: 'dcdcdc', fg: 'e3dcdc',},
  ghostwhite: {bg: 'f8f8ff', fg: '228b22',},
  gold: {bg: 'ffd700', fg: 'e3dcdc',},
  goldenrod: {bg: 'daa520', fg: 'e3dcdc',},
  gray: {bg: '808080', fg: 'e3dcdc',},
  green: {bg: '008000', fg: 'e3dcdc',},
  greenyellow: {bg: 'adff2f', fg: 'e3dcdc',},
  grey: {bg: '808080', fg: 'e3dcdc',},
  honeydew: {bg: 'f0fff0', fg: '228b22',},
  hotpink: {bg: 'ff69b4', fg: 'e3dcdc',},
  indianred: {bg: 'cd5c5c', fg: 'e3dcdc',},
  indigo: {bg: '4b0082', fg: 'e3dcdc',},
  ivory: {bg: 'fffff0', fg: '228b22',},
  khaki: {bg: 'f0e68c', fg: 'e3dcdc',},
  lavender: {bg: 'e6e6fa', fg: '228b22',},
  lavenderblush: {bg: 'fff0f5', fg: '228b22',},
  lawngreen: {bg: '7cfc00', fg: 'e3dcdc',},
  lemonchiffon: {bg: 'fffacd', fg: '228b22',},
  lightblue: {bg: 'add8e6', fg: 'e3dcdc',},
  lightcoral: {bg: 'f08080', fg: 'e3dcdc',},
  lightcyan: {bg: 'e0ffff', fg: '228b22',},
  lightgoldenrodyellow: {bg: 'fafad2', fg: '228b22',},
  lightgray: {bg: 'd3d3d3', fg: 'e3dcdc',},
  lightgrey: {bg: 'd3d3d3', fg: 'e3dcdc',},
  lightgreen: {bg: '90ee90', fg: 'e3dcdc',},
  lightpink: {bg: 'ffb6c1', fg: 'e3dcdc',},
  lightsalmon: {bg: 'ffa07a', fg: 'e3dcdc',},
  lightseagreen: {bg: '20b2aa', fg: 'e3dcdc',},
  lightskyblue: {bg: '87cefa', fg: 'e3dcdc',},
  lightslategray: {bg: '778899', fg: 'e3dcdc',},
  lightslategrey: {bg: '778899', fg: 'e3dcdc',},
  lightsteelblue: {bg: 'b0c4de', fg: 'e3dcdc',},
  lightyellow: {bg: 'ffffe0', fg: '228b22',},
  lime: {bg: '00ff00', fg: 'e3dcdc',},
  limegreen: {bg: '32cd32', fg: 'e3dcdc',},
  linen: {bg: 'faf0e6', fg: '228b22',},
  magenta: {bg: 'ff00ff', fg: 'e3dcdc',},
  maroon: {bg: '800000', fg: 'e3dcdc',},
  mediumaquamarine: {bg: '66cdaa', fg: 'e3dcdc',},
  mediumblue: {bg: '0000cd', fg: 'e3dcdc',},
  mediumorchid: {bg: 'ba55d3', fg: 'e3dcdc',},
  mediumpurple: {bg: '9370d8', fg: 'e3dcdc',},
  mediumseagreen: {bg: '3cb371', fg: 'e3dcdc',},
  mediumslateblue: {bg: '7b68ee', fg: 'e3dcdc',},
  mediumspringgreen: {bg: '00fa9a', fg: 'e3dcdc',},
  mediumturquoise: {bg: '48d1cc', fg: 'e3dcdc',},
  mediumvioletred: {bg: 'c71585', fg: 'e3dcdc',},
  midnightblue: {bg: '191970', fg: 'e3dcdc',},
  mintcream: {bg: 'f5fffa', fg: '228b22',},
  mistyrose: {bg: 'ffe4e1', fg: 'e3dcdc',},
  moccasin: {bg: 'ffe4b5', fg: 'e3dcdc',},
  navajowhite: {bg: 'ffdead', fg: 'e3dcdc',},
  navy: {bg: '000080', fg: 'e3dcdc',},
  oldlace: {bg: 'fdf5e6', fg: '228b22',},
  olive: {bg: '808000', fg: 'e3dcdc',},
  olivedrab: {bg: '6b8e23', fg: 'e3dcdc',},
  orange: {bg: 'ffa500', fg: 'e3dcdc',},
  orangered: {bg: 'ff4500', fg: 'e3dcdc',},
  orchid: {bg: 'da70d6', fg: 'e3dcdc',},
  palegoldenrod: {bg: 'eee8aa', fg: 'e3dcdc',},
  palegreen: {bg: '98fb98', fg: 'e3dcdc',},
  paleturquoise: {bg: 'afeeee', fg: 'e3dcdc',},
  palevioletred: {bg: 'd87093', fg: 'e3dcdc',},
  papayawhip: {bg: 'ffefd5', fg: 'e3dcdc',},
  peachpuff: {bg: 'ffdab9', fg: 'e3dcdc',},
  peru: {bg: 'cd853f', fg: 'e3dcdc',},
  pink: {bg: 'ffc0cb', fg: 'e3dcdc',},
  plum: {bg: 'dda0dd', fg: 'e3dcdc',},
  powderblue: {bg: 'b0e0e6', fg: 'e3dcdc',},
  purple: {bg: '800080', fg: 'e3dcdc',},
  rebeccapurple: {bg: '663399', fg: 'e3dcdc',},
  red: {bg: 'ff0000', fg: 'e3dcdc',},
  rosybrown: {bg: 'bc8f8f', fg: 'e3dcdc',},
  royalblue: {bg: '4169e1', fg: 'e3dcdc',},
  saddlebrown: {bg: '8b4513', fg: 'e3dcdc',},
  salmon: {bg: 'fa8072', fg: 'e3dcdc',},
  sandybrown: {bg: 'f4a460', fg: 'e3dcdc',},
  seagreen: {bg: '2e8b57', fg: 'e3dcdc',},
  seashell: {bg: 'fff5ee', fg: '228b22',},
  sienna: {bg: 'a0522d', fg: 'e3dcdc',},
  silver: {bg: 'c0c0c0', fg: 'e3dcdc',},
  skyblue: {bg: '87ceeb', fg: 'e3dcdc',},
  slateblue: {bg: '6a5acd', fg: 'e3dcdc',},
  slategray: {bg: '708090', fg: 'e3dcdc',},
  slategrey: {bg: '708090', fg: 'e3dcdc',},
  snow: {bg: 'fffafa', fg: '228b22',},
  springgreen: {bg: '00ff7f', fg: 'e3dcdc',},
  steelblue: {bg: '4682b4', fg: 'e3dcdc',},
  tan: {bg: 'd2b48c', fg: 'e3dcdc',},
  teal: {bg: '008080', fg: 'e3dcdc',},
  thistle: {bg: 'd8bfd8', fg: 'e3dcdc',},
  tomato: {bg: 'ff6347', fg: 'e3dcdc',},
  turquoise: {bg: '40e0d0', fg: 'e3dcdc',},
  violet: {bg: 'ee82ee', fg: 'e3dcdc',},
  wheat: {bg: 'f5deb3', fg: 'e3dcdc',},
  white: {bg: 'ffffff', fg: '228b22',},
  whitesmoke: {bg: 'f5f5f5', fg: '228b22',},
  yellow: {bg: 'ffff00', fg: 'e3dcdc',},
  yellowgreen: {bg: '9acd32', fg: 'e3dcdc'}
};

var themes = {
  success: {bg: '049904', fg: 'bcc9c2', padding: 'auto', align: 'center', width: 'auto', bold: true},
  error: {bg: 'f11111', fg: 'bcc9c2', padding: 'auto', align: 'center', width: 'auto', bold: true},
  note: {bg: '27403c', fg: 'bcc9c2', padding: 'auto', align: 'center', width: 'auto', bold: true},
  info: {bg: '0451a5', fg: 'bcc9c2', padding: 'auto', align: 'center', width: 'auto', bold: true},
  warning: {bg: '5fd126', fg: 'bcc9c2', padding: 'auto', align: 'center', width: 'auto', bold: true},
  suggest: {bg: '100e1a', fg: 'bcc9c2', padding: 'auto', align: 'center', width: 'auto', bold: true}
};

/**
 * 
 */
function Consdev(data) {
  return !(this instanceof Consdev) ? new Consdev(data) : this;
}

/**
 * Internal Use Only
 * 
 * @param {Boolean} isLeftAlign true for left-align otherwise right-align
 * @param {Number}  charWidth The minimum characters width of the output
 * @param {Mixed}   value An mixed value LIKE `(ex: string, int, float)`
 * @returns The padded string
 */
function setPad(isLeftAlign, charWidth, value) {
  var output = '\x20'.repeat(charWidth);
  return isLeftAlign ? value + output : output + value;
}


/**
 * 
 * @param {String} value 
 */
function toANSI(value) {
  var toRGBSource = function(value) {
    var i = 0, length = value.length, values = [];
    for(; i < length; i+=2) {

      // Convert and push grouped value with converted decimal format.
      push.call(values, parseInt(value.substring(i, i + 2), 16));
    }

    return values;
  };

  value = isArray(value) ? value : toRGBSource(value);
  return value.join(';').concat('m');
}

/**
 * 
 * @param {Object} source 
 */
function finalSetup(source) {
  filterAndConfigure(source);
  var pad, output = [], vw, margin = 0, line,
    width = source.width - source.maxLength,
    isCenter = false,
    split = function(value) {
      return {center: value / 2};
    },
    align = {
      center: false,
      left: true,
      right: false
    },
    setPadding = function (line) {
      pad = '\x20'.repeat(source.padding);
      return pad + line + pad;
    };

  source.lines = ellipsis(source.lines, source.width, function(curLine) {
    line = setPadding(curLine);
    vw   = parseInt(split(width)[source.align] || width);

    if (source.maxLength > curLine.length) {
      margin = source.maxLength - curLine.length;
    }

    if (source.align in split()) {
      isCenter = true;
      line = setPad(true, vw + margin, line);
    }

    if (vw > 0) {
      line = setPad(align[source.align], !isCenter ? vw + margin : vw, line);
    }

    push.call(output, source.ansi + line + '\u{200B}' + source.reset);
  });

  return output.join('\n');
}

function ellipsis(lines, end, callback) {
  var i = 0, line, length = lines.length, newLines = [];

  for(; i < length; i++) {
    line = lines[i].trim();
    line = line.length > end ? line.substring(0, end) + '...' : line;
    callback(line, end);
    push.call(newLines, line);
  }

  return newLines;
}

function getMaxLen(lines) {
  var i = 0, max = lines[0].trim().length, length = lines.length;

  for(; i < length; i++) {
    if (max < lines[i].length) {
      max = lines[i].trim().length;
    }
  }
  return max;
}

/**
 * 
 * @param {Object} source 
 */
function filterAndConfigure(source) {
  source.fg = colors[source.fg] ? colors[source.fg].fg : source.fg;
  source.bg = colors[source.bg] ? colors[source.bg].bg : source.bg;

  source.lines = (source.text + '').split(CRLF);
  source.maxLength = getMaxLen(source.lines);
  source.isMultiLine = source.lines.length > 1;
  if (!('width' in source)) {
    source.width = source.maxLength;
  }
  source.width   = source.width === 'auto' ? source.maxLength : parseInt(source.width) || _default.width;
  source.padding = source.padding === 'auto' ? _default.padding : parseInt(source.padding) ?? _default.padding;

  delete source.text;

  source.bg = toANSI(source.bg === 'default' ? _default.bg : source.bg);
  source.fg = toANSI(source.fg === 'default' ? _default.fg : source.fg);

  source.ansi = '\x1b[48;2;' + source.bg + '\x1b[38;2;' + source.fg;

  delete source.bg;
  delete source.fg;

  source.reset = '\x1b[0m';

  if (source.bold) {
    source.ansi = '\x1b[1m' + source.ansi;
  }

  if (source.width < _default.padding) {
    throw new Error("Invlalid width '" + source.width + "' set minimum width: '" + _default.width + "'.");
  }

  return source;
}

/**
 * 
 * @param {String} format 
 */
function makeFormat(format) {
  var i, source, args, length;
  format = format.replace(rformatter, function(_, tag, attr, value) {
    if (tag in styles) {
      source = styles[tag.toLowerCase()];
      source.text = value;
      return finalSetup(source);
    } else {
      source = {text: value};
      attr.replace(rattributes, function() {
        args = slice.call(arguments, 1, -2);
        i = 0;
        length = args.length;
        for(; i < length; i+=2) {
          if (args[i]) {
            source[args[i]] = colors[args[i + 1]] ? colors[args[i + 1]][args[i]] : args[i + 1];
          }
        }
      });
      return finalSetup(source);
    }
  });

  return format;
}

/**
 * 
 * @param {String} format 
 * @param {String} type 
 * @param {Array}  values 
 * 
 * @returns Consdev {}
 */
function write(format, values, type) {
  this.print(!!type ? formatWithType(format, type) : makeFormat(format), values);
  return this;
}

/**
 * 
 * @param {String} format 
 * @param {String} type 
 * @returns 
 */
function formatWithType(format, type) {
  var source, format = [makeFormat(format)];
  
  source      = themes[type.toLowerCase()];
  source.text = type.toUpperCase();

  arr.unshift.call(format, finalSetup(source));
  return format.join('\x20');
}

/**
 * Internal Use Only
 * 
 * @param {String} specifier 
 * @param {Mixed}  value
 */
function formatSpecifier(specifier, value) {
  return this;
}

/**
 * Internal Use Only
 * 
 * 
 * @param {String} name 
 * @param {String} bg 
 * @param {String} fg 
 * @param {Number} padding 
 * @param {String} align
 * @param {Number} width 
 * 
 * @returns Consdev {}
 */
function setStyle(name, bg, fg, padding, align, width) {
  if (name in styles) {
    throw new Error("Style '" + name + "' already exists.");
  }

  styles[name] = {bg, fg, padding, align, width};
  
  return this;
}

/*
*/
Consdev.prototype = {
  constructor: Consdev,
  VERSION: '1.0.0'
};

Object.assign(Consdev.prototype, {
  /**
   * Output console set cursor position to current line
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        format  [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns string formated-text
   */
  print: function(format, values) {
    var i = 0, console;

    console = typeof module === 'object' ? require('console') : global.console;

    format = format.replace(/%(%)/g, '$1')
      .replace(rspecifier, function (_, leftAlign, charWidth, specifier) {
        return setPad(!!leftAlign, charWidth, formatSpecifier(specifier, values[i++]));
      }), console.log(format);

    return this;
  }
});

Object.assign(Consdev.prototype, {


  write: function(format, values) {
    return write.call(this, format, values);
  }
});

Object.assign(Consdev.prototype, {

  
  setStyle: function(name, bg, fg, padding, align, width) {
    return setStyle.call(this, name, bg, fg, padding, align, width);
  }
});

Object.assign(Consdev.prototype, {

  /**
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        message [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns
   */
  success: function(message, _values) {
    return write.call(this, message, slice.call(arguments, 1), 'SUCCESS');
  },

  /**
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        message [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns
   */
  error: function(message) {
    return write.call(this, message, slice.call(arguments, 1), 'ERROR');
  },

  /**
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        message [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns
   */
  note: function(message) {
    return write.call(this, message, slice.call(arguments, 1), 'NOTE');
  },

  /**
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        message [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns
   */
  info: function(message) {
    return write.call(this, message, slice.call(arguments, 1), 'INFO');
  },

  /**
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        message [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns
   */
  warning: function(message) {
    return write.call(this, message, slice.call(arguments, 1), 'WARNING');
  },

  /**
   * The format string is composed of zero or more directives:ordinary characters (excluding %)
   * that are copied directly to the result, and conversion specifications, each of
   * which results in fetching its own parameter. This applies to both sprintf and printf.
   * 
   * @param {String}        message [required]
   * @param {String|Number} values  [optional]
   * 
   * @returns
   */
  suggest: function(message) {
    return write.call(this, message, slice.call(arguments, 1), 'SUGGEST');
  }
});


(typeof define === 'function' && define.amd) ? define(function () {
  return Consdev;
}) : (typeof module === 'object' && module.exports ? module.exports = Consdev : global.Consdev = Consdev);

})(this);