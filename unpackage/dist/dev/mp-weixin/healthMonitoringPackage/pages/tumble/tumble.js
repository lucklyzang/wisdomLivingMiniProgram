require('../../common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["healthMonitoringPackage/pages/tumble/tumble"],{

/***/ 179:
/*!************************************************************************************************************!*\
  !*** D:/工作项目/wisdomLivingMiniProgram/main.js?{"page":"healthMonitoringPackage%2Fpages%2Ftumble%2Ftumble"} ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _tumble = _interopRequireDefault(__webpack_require__(/*! ./healthMonitoringPackage/pages/tumble/tumble.vue */ 180));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_tumble.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 180:
/*!***************************************************************************************!*\
  !*** D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tumble.vue?vue&type=template&id=20d3c5b9& */ 181);
/* harmony import */ var _tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tumble.vue?vue&type=script&lang=js& */ 183);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tumble.vue?vue&type=style&index=0&lang=scss& */ 185);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 57);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "healthMonitoringPackage/pages/tumble/tumble.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 181:
/*!**********************************************************************************************************************!*\
  !*** D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue?vue&type=template&id=20d3c5b9& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tumble.vue?vue&type=template&id=20d3c5b9& */ 182);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_template_id_20d3c5b9___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 182:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue?vue&type=template&id=20d3c5b9& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uToast: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-toast/u-toast */ "node-modules/uview-ui/components/u-toast/u-toast").then(__webpack_require__.bind(null, /*! uview-ui/components/u-toast/u-toast.vue */ 687))
    },
    uSubsection: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-subsection/u-subsection */ "node-modules/uview-ui/components/u-subsection/u-subsection").then(__webpack_require__.bind(null, /*! uview-ui/components/u-subsection/u-subsection.vue */ 810))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-icon/u-icon */ "node-modules/uview-ui/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! uview-ui/components/u-icon/u-icon.vue */ 680))
    },
    uEmpty: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-empty/u-empty */ "node-modules/uview-ui/components/u-empty/u-empty").then(__webpack_require__.bind(null, /*! uview-ui/components/u-empty/u-empty.vue */ 761))
    },
    qiunDataCharts: function () {
      return Promise.all(/*! import() | uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts")]).then(__webpack_require__.bind(null, /*! @/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue */ 768))
    },
    uLoadmore: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-loadmore/u-loadmore */ "node-modules/uview-ui/components/u-loadmore/u-loadmore").then(__webpack_require__.bind(null, /*! uview-ui/components/u-loadmore/u-loadmore.vue */ 817))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 =
    _vm.currentItem == 0 ? _vm.getNowFormatDateText(_vm.currentDayTime) : null
  var m1 = _vm.currentItem == 0 ? _vm.judgeWeek(_vm.currentDayTime) : null
  var m2 =
    _vm.currentItem == 1
      ? _vm.getNowFormatDateText(_vm.currentStartWeekDate)
      : null
  var m3 =
    _vm.currentItem == 1
      ? _vm.getNowFormatDateText(_vm.currentEndWeekDate)
      : null
  var m4 =
    _vm.currentItem == 2
      ? _vm.getNowFormatDateText(_vm.currentMonthDate, 2)
      : null
  var l0 = _vm.__map(_vm.fullRecordList, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var m5 = _vm.getNowFormatDate(new Date(item.fallTime), 1)
    var g0 = item.hasOwnProperty("upTime") && item.upTime
    var g1 = g0 ? Math.ceil(_vm.msToMinutes(item.upTime - item.fallTime)) : null
    return {
      $orig: $orig,
      m5: m5,
      g0: g0,
      g1: g1,
    }
  })
  var g2 = _vm.fullRecordList.length
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
        m4: m4,
        l0: l0,
        g2: g2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 183:
/*!****************************************************************************************************************!*\
  !*** D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tumble.vue?vue&type=script&lang=js& */ 184);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 184:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 30);
var _user = __webpack_require__(/*! @/api/user.js */ 31);
var _device = __webpack_require__(/*! @/api/device.js */ 106);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var navBar = function navBar() {
  __webpack_require__.e(/*! require.ensure | components/zhouWei-navBar/index */ "components/zhouWei-navBar/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/zhouWei-navBar */ 803));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    navBar: navBar
  },
  data: function data() {
    var _ref;
    return _ref = {
      infoText: '',
      showLoadingHint: false,
      daytimeNapIconPng: __webpack_require__(/*! @/static/img/daytime-nap-icon.png */ 160),
      tumbleIconPng: __webpack_require__(/*! @/static/img/tumble-icon.png */ 112),
      itemList: [{
        name: '日'
      }, {
        name: '周'
      }, {
        name: '月'
      }],
      tumbleOpts: {
        padding: [10, 4, 10, 4],
        dataLabel: false,
        legend: {
          show: false
        },
        xAxis: {
          disabled: true,
          disableGrid: true
        },
        yAxis: {
          disabled: true,
          disableGrid: true
        },
        extra: {
          bar: {
            type: 'stack',
            width: 20
          }
        }
      },
      leaveHomeWeekOpts: {
        color: ["#F0F0F0"],
        dataLabel: false,
        padding: [10, 10, 0, 10],
        enableScroll: true,
        legend: {
          show: false
        },
        xAxis: {
          itemCount: 7
        },
        yAxis: {
          splitNumber: 5,
          data: [{
            format: 'yAxisDemoMix'
          }]
        },
        extra: {
          column: {
            type: 'stack',
            width: 20,
            categoryGap: 2
          },
          tooltip: {
            showBox: false
          }
        }
      },
      leaveHomeMonthOpts: {
        dataLabel: false,
        padding: [10, 10, 0, 10],
        enableScroll: true,
        legend: {
          show: false
        },
        xAxis: {
          scrollShow: true,
          itemCount: 7
        },
        yAxis: {
          splitNumber: 5,
          data: [{
            format: 'yAxisDemoMix'
          }]
        },
        extra: {
          column: {
            type: 'stack',
            width: 20,
            categoryGap: 2
          },
          tooltip: {
            showBox: false
          }
        }
      },
      currentWeekXaxisArr: [],
      currentMonthXaxisArr: [],
      currentItem: 0,
      isDayPlusCanCilck: true,
      isMonthPlusCanCilck: true,
      isWeekPlusCanCilck: true,
      currentDayTime: '',
      initDayTime: '',
      currentStartWeekDate: '',
      currentEndWeekDate: '',
      initWeekDate: '',
      currentWeekDate: '',
      currentMonthDate: ''
    }, (0, _defineProperty2.default)(_ref, "currentMonthDate", ''), (0, _defineProperty2.default)(_ref, "currentMonthDays", ''), (0, _defineProperty2.default)(_ref, "initMonthDate", ''), (0, _defineProperty2.default)(_ref, "weekMap", {}), (0, _defineProperty2.default)(_ref, "temporaryDevices", []), (0, _defineProperty2.default)(_ref, "visitPageId", ''), (0, _defineProperty2.default)(_ref, "dayChartData", {
      isShow: true,
      noData: false,
      data: {}
    }), (0, _defineProperty2.default)(_ref, "weekChartData", {
      isShow: true,
      noData: false,
      data: {}
    }), (0, _defineProperty2.default)(_ref, "monthChartData", {
      isShow: true,
      noData: false,
      data: {}
    }), (0, _defineProperty2.default)(_ref, "currentPageNum", 1), (0, _defineProperty2.default)(_ref, "pageSize", 20), (0, _defineProperty2.default)(_ref, "totalCount", 0), (0, _defineProperty2.default)(_ref, "status", 'nomore'), (0, _defineProperty2.default)(_ref, "isShowNoHomeNoData", false), (0, _defineProperty2.default)(_ref, "fullRecordList", []), (0, _defineProperty2.default)(_ref, "recordList", []), _ref;
  },
  onLoad: function onLoad() {
    this.createVisitPage();
    this.initDayTime = this.getNowFormatDate(new Date(), 1);
    this.currentDayTime = this.getNowFormatDate(new Date(), 2);
    var temporaryDate = this.getNowFormatDate(new Date(), 2);
    if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) {
      this.isDayPlusCanCilck = false;
    }
    ;
    // 获取跌倒数据日
    this.temporaryDevices = [];
    var _iterator = _createForOfIteratorHelper(this.deviceDataMessage.devices),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        this.temporaryDevices.push(el.device);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    ;
    this.queryTumbleDetails({
      deviceIds: this.temporaryDevices,
      startDate: this.getNowFormatDate(new Date(), 2),
      endDate: this.getNowFormatDate(new Date(), 2)
    }, 'day');

    // 获取跌倒日数据列表详情
    this.queryGetTumbleListDetails({
      pageNo: this.currentPageNum,
      pageSize: this.pageSize,
      deviceIds: this.temporaryDevices,
      date: this.getNowFormatDate(new Date(), 2)
    }, true, false);
  },
  onShow: function onShow() {
    var _this = this;
    uni.$on('update', function (object) {
      _this.createVisitPage();
    });
  },
  onUnload: function onUnload() {
    if (!this.visitPageId && this.visitPageId !== 0) {
      return;
    }
    ;
    this.exitPage();
  },
  destroyed: function destroyed() {
    if (!this.visitPageId && this.visitPageId !== 0) {
      return;
    }
    ;
    this.exitPage();
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapGetters)(['userInfo', 'deviceDataMessage'])), {}, {
    userName: function userName() {},
    proId: function proId() {},
    proName: function proName() {},
    workerId: function workerId() {},
    depName: function depName() {},
    accountName: function accountName() {}
  }),
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)(['changeOverDueWay'])), {}, {
    // 创建页面访问数据
    createVisitPage: function createVisitPage() {
      var _this2 = this;
      (0, _user.createVisitPageData)({
        pageName: "健康-跌倒详情(日周月)",
        pageKey: "tumble"
      }).then(function (res) {
        if (res && res.data.code == 0) {
          _this2.visitPageId = res.data.data;
        }
      }).catch(function (err) {});
    },
    // 退出页面数据
    exitPage: function exitPage() {
      (0, _user.exitPageData)(this.visitPageId).then(function (res) {
        if (res && res.data.code == 0) {}
      }).catch(function (err) {});
    },
    // 获取周数据当前点击索引
    getWeekIndexEvent: function getWeekIndexEvent(e) {
      if (e.currentIndex['index'] == -1) {
        return;
      }
      ;
      this.initWeekDate = this.getNowFormatDateText(this.currentWeekXaxisArr[e.currentIndex['index']]);
      this.currentWeekDate = this.getNowFormatDate(new Date(this.currentWeekXaxisArr[e.currentIndex['index']]), 2);
      // 获取跌倒数据详情列表
      this.queryGetTumbleListDetails({
        pageNo: this.currentPageNum,
        pageSize: this.pageSize,
        deviceIds: this.temporaryDevices,
        date: this.currentWeekDate
      }, false, true);
    },
    // 获取月数据当前点击索引
    getMonthIndexEvent: function getMonthIndexEvent(e) {
      if (e.currentIndex['index'] == -1) {
        return;
      }
      ;
      this.initMonthDate = this.getNowFormatDateText(this.currentMonthXaxisArr[e.currentIndex['index']]);
      this.currentMonthDate = this.getNowFormatDate(new Date(this.currentMonthXaxisArr[e.currentIndex['index']]), 2);
      // 获取跌倒数据详情列表
      this.queryGetTumbleListDetails({
        pageNo: this.currentPageNum,
        pageSize: this.pageSize,
        deviceIds: this.temporaryDevices,
        date: this.currentMonthDate
      }, false, true);
    },
    // 获取跌倒数据详情列表
    queryGetTumbleListDetails: function queryGetTumbleListDetails(data, flag, isInit) {
      var _this3 = this;
      this.recordList = [];
      if (isInit) {
        this.isShowNoHomeNoData = false;
        data.pageNo = 1;
        this.fullRecordList = [];
      }
      ;
      if (flag) {
        this.showLoadingHint = true;
      } else {
        this.showLoadingHint = false;
        this.status = 'loading';
      }
      ;
      (0, _device.getTumbleListDetails)(data).then(function (res) {
        if (res && res.data.code == 0) {
          _this3.totalCount = res.data.data.total;
          _this3.recordList = res.data.data.list;
          _this3.fullRecordList = _this3.fullRecordList.concat(_this3.recordList);
          if (_this3.fullRecordList.length == 0) {
            _this3.isShowNoHomeNoData = true;
          } else {
            _this3.isShowNoHomeNoData = false;
          }
          ;
        } else {
          _this3.$refs.uToast.show({
            title: res.data.msg,
            type: 'error',
            position: 'bottom'
          });
        }
        ;
        if (flag) {
          _this3.showLoadingHint = false;
        } else {
          var totalPage = Math.ceil(_this3.totalCount / _this3.pageSize);
          if (_this3.currentPageNum >= totalPage) {
            _this3.status = 'nomore';
          } else {
            _this3.status = 'loadmore';
          }
        }
      }).catch(function (err) {
        if (flag) {
          _this3.showLoadingHint = false;
        } else {
          _this3.status = 'loadmore';
        }
        ;
        _this3.$refs.uToast.show({
          title: err.message,
          type: 'error',
          position: 'bottom'
        });
      });
    },
    scrolltolower: function scrolltolower() {
      var totalPage = Math.ceil(this.totalCount / this.pageSize);
      if (this.currentPageNum >= totalPage) {
        this.status = 'nomore';
      } else {
        this.status = 'loadmore';
        this.currentPageNum = this.currentPageNum + 1;
        this.queryGetTumbleListDetails({
          pageNo: this.currentPageNum,
          pageSize: this.pageSize,
          deviceIds: this.temporaryDevices,
          date: '2023-10-24'
        }, false, false);
      }
    },
    // 获取跌倒数据
    queryTumbleDetails: function queryTumbleDetails(data, text) {
      var _this4 = this;
      if (text == 'day') {
        this.dayChartData = {
          isShow: true,
          noData: true,
          data: {}
        };
      } else if (text == 'week') {
        this.weekChartData = {
          isShow: true,
          noData: true,
          data: {}
        };
      } else if (text == 'month') {
        this.monthChartData = {
          isShow: true,
          noData: true,
          data: {}
        };
      }
      ;
      (0, _device.tumbleDetails)(data).then(function (res) {
        if (res && res.data.code == 0) {
          if (text == 'day') {
            var questData = res.data.data;
            // 跌倒
            if (questData.length == 0) {
              _this4.dayChartData = {
                isShow: false,
                noData: true,
                data: {}
              };
            } else {
              _this4.dayChartData['isShow'] = true;
              _this4.dayChartData['noData'] = false;
              // status: 0-正常，1-跌倒
              var temporaryData = {
                categories: ['7-4'],
                series: []
              };
              // 统计跌倒次数
              var temporaryCount = questData[0]['resItemVos'].filter(function (el) {
                return el.status == 1;
              }).length;
              questData[0]['resItemVos'].forEach(function (item, index) {
                if (item.status == 0) {
                  temporaryData['series'].push({
                    name: "正常",
                    color: "#F0F0F0",
                    data: [1]
                  });
                } else if (item.status == 1) {
                  temporaryData['series'].push({
                    name: "跌倒",
                    color: "#E8CB51",
                    data: [1]
                  });
                }
              });
              var temporaryContent = JSON.parse(JSON.stringify(temporaryData));
              _this4.dayChartData['data'] = temporaryContent;
            }
          } else if (text == 'week') {
            _this4.currentWeekXaxisArr = [];
            if (res.data.data.length > 0) {
              var _questData = res.data.data;
              _this4.weekChartData['isShow'] = true;
              _this4.weekChartData['noData'] = false;
              var lengthArr = [];
              var maxColumn;
              var _temporaryData = {
                categories: [],
                series: []
              };
              _questData.forEach(function (item, index) {
                _temporaryData['categories'].push(_this4.judgeWeek(item.date));
                _this4.currentWeekXaxisArr.push(item.date);
                lengthArr.push(item.resItemVos.length);
              });
              // 按所有天中数据最多的那天算(每天的数据条数不一致)
              maxColumn = Math.max.apply(null, lengthArr);
              for (var i = 0; i < maxColumn; i++) {
                _temporaryData['series'].push({
                  "data": []
                });
              }
              ;
              _temporaryData['series'].forEach(function (item, index) {
                _this4.currentWeekXaxisArr.forEach(function (innerItem, innerIndex) {
                  var currentData = _questData[innerIndex]['resItemVos'];
                  if (currentData[index]) {
                    if (currentData[index]['status'] == 0) {
                      item['data'].push({
                        value: 1,
                        color: "#F0F0F0"
                      });
                    } else if (currentData[index]['status'] == 1) {
                      item['data'].push({
                        value: 3,
                        color: "#E8CB51"
                      });
                    }
                  } else {
                    item['data'].push({
                      value: 1,
                      color: '#F0F0F0'
                    });
                  }
                });
              });
              var _temporaryContent = JSON.parse(JSON.stringify(_temporaryData));
              _this4.weekChartData['data'] = _temporaryContent;
            } else {
              _this4.weekChartData = {
                isShow: false,
                noData: true,
                data: {}
              };
            }
          } else if (text == 'month') {
            _this4.currentMonthXaxisArr = [];
            if (res.data.data.length > 0) {
              var _questData2 = res.data.data;
              _this4.monthChartData['isShow'] = true;
              _this4.monthChartData['noData'] = false;
              var _lengthArr = [];
              var _maxColumn;
              var _temporaryData2 = {
                categories: [],
                series: []
              };
              _questData2.forEach(function (item, index) {
                _temporaryData2['categories'].push(_this4.getNowFormatDate(new Date(item.date), 5));
                _this4.currentMonthXaxisArr.push(item.date);
                _lengthArr.push(item.resItemVos.length);
              });
              // 按所有天中数据最多的那天算(每天的数据条数不一致)
              _maxColumn = Math.max.apply(null, _lengthArr);
              for (var _i = 0; _i < _maxColumn; _i++) {
                _temporaryData2['series'].push({
                  "data": []
                });
              }
              ;
              _temporaryData2['series'].forEach(function (item, index) {
                _this4.currentMonthXaxisArr.forEach(function (innerItem, innerIndex) {
                  var currentData = _questData2[innerIndex]['resItemVos'];
                  if (currentData[index]) {
                    if (currentData[index]['status'] == 0) {
                      item['data'].push({
                        value: 1,
                        color: "#F0F0F0"
                      });
                    } else if (currentData[index]['status'] == 1) {
                      item['data'].push({
                        value: 3,
                        color: "#E8CB51"
                      });
                    }
                  } else {
                    item['data'].push({
                      value: 1,
                      color: '#F0F0F0'
                    });
                  }
                });
              });
              var _temporaryContent2 = JSON.parse(JSON.stringify(_temporaryData2));
              _this4.monthChartData['data'] = _temporaryContent2;
            } else {
              _this4.monthChartData = {
                isShow: false,
                noData: true,
                data: {}
              };
            }
          }
        } else {
          _this4.$refs.uToast.show({
            title: res.data.msg,
            type: 'error',
            position: 'bottom'
          });
        }
      }).catch(function (err) {
        _this4.$refs.uToast.show({
          title: err.message,
          type: 'error',
          position: 'bottom'
        });
      });
    },
    // 毫秒转换成分钟
    msToMinutes: function msToMinutes(ms) {
      if (!ms) {
        return;
      }
      ;
      var minutes = ms / 60000;
      return minutes;
    },
    // 格式化时间
    getNowFormatDate: function getNowFormatDate(currentDate, type) {
      // type:1(只显示小时分钟),2(只显示年月日)3(只显示年月)4(显示年月日小时分钟)5(显示月日)
      var currentdate;
      var strDate = currentDate.getDate();
      var seperator1 = "-";
      var seperator2 = ":";
      var seperator3 = " ";
      var month = currentDate.getMonth() + 1;
      var hour = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      ;
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      ;
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      ;
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      ;
      if (type == 1) {
        currentdate = hour + seperator2 + minutes;
      }
      ;
      if (type == 2) {
        currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate;
      }
      ;
      if (type == 3) {
        currentdate = currentDate.getFullYear() + seperator1 + month;
      }
      ;
      if (type == 4) {
        currentdate = currentDate.getFullYear() + seperator1 + month + seperator1 + strDate + seperator3 + hour + seperator2 + minutes;
      }
      ;
      if (type == 5) {
        currentdate = month + seperator1 + strDate;
      }
      ;
      return currentdate;
    },
    // 格式化时间(带中文)
    getNowFormatDateText: function getNowFormatDateText(currentDate, type) {
      // type: 2(只展示月)
      var currentdate;
      var strDate = new Date(currentDate).getDate();
      var seperator1 = "月";
      var seperator2 = "日";
      var month = new Date(currentDate).getMonth() + 1;
      var hour = new Date(currentDate).getHours();
      if (type == 2) {
        currentdate = month + seperator1;
      } else {
        currentdate = month + seperator1 + strDate + seperator2;
      }
      ;
      return currentdate;
    },
    //获取上一天和下一天
    getCurrentDate: function getCurrentDate(type) {
      this.isDayPlusCanCilck = true;
      if (type == 'plus') {
        // 当前日期不能超过明天
        var temporaryDate = this.getNowFormatDate(new Date(), 2);
        if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) {
          this.isDayPlusCanCilck = false;
          return;
        }
        ;
        var time_num = new Date(this.currentDayTime); // 这是选择的日期转为时间戳的值
        var addDay = +time_num + 1000 * 60 * 60 * 24; // 加一天
        var newTime = new Date(addDay);
        this.currentDayTime = this.getNowFormatDate(newTime, 2);
        if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) {
          this.isDayPlusCanCilck = false;
        }
      } else {
        var _time_num = new Date(this.currentDayTime); // 这是选择的日期转为时间戳的值
        var _addDay = +_time_num - 1000 * 60 * 60 * 24; // 减一天
        var _newTime = new Date(_addDay);
        this.currentDayTime = this.getNowFormatDate(_newTime, 2);
      }
      ;
      // 获取跌倒日数据
      this.queryTumbleDetails({
        deviceIds: this.temporaryDevices,
        startDate: this.currentDayTime,
        endDate: this.currentDayTime
      }, 'day');

      // 获取跌倒数据列表详情
      this.queryGetTumbleListDetails({
        pageNo: this.currentPageNum,
        pageSize: this.pageSize,
        deviceIds: this.temporaryDevices,
        date: this.currentDayTime
      }, false, true);
    },
    // 获取某月的天数
    getMonthDay: function getMonthDay(year, month) {
      var days = new Date(year, month, 0).getDate();
      return days;
    },
    // 获取上一月和下一月
    getCurrentMonth: function getCurrentMonth(type) {
      this.isMonthPlusCanCilck = true;
      if (type == 'plus') {
        // 当前月不能超过下月
        var temporaryDate = this.getNowFormatDate(new Date(), 3);
        if (new Date(this.currentMonthDate).getTime() >= new Date(temporaryDate).getTime()) {
          this.isMonthPlusCanCilck = false;
          return;
        }
        ;
        var arr = this.currentMonthDate.split("-");
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
          //12月的下月是下年的1月
          year2 = parseInt(year2) + 1;
          month2 = 1;
        }
        ;
        if (month2 < 10) {
          //10月之前都需要补0
          month2 = "0" + month2;
        }
        ;
        var nextMonth = year2 + "-" + month2;
        this.currentMonthDays = this.getMonthDay(year2, month2);
        this.currentMonthDate = this.getNowFormatDate(new Date(nextMonth), 3);
        this.initMonthDate = this.getNowFormatDateText(new Date("".concat(this.currentMonthDate, "-01")), 3);
        if (new Date(this.currentMonthDate).getTime() >= new Date(temporaryDate).getTime()) {
          this.isMonthPlusCanCilck = false;
        }
        ;
        console.log('当前月', this.currentMonthDate);
      } else {
        var _arr = this.currentMonthDate.split("-");
        var _year = _arr[0]; //获取当前日期的年份
        var _month = _arr[1]; //获取当前日期的月份
        var _year2 = _year;
        var _month2 = parseInt(_month) - 1;
        if (_month2 == 0) {
          //1月的上一月是前一年的12月
          _year2 = parseInt(_year2) - 1;
          _month2 = 12;
        }
        ;
        if (_month2 < 10) {
          //10月之前都需要补0
          _month2 = "0" + _month2;
        }
        ;
        var preMonth = _year2 + "-" + _month2;
        this.currentMonthDays = this.getMonthDay(_year2, _month2);
        this.currentMonthDate = this.getNowFormatDate(new Date(preMonth), 3);
        this.initMonthDate = this.getNowFormatDateText(new Date("".concat(this.currentMonthDate, "-01")), 3);
        console.log('当前月', this.currentMonthDate);
      }
      ;
      // 获取跌倒月数据
      this.queryTumbleDetails({
        deviceIds: this.temporaryDevices,
        startDate: "".concat(this.currentMonthDate, "-01"),
        endDate: "".concat(this.currentMonthDate, "-").concat(this.currentMonthDays)
      }, 'month');
      // 获取跌倒数据列表详情
      this.queryGetTumbleListDetails({
        pageNo: this.currentPageNum,
        pageSize: this.pageSize,
        deviceIds: this.temporaryDevices,
        date: "".concat(this.currentMonthDate, "-01")
      }, false, true);
    },
    // 获取当前周
    getWeek: function getWeek(date) {
      var one_day = 86400000;
      var day = date.getDay();
      // 设置时间为当天的0点
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      var week_start_time = date.getTime() - (day - 1) * one_day;
      var week_end_time = date.getTime() + (7 - day) * one_day;
      var last = week_start_time - 2 * 24 * 60 * 60 * 1000;
      var next = week_end_time + 24 * 60 * 60 * 1000;
      var month1 = new Date(week_start_time).getMonth() + 1;
      var month2 = new Date(week_end_time).getMonth() + 1;
      var day1 = new Date(week_start_time).getDate();
      var day2 = new Date(week_end_time).getDate();
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      ;
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      ;
      if (day1 < 10) {
        day1 = "0" + day1;
      }
      ;
      if (day2 < 10) {
        day2 = "0" + day2;
      }
      ;
      var time1 = month1 + "-" + day1;
      var time2 = month2 + "-" + day2;
      var map = new Map();
      map["syear"] = new Date(week_start_time).getFullYear(); // 当前周周一的年份
      map["eyear"] = new Date(week_end_time).getFullYear(); // 当前周周天的年份
      map["stime"] = week_start_time; // 当前周周一零点的毫秒数
      map["etime"] = week_end_time; // 当前周周日零点的毫秒数
      map["stext"] = time1; // 当前周 周一的日期 mm.dd 如 03.14
      map["etext"] = time2; // 当前周 周日的日期 mm.dd 如 03.20
      map["last"] = last; // 上一周 周六零点的毫秒数
      map["next"] = next; // 下一周  周一零点的毫秒数
      map["text"] = time1 + " " + time2;
      return map;
    },
    // 获取上一周、下一周
    getCurrentWeek: function getCurrentWeek(type) {
      this.isWeekPlusCanCilck = true;
      if (type == 'plus') {
        // 当前周不能超过下周
        var temporaryDate = this.getNowFormatDate(new Date(), 2);
        if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
          this.isWeekPlusCanCilck = false;
          return;
        }
        ;
        var time = this.weekMap["next"];
        this.weekMap = this.getWeek(new Date(time));
        this.currentStartWeekDate = "".concat(this.weekMap['syear'], "-").concat(this.weekMap["stext"]);
        this.currentEndWeekDate = "".concat(this.weekMap['eyear'], "-").concat(this.weekMap["etext"]);
        this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate), 3);
        if (new Date(this.currentEndWeekDate).getTime() >= new Date(temporaryDate).getTime()) {
          this.isWeekPlusCanCilck = false;
        }
        ;
        console.log('周', this.currentStartWeekDate, this.currentEndWeekDate);
      } else {
        var _time = this.weekMap["last"];
        this.weekMap = this.getWeek(new Date(_time));
        this.currentStartWeekDate = "".concat(this.weekMap['syear'], "-").concat(this.weekMap["stext"]);
        this.currentEndWeekDate = "".concat(this.weekMap['eyear'], "-").concat(this.weekMap["etext"]);
        this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate), 3);
        console.log('周', this.currentStartWeekDate, this.currentEndWeekDate);
      }
      ;
      // 获取跌倒周数据
      this.queryTumbleDetails({
        deviceIds: this.temporaryDevices,
        startDate: this.currentStartWeekDate,
        endDate: this.currentEndWeekDate
      }, 'week');
      // 获取跌倒数据列表详情
      this.queryGetTumbleListDetails({
        pageNo: this.currentPageNum,
        pageSize: this.pageSize,
        deviceIds: this.temporaryDevices,
        date: this.currentStartWeekDate
      }, false, true);
    },
    // 判断周几
    judgeWeek: function judgeWeek(currentDate) {
      var date = new Date(currentDate);
      var day = date.getDay();
      switch (day) {
        case 0:
          return "周日";
          break;
        case 1:
          return "周一";
          break;
        case 2:
          return "周二";
          break;
        case 3:
          return "周三";
          break;
        case 4:
          return "周四";
          break;
        case 5:
          return "周五";
          break;
        case 6:
          return "周六";
          break;
      }
    },
    // tab切换值改变事件
    change: function change(index) {
      this.currentItem = index;
      if (index == 0) {
        this.initDayTime = this.getNowFormatDate(new Date(), 1);
        this.currentDayTime = this.getNowFormatDate(new Date(), 2);
        var temporaryDate = this.getNowFormatDate(new Date(), 2);
        if (new Date(this.currentDayTime).getTime() >= new Date(temporaryDate).getTime()) {
          this.isDayPlusCanCilck = false;
        }
        ;
        // 获取跌倒日数据
        this.queryTumbleDetails({
          deviceIds: this.temporaryDevices,
          startDate: this.getNowFormatDate(new Date(), 2),
          endDate: this.getNowFormatDate(new Date(), 2)
        }, 'day');
        // 获取跌倒数据列表详情
        this.queryGetTumbleListDetails({
          pageNo: this.currentPageNum,
          pageSize: this.pageSize,
          deviceIds: this.temporaryDevices,
          date: this.getNowFormatDate(new Date(), 2)
        }, false, true);
      }
      ;
      if (index == 1) {
        this.weekMap = this.getWeek(new Date());
        this.currentStartWeekDate = "".concat(this.weekMap['syear'], "-").concat(this.weekMap["stext"]);
        this.currentEndWeekDate = "".concat(this.weekMap['eyear'], "-").concat(this.weekMap["etext"]);
        this.initWeekDate = this.getNowFormatDateText(new Date(this.currentStartWeekDate), 3);
        var _temporaryDate = this.getNowFormatDate(new Date(), 3);
        if (new Date(this.currentEndWeekDate).getTime() >= new Date(_temporaryDate).getTime()) {
          this.isWeekPlusCanCilck = false;
        }
        ;
        // 获取跌倒周数据
        this.queryTumbleDetails({
          deviceIds: this.temporaryDevices,
          startDate: this.currentStartWeekDate,
          endDate: this.currentEndWeekDate
        }, 'week');
        // 获取跌倒周数据列表详情
        this.queryGetTumbleListDetails({
          pageNo: this.currentPageNum,
          pageSize: this.pageSize,
          deviceIds: this.temporaryDevices,
          date: this.currentStartWeekDate
        }, false, true);
      }
      ;
      if (index == 2) {
        this.currentMonthDate = this.getNowFormatDate(new Date(), 3);
        this.initMonthDate = this.getNowFormatDateText(new Date("".concat(this.currentMonthDate, "-01")), 3);
        var _temporaryDate2 = this.getNowFormatDate(new Date(), 3);
        if (new Date(this.currentMonthDate).getTime() >= new Date(_temporaryDate2).getTime()) {
          this.isMonthPlusCanCilck = false;
        }
        ;
        var arr = this.currentMonthDate.split("-");
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
          //1月的上一月是前一年的12月
          year2 = parseInt(year2) - 1;
          month2 = 12;
        }
        ;
        if (month2 < 10) {
          //10月之前都需要补0
          month2 = "0" + month2;
        }
        ;
        var preMonth = year2 + "-" + month2;
        this.currentMonthDays = this.getMonthDay(year2, month2);
        // 获取跌倒月数据
        this.queryTumbleDetails({
          deviceIds: this.temporaryDevices,
          startDate: "".concat(this.currentMonthDate, "-01"),
          endDate: "".concat(this.currentMonthDate, "-").concat(this.currentMonthDays)
        }, 'month');
        // 获取跌倒月数据列表详情
        this.queryGetTumbleListDetails({
          pageNo: this.currentPageNum,
          pageSize: this.pageSize,
          deviceIds: this.temporaryDevices,
          date: "".concat(this.currentMonthDate, "-01")
        }, false, true);
      }
    },
    // 进入健康小知识详情事件
    healthTipsDetailsEvent: function healthTipsDetailsEvent() {
      uni.navigateTo({
        url: '/healthMonitoringPackage/pages/healthTumbleTips/healthTumbleTips'
      });
    },
    backTo: function backTo() {
      uni.navigateBack();
      // uni.switchTab({
      // 	url: '/pages/index/index'
      // })
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 185:
/*!*************************************************************************************************************************!*\
  !*** D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tumble.vue?vue&type=style&index=0&lang=scss& */ 186);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tumble_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 186:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/工作项目/wisdomLivingMiniProgram/healthMonitoringPackage/pages/tumble/tumble.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[179,"common/runtime","common/vendor","healthMonitoringPackage/common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/healthMonitoringPackage/pages/tumble/tumble.js.map