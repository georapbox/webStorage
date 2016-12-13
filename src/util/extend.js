export default function _obj_extend() {
  for (var i = 1, l = arguments.length; i < l; i++) {
    for (var key in arguments[i]) {
      if ({}.hasOwnProperty.call(arguments[i], key)) {
        if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
          arguments[0][key] = arguments[0][key] || {};
          _obj_extend(arguments[0][key], arguments[i][key]);
        } else {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
  }
  return arguments[0];
}
