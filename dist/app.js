/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ \"./src/router.js\");\n\r\n\r\n\r\n\r\nclass App {\r\n   constructor() {\r\n    new _router__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\n   }\r\n}\r\n\r\n(new App());\n\n//# sourceURL=webpack://frontend-lumincoin/./src/app.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n\r\nclass Router {\r\n   constructor() {\r\n      this.contentElement = document.getElementById('content');\r\n      this.titleElement = document.getElementById('title-page');\r\n\r\n\r\n      this.routes = [\r\n\r\n         {\r\n            route: '#/login',\r\n            title: 'Регистрация',\r\n            template: '/templates/pages/auth/login.html',\r\n          \r\n            load: () => {\r\n               new Form('login');\r\n            }\r\n         },\r\n         {\r\n            route: '#/sign-up',\r\n            title: 'Автортзация',\r\n            template: '/templates/pages/auth/sign-up.html',\r\n                     load: () => {\r\n               new Form('sign-up');\r\n            }\r\n         },\r\n    \r\n         {\r\n            route: '#/logout',\r\n            load: () => {\r\n               new Logout(this.openRoute.bind(this))\r\n            }\r\n         },\r\n\r\n      ]\r\n      this.initEvents();\r\n   }\r\n   initEvents() {\r\n      window.addEventListener('DOMContentLoaded', this.openRoute.bind(this));\r\n      window.addEventListener('popstate', this.openRoute.bind(this));\r\n     \r\n   }\r\n   async openRoute() {\r\n      //  считывает url до доп данных\r\n      const urlRoute = window.location.hash.split('?')[0];\r\n\r\n\r\n      const newRoute = this.routes.find(item => {\r\n         return item.route === urlRoute;\r\n      });\r\n      if (!newRoute) {\r\n         window.location.href = '#/login';\r\n         return;\r\n      }\r\n      // рендерим страницу\r\n      this.contentElement.innerHTML =\r\n         await fetch(newRoute.template).then(response => response.text());\r\n            this.titleElement.innerText = newRoute.title;\r\n\r\n      newRoute.load();\r\n   }\r\n}\r\n\n\n//# sourceURL=webpack://frontend-lumincoin/./src/router.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;