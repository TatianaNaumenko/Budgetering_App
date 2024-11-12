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

/***/ "./src/js/auth/form.js":
/*!*****************************!*\
  !*** ./src/js/auth/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\r\n   constructor(page) {\r\n      this.page = page;\r\n      this.loginBtnElem = null;\r\n      this.passwordElem = null;\r\n      this.passwordRepeatElem = null;\r\n      this.fields = [\r\n         {\r\n            name: \"email\",\r\n            id: \"email\",\r\n            element: null,\r\n            regex: /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,\r\n            valid: false,\r\n         },\r\n         {\r\n            name: \"password\",\r\n            id: \"password\",\r\n            element: null,\r\n            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d{8})[a-zA-Z0-9]{0,30}$/,\r\n            valid: false,\r\n         },\r\n      ];\r\n\r\n      if (this.page === 'sign-up') {\r\n         this.fields.unshift({\r\n            name: \"name\",\r\n            id: \"userName\",\r\n            element: null,\r\n            regex: /^([А-ЯЁ][а-яё]+[\\-\\s]?){3,}$/,\r\n            valid: false,\r\n         },\r\n            {\r\n               name: \"lastName\",\r\n               id: \"userLastName\",\r\n               element: null,\r\n               regex: /^([А-ЯЁ][а-яё]+[\\-\\s]?){3,}$/,\r\n               valid: false,\r\n            });\r\n         this.fields.push({\r\n            name: \"passwordRepeat\",\r\n            id: \"passwordRepeat\",\r\n            element: null,\r\n            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d{8})[a-zA-Z0-9]{0,30}$/,\r\n            valid: false,\r\n         });\r\n         this.passwordElem = document.getElementById('password');\r\n         this.passwordRepeatElem = document.getElementById('passwordRepeat');\r\n      }\r\n\r\n\r\n      this.fields.forEach(item => {\r\n         item.element = document.getElementById(item.id);\r\n         item.element.addEventListener('change', () => {\r\n            this.validateInput(item, item.element);\r\n         })\r\n\r\n      });\r\n      this.loginBtnElem = document.getElementById(\"loginBtn\");\r\n      this.loginBtnElem.addEventListener('click', () => {\r\n         this.processForm();\r\n\r\n      });\r\n      if (this.page === 'login') {\r\n         this.rememberMeElem = document.getElementById(\"RememberMe\");\r\n      }\r\n   }\r\n\r\n   validateInput(field, elem) {\r\n      if (!elem.value || !elem.value.match(field.regex)) {\r\n         elem.classList.add('is-invalid');\r\n         field.valid = false;\r\n      }\r\n   // Дополнительная проверка для страницы регистрации\r\n   if (this.page === 'sign-up' && field.name === 'passwordRepeat') {\r\n      if (this.passwordElem.value !== this.passwordRepeatElem.value) {\r\n         this.passwordRepeatElem.classList.add('is-invalid');\r\n         field.valid = false;\r\n      } else {\r\n         this.passwordRepeatElem.classList.remove('is-invalid');\r\n         field.valid = true;\r\n      }\r\n   }\r\n\r\n      else {\r\n         elem.classList.remove('is-invalid')\r\n         field.valid = true;\r\n      }\r\n      this.validateForm();\r\n\r\n   }\r\n\r\n   validateForm() {\r\n      let validForm = this.fields.every(item => item.valid);\r\n      \r\n      return validForm;\r\n   }\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://frontend-lumincoin/./src/js/auth/form.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _js_auth_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/auth/form */ \"./src/js/auth/form.js\");\n\r\n\r\nclass Router {\r\n   constructor() {\r\n      this.contentElement = document.getElementById('content');\r\n      this.titleElement = document.getElementById('title-page');\r\n\r\n\r\n      this.routes = [\r\n\r\n         {\r\n            route: '#/login',\r\n            title: 'Регистрация',\r\n            template: '/templates/pages/auth/login.html',\r\n          \r\n            load: () => {\r\n               new _js_auth_form__WEBPACK_IMPORTED_MODULE_0__.Form('login');\r\n            }\r\n         },\r\n         {\r\n            route: '#/sign-up',\r\n            title: 'Автортзация',\r\n            template: '/templates/pages/auth/sign-up.html',\r\n                     load: () => {\r\n               new _js_auth_form__WEBPACK_IMPORTED_MODULE_0__.Form('sign-up');\r\n            }\r\n         },\r\n    \r\n         {\r\n            route: '#/logout',\r\n            load: () => {\r\n               new Logout(this.openRoute.bind(this))\r\n            }\r\n         },\r\n\r\n      ]\r\n      this.initEvents();\r\n   }\r\n   initEvents() {\r\n      window.addEventListener('DOMContentLoaded', this.openRoute.bind(this));\r\n      window.addEventListener('popstate', this.openRoute.bind(this));\r\n     \r\n   }\r\n   async openRoute() {\r\n      //  считывает url до доп данных\r\n      const urlRoute = window.location.hash.split('?')[0];\r\n\r\n\r\n      const newRoute = this.routes.find(item => {\r\n         return item.route === urlRoute;\r\n      });\r\n      if (!newRoute) {\r\n         window.location.href = '#/login';\r\n         return;\r\n      }\r\n      // рендерим страницу\r\n      this.contentElement.innerHTML =\r\n         await fetch(newRoute.template).then(response => response.text());\r\n            this.titleElement.innerText = newRoute.title;\r\n\r\n      newRoute.load();\r\n   }\r\n}\r\n\n\n//# sourceURL=webpack://frontend-lumincoin/./src/router.js?");

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