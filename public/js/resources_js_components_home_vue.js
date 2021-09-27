"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_home_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/home.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/home.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reports */ "./resources/js/components/reports.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    reports: _reports__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      ctx: '',
      radius: '',
      second: 0,
      minute: 0,
      hour: 12,
      servers: 0,
      form: new Form({
        programTime: '',
        event: '',
        message: '',
        actualTime: moment__WEBPACK_IMPORTED_MODULE_0___default()().format("HH:mm:ss A"),
        wallColour: '#000000',
        clockFaceColour: '#ffffff',
        hourLabelsColour: '#000000'
      })
    };
  },
  methods: {
    // Create Cloclk
    createClock: function createClock() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      this.ctx = canvas.getContext("2d");
      var radius = canvas.height / 3;
      this.radius = canvas.height / 3;
      ctx.translate(radius, radius);
      radius = radius * 0.9;
      this.getProgramTime();
    },
    //Draw clock face
    drawFace: function drawFace(ctx, radius) {
      var grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.form.clockFaceColour;
      ctx.fill();
      grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = this.form.hourLabelsColour;
      ctx.fill();
    },
    //Draw clock numbers
    drawNumbers: function drawNumbers(ctx, radius) {
      var ang;
      var num;
      ctx.font = radius * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
    },
    //Draw time
    drawTime: function drawTime(ctx, radius) {
      var hour = this.hour;
      var minute = this.minute;
      var second = this.second; //hour

      hour = hour % 12;
      hour = hour * Math.PI / 6 + minute * Math.PI / (6 * 60) + second * Math.PI / (360 * 60);
      this.drawHand(ctx, hour, radius * 0.5, radius * 0.07); //minute

      minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60);
      this.drawHand(ctx, minute, radius * 0.8, radius * 0.07); // second

      second = second * Math.PI / 30;
      this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
    },
    //Draw Clock hands
    drawHand: function drawHand(ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    },
    //Start servers
    startServers: function startServers() {
      var random = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
      this.servers = this.servers + random;
      this.getActualTime();
      this.form.event = 'START';
      this.form.message = 'Start ' + random + ' servers';
      this.addTask('success'); // console.log("start servers ni hizi " + random);
      // console.log("total servers ni hizi " + this.servers);
    },
    //Stop servers
    stopServers: function stopServers() {
      var random = Math.floor(Math.random() * (this.servers - 5 + 1)) + 5;
      this.servers = this.servers - random;
      this.getActualTime();
      this.form.event = 'STOP';
      this.form.message = 'Stop ' + random + ' servers';
      this.addTask('warning');
      console.log("stop servers " + random);
      console.log("total servers " + this.servers); // console.log("actualTime " + this.form.actualTime);
      // console.log("time on the clock " + this.form.programTime);
    },
    //Report Running Server
    reportServers: function reportServers() {
      console.log("total servers ni hizi " + this.servers);
      this.getActualTime();
      this.form.event = 'REPORT';
      this.form.message = 'Report ' + this.servers + ' servers running';
      this.addTask('info');
    },
    // Get Actual time
    getActualTime: function getActualTime() {
      this.form.actualTime = moment__WEBPACK_IMPORTED_MODULE_0___default()().format("hh:mm:ss A");
    },
    //Send Task to Backend API
    addTask: function addTask(icon) {
      var _this = this;

      toast.fire({
        icon: icon,
        title: this.form.programTime + ' - ' + this.form.message
      });
      this.form.post("/api/tasks").then(function (_ref) {
        var data = _ref.data;
        // console.log(this.form.wallColour);
        _this.form.wallColour = data.color.wallColour;
        _this.form.clockFaceColour = data.color.clockFaceColour;
        _this.form.hourLabelsColour = data.color.hourLabelsColour;
        console.log(data.color.clockFaceColour + '   ' + data.color.hourLabelsColour); // this.$refs.reportsComponent.getTasks();
      })["catch"](function (e) {
        console.log(e);
      });
    },
    //Evaluate program time to 12 and Draw Clock
    getProgramTime: function getProgramTime() {
      var startTime = new Date();
      var v = this;
      var startTimeLeft = 30;
      var stopTimeLeft = 40;
      var reportTimeLeft = 50;

      function clock() {
        //the time you want to start from
        var mytime = new Date(2011, 0, 1, 12, 0, 0, 567); ///calcualte the difference between the start and current time

        var diff = new Date() - startTime; //add that difference to the offset time

        mytime.setMilliseconds(mytime.getMilliseconds() + diff); //Generate your output

        v.second = mytime.getSeconds();
        v.minute = mytime.getMinutes();
        v.hour = mytime.getHours(); //Update program time

        v.form.programTime = v.hour + ":" + v.minute + ":" + v.second; //Draw face,numbers and time

        v.drawFace(v.ctx, v.radius);
        v.drawNumbers(v.ctx, v.radius);
        v.drawTime(v.ctx, v.radius); //Calculate time needed to start servers

        if (startTimeLeft == 1) {
          startTimeLeft = 30;
          v.startServers();
        } else {
          startTimeLeft--;
        } //Calculate time needed to stop servers


        if (stopTimeLeft == 1) {
          stopTimeLeft = 40;
          v.stopServers();
        } else {
          stopTimeLeft--;
        } //Calculate time needed to report servers


        if (reportTimeLeft == 1) {
          reportTimeLeft = 50;
          v.reportServers();
        } else {
          reportTimeLeft--;
        }
      }

      setInterval(clock, 1000);
    }
  },
  mounted: function mounted() {
    this.createClock();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/reports.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/reports.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: ['#', {
        key: 'programTime'
      }, {
        key: 'event'
      }, 'message', 'actualTime'],
      filter: null,
      filterOn: [],
      reports: []
    };
  },
  computed: {
    rows: function rows() {
      return this.reports.length;
    }
  },
  methods: {
    onFiltered: function onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getReports: function getReports() {
      var _this = this;

      axios.get("/api/tasks").then(function (_ref) {
        var data = _ref.data;
        _this.reports = data.data;
        _this.totalRows = _this.reports.length;
      })["catch"](function (e) {
        console.log(error);
      });
    },
    doSomething: function doSomething() {
      alert('qweqw');
    }
  },
  mounted: function mounted() {
    this.getReports();
  }
});

/***/ }),

/***/ "./resources/js/components/home.vue":
/*!******************************************!*\
  !*** ./resources/js/components/home.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_vue_vue_type_template_id_fa6affac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.vue?vue&type=template&id=fa6affac& */ "./resources/js/components/home.vue?vue&type=template&id=fa6affac&");
/* harmony import */ var _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.vue?vue&type=script&lang=js& */ "./resources/js/components/home.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_vue_vue_type_template_id_fa6affac___WEBPACK_IMPORTED_MODULE_0__.render,
  _home_vue_vue_type_template_id_fa6affac___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/home.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/reports.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/reports.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reports_vue_vue_type_template_id_666cdbc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reports.vue?vue&type=template&id=666cdbc4& */ "./resources/js/components/reports.vue?vue&type=template&id=666cdbc4&");
/* harmony import */ var _reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reports.vue?vue&type=script&lang=js& */ "./resources/js/components/reports.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _reports_vue_vue_type_template_id_666cdbc4___WEBPACK_IMPORTED_MODULE_0__.render,
  _reports_vue_vue_type_template_id_666cdbc4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/reports.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/home.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/home.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/home.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/reports.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/reports.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./reports.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/reports.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/home.vue?vue&type=template&id=fa6affac&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/home.vue?vue&type=template&id=fa6affac& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_fa6affac___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_fa6affac___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_home_vue_vue_type_template_id_fa6affac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./home.vue?vue&type=template&id=fa6affac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/home.vue?vue&type=template&id=fa6affac&");


/***/ }),

/***/ "./resources/js/components/reports.vue?vue&type=template&id=666cdbc4&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/reports.vue?vue&type=template&id=666cdbc4& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_666cdbc4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_666cdbc4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_666cdbc4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./reports.vue?vue&type=template&id=666cdbc4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/reports.vue?vue&type=template&id=666cdbc4&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/home.vue?vue&type=template&id=fa6affac&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/home.vue?vue&type=template&id=fa6affac& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-3" }, [
        _c("canvas", {
          style: { "background-color": _vm.form.wallColour },
          attrs: { id: "canvas", width: "400", height: "400" }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-1" }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-md-8" },
        [_c("reports", { ref: "reportsComponent" })],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/reports.vue?vue&type=template&id=666cdbc4&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/reports.vue?vue&type=template&id=666cdbc4& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "card " }, [
      _c("div", { staticClass: "card-header bg-dark text-white" }, [
        _c("div", { staticClass: "row" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4" }),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-3" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.getReports }
              },
              [_vm._v("Generate Reports")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "card-body" },
        [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-sm-12 col-md-6" }, [
              _c(
                "div",
                {
                  staticClass: "dataTables_length",
                  attrs: { id: "DataTables_Table_1_length" }
                },
                [
                  _c("label", [
                    _vm._v(
                      "\n                                        Show\n                                        "
                    ),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.perPage,
                            expression: "perPage"
                          }
                        ],
                        staticClass:
                          "custom-select custom-select-sm form-control form-control-sm",
                        attrs: {
                          name: "DataTables_Table_1_length",
                          "aria-controls": "DataTables_Table_1"
                        },
                        on: {
                          change: function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.perPage = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          }
                        }
                      },
                      [
                        _c("option", { attrs: { value: "5" } }, [_vm._v("5")]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "8" } }, [_vm._v("8")]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "15" } }, [
                          _vm._v("15")
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "20" } }, [_vm._v("20")])
                      ]
                    ),
                    _vm._v(
                      "\n                                        entries\n                                    "
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-sm-12 col-md-6" }, [
              _c(
                "div",
                {
                  staticClass: "dataTables_filter",
                  attrs: { id: "DataTables_Table_1_filter" }
                },
                [
                  _c("label", [
                    _vm._v("Search:"),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.filter,
                          expression: "filter"
                        }
                      ],
                      staticClass: "form-control form-control-sm",
                      attrs: {
                        type: "search",
                        placeholder: "",
                        "aria-controls": "DataTables_Table_1"
                      },
                      domProps: { value: _vm.filter },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.filter = $event.target.value
                        }
                      }
                    })
                  ])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("b-table", {
            attrs: {
              responsive: "",
              striped: "",
              hover: "",
              "show-empty": "",
              small: "small",
              items: _vm.reports,
              fields: _vm.fields,
              "per-page": _vm.perPage,
              "current-page": _vm.currentPage,
              filter: _vm.filter,
              filterIncludedFields: _vm.filterOn
            },
            on: { filtered: _vm.onFiltered },
            scopedSlots: _vm._u([
              {
                key: "cell(#)",
                fn: function(row) {
                  return [_c("p", [_vm._v(_vm._s(row.index + 1))])]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "card-footer " }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-7" }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-md-5" },
            [
              _c("b-pagination", {
                staticStyle: { float: "left" },
                attrs: {
                  "total-rows": _vm.rows,
                  "per-page": _vm.perPage,
                  "aria-controls": "my-table"
                },
                model: {
                  value: _vm.currentPage,
                  callback: function($$v) {
                    _vm.currentPage = $$v
                  },
                  expression: "currentPage"
                }
              })
            ],
            1
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-5" }, [
      _c("h4", [_vm._v(" Task Reports")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);