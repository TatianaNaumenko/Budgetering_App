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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth */ \"./src/js/services/auth.js\");\n/* harmony import */ var _services_custom_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/custom-http */ \"./src/js/services/custom-http.js\");\n\r\n\r\n\r\n\r\nclass Form {\r\n   constructor(page) {\r\n      this.page = page;\r\n      this.loginBtnElem = null;\r\n      this.passwordElem = null;\r\n      this.passwordRepeatElem = null;\r\n      this.commonErrorElement = document.getElementById('common-error');\r\n      this.commonErrorElement.style.display = 'none';\r\n      this.fields = [\r\n         {\r\n            name: \"email\",\r\n            id: \"email\",\r\n            element: null,\r\n            regex: /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,\r\n            valid: false,\r\n         },\r\n         {\r\n            name: \"password\",\r\n            id: \"password\",\r\n            element: null,\r\n            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d{8})[a-zA-Z0-9]{0,30}$/,\r\n            valid: false,\r\n         },\r\n      ];\r\n\r\n      if (this.page === 'sign-up') {\r\n         this.fields.unshift({\r\n            name: \"name\",\r\n            id: \"userName\",\r\n            element: null,\r\n            regex: /^([А-ЯЁ][а-яё]+[\\-\\s]?){2,}$/,\r\n            valid: false,\r\n         }\r\n         );\r\n         this.fields.push({\r\n            name: \"passwordRepeat\",\r\n            id: \"passwordRepeat\",\r\n            element: null,\r\n            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d{8})[a-zA-Z0-9]{0,30}$/,\r\n            valid: false,\r\n         });\r\n         this.passwordElem = document.getElementById('password');\r\n         this.passwordRepeatElem = document.getElementById('passwordRepeat');\r\n      }\r\n\r\n\r\n      this.fields.forEach(item => {\r\n         item.element = document.getElementById(item.id);\r\n         item.element.addEventListener('change', () => {\r\n            this.validateInput(item, item.element);\r\n         })\r\n\r\n      });\r\n      this.loginBtnElem = document.getElementById(\"loginBtn\");\r\n      this.loginBtnElem.addEventListener('click', () => {\r\n         this.processForm();\r\n\r\n      });\r\n      if (this.page === 'login') {\r\n         this.rememberMeElem = document.getElementById(\"RememberMe\");\r\n      }\r\n   }\r\n\r\n   validateInput(field, elem) {\r\n      if (!elem.value || !elem.value.match(field.regex)) {\r\n         elem.classList.add('is-invalid');\r\n         field.valid = false;\r\n\r\n      } else {\r\n         elem.classList.remove('is-invalid')\r\n         field.valid = true;\r\n      }\r\n\r\n      // Дополнительная проверка для страницы регистрации\r\n      if (this.page === 'sign-up' && field.name === 'passwordRepeat') {\r\n         if (this.passwordElem.value !== this.passwordRepeatElem.value) {\r\n            this.passwordRepeatElem.classList.add('is-invalid');\r\n            field.valid = false;\r\n         } else {\r\n            this.passwordRepeatElem.classList.remove('is-invalid');\r\n            field.valid = true;\r\n         }\r\n      }\r\n      this.validateForm();\r\n\r\n   }\r\n\r\n   validateForm() {\r\n      let validForm = this.fields.every(item => item.valid);\r\n\r\n      return validForm;\r\n   }\r\n\r\n   async processForm() {\r\n     \r\n      if (this.validateForm()) {\r\n\r\n         let email = this.fields.find(item => item.name === 'email').element.value;\r\n         let password = this.fields.find(item => item.name === 'password').element.value;\r\n\r\n         if (this.page === 'sign-up') {\r\n            let fullName = this.fields.find(item => item.name === 'name').element.value;\r\n            let [name, lastName] = fullName.split(\" \");\r\n            let passwordRepeat = this.fields.find(item => item.name === 'passwordRepeat').element.value;\r\n            try {\r\n               let result = await _services_custom_http__WEBPACK_IMPORTED_MODULE_2__.CustomHttp.request(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/signup', 'POST', {\r\n                  name: name,\r\n                  lastName: lastName,\r\n                  email: email,\r\n                  password: password,\r\n                  passwordRepeat: passwordRepeat\r\n               })\r\n              \r\n               if  (result.error || !result.response || (result.response && ( !result.response.tokens || (result.response.tokens && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user ||\r\n                  (result.response.user && (!result.response.user.name || !result.response.user.lastName || !result.response.user.id) )))))) {\r\n                  if (result.error || !result.user) {\r\n                     this.commonErrorElement.style.display = 'block'; // не хочет блок появляться\r\n                                    \r\n                     throw new Error(result.message);\r\n                    \r\n                  }else {\r\n                     this.commonErrorElement.style.display = 'none';  \r\n                    console.log(result); \r\n                 }\r\n               }\r\n\r\n            } catch (err) {\r\n               return console.log(err);\r\n            }\r\n         }\r\n\r\n         await  this.login(email,password);\r\n\r\n      }\r\n   }\r\n  \r\n   async login(email, password) {\r\n      try {\r\n          const result = await _services_custom_http__WEBPACK_IMPORTED_MODULE_2__.CustomHttp.request(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/login', 'POST', {\r\n              email: email,\r\n              password: password,\r\n              rememberMe:   this.rememberMeElem.checked\r\n          });\r\n          if  (result.error || !result.response || (result.response && ( !result.response.tokens || (result.response.tokens && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user ||\r\n            (result.response.user && (!result.response.user.name || !result.response.user.lastName || !result.response.user.id) )))))) {\r\n              if (result.error) {\r\n                  throw new Error(result.message);\r\n              }\r\n           \r\n              _services_auth__WEBPACK_IMPORTED_MODULE_1__.Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);\r\n              _services_auth__WEBPACK_IMPORTED_MODULE_1__.Auth.setUserInfo({\r\n                  name: result.user.name,\r\n                  lastName: result.user.lastName,\r\n                  userId: result.user.id,\r\n                  userEmail: email\r\n              });\r\n              location.href = '#/';\r\n          }\r\n      } catch (error) {\r\n          console.log(error);\r\n      }\r\n  }\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://frontend-lumincoin/./src/js/auth/form.js?");

/***/ }),

/***/ "./src/js/config/config.js":
/*!*********************************!*\
  !*** ./src/js/config/config.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\r\n   host: 'http://localhost:3000/api'\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://frontend-lumincoin/./src/js/config/config.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Main: () => (/* binding */ Main)\n/* harmony export */ });\n/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/auth */ \"./src/js/services/auth.js\");\n\r\n\r\nclass Main{\r\nconstructor(){\r\n   this.contentLayoutElement = document.getElementById('content-layout');\r\n   this.userName = document.getElementById('userName');\r\n   this.logOutElement = document.getElementById('logOut')\r\n   this.initPage()\r\n}\r\ninitPage(){\r\n   let userInfo = _services_auth__WEBPACK_IMPORTED_MODULE_0__.Auth.getUserInfo();\r\n   console.log(userInfo)\r\n   this.userName.style.fontSize = '12px';\r\n   this.userName.innerText = userInfo.name + ' ' + userInfo.lastName;\r\n   this.logOutElement.addEventListener('click', (e)=>{\r\ne.preventDefault();\r\n_services_auth__WEBPACK_IMPORTED_MODULE_0__.Auth.logout();\r\n   })\r\n}\r\n\r\n}\n\n//# sourceURL=webpack://frontend-lumincoin/./src/js/main.js?");

/***/ }),

/***/ "./src/js/services/auth.js":
/*!*********************************!*\
  !*** ./src/js/services/auth.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Auth: () => (/* binding */ Auth)\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\r\n\r\nclass Auth {\r\n   static accessTokenKey = 'accessToken';\r\n   static refreshTokenKey = 'refreshToken';\r\n   static  userInfoKey = 'userInfo';\r\n\r\n   static async processUnauthorizedResponse() {\r\n       const refreshToken = localStorage.getItem(this.refreshTokenKey);\r\n       if (refreshToken) {\r\n           const response = await fetch(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/refresh', {\r\n               method: 'POST',\r\n               headers: {\r\n                   'Content-type': 'application/json',\r\n                   'Accept': 'application/json'\r\n               },\r\n               body: JSON.stringify({refreshToken: refreshToken})\r\n           });\r\n           if (response && response.status === 200) {\r\n               const result = await response.json();\r\n               if (result && !result.error) {\r\n                   this.setTokens(result.tokens.accessToken, result.tokens.refreshToken);\r\n                   return true;\r\n               }\r\n           }\r\n       }\r\n       this.removeTokens();\r\n       location.href = '#/login';\r\n       return false;\r\n   }\r\n\r\n   static async logout() {\r\n       const refreshToken = localStorage.getItem(this.refreshTokenKey);\r\n       if (refreshToken) {\r\n           const response = await fetch(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/logout', {\r\n               method: 'POST',\r\n               headers: {\r\n                   'Content-type': 'application/json',\r\n                   'Accept': 'application/json'\r\n               },\r\n               body: JSON.stringify({refreshToken: refreshToken})\r\n           });\r\n           if (response && response.status === 200) {\r\n               const result = await response.json();\r\n               if (result && !result.error) {\r\n                   this.removeTokens();\r\n                   location.href = '#/login';\r\n                   return true;\r\n               }\r\n           }\r\n       }\r\n   }\r\n\r\n   static setTokens(accessToken, refreshToken) {\r\n       localStorage.setItem(this.accessTokenKey, accessToken);\r\n       localStorage.setItem(this.refreshTokenKey, refreshToken);\r\n   }\r\n\r\n   static removeTokens() {\r\n       localStorage.removeItem(this.accessTokenKey);\r\n       localStorage.removeItem(this.refreshTokenKey);\r\n   }\r\n\r\n   static setUserInfo(info) {\r\n       localStorage.setItem(this.userInfoKey, JSON.stringify(info));\r\n   }\r\n\r\n   static getUserInfo() {\r\n       const userInfo = localStorage.getItem(this.userInfoKey);\r\n       const userToken = localStorage.getItem(this.accessTokenKey);\r\n       if (userInfo && userToken) {\r\n           return JSON.parse(userInfo);\r\n       }\r\n       return null;\r\n   }\r\n}\n\n//# sourceURL=webpack://frontend-lumincoin/./src/js/services/auth.js?");

/***/ }),

/***/ "./src/js/services/custom-http.js":
/*!****************************************!*\
  !*** ./src/js/services/custom-http.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomHttp: () => (/* binding */ CustomHttp)\n/* harmony export */ });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ \"./src/js/services/auth.js\");\n\r\n\r\nclass CustomHttp {\r\n   static async request(url, method = 'GET', body = null) {\r\n\r\n      const params = {\r\n         method: method,\r\n         headers: {\r\n            'Content-type': 'application/json',\r\n            'Accept': 'application/json',\r\n         },\r\n      };\r\n      let token = localStorage.getItem(_auth__WEBPACK_IMPORTED_MODULE_0__.Auth.accessTokenKey);\r\n      if (token) {\r\n         params.headers['x-access-token'] = token;\r\n      }\r\n      if (body) {\r\n         params.body = JSON.stringify(body);\r\n      }\r\n      // самое главное место тут уходит запрос на сервер методои FETCH API\r\n      const response = await fetch(url, params);\r\n      if (!response.ok) {\r\n         // показатель того что access token выдохся\r\n         if (response.status === 401) {\r\n            const result = await _auth__WEBPACK_IMPORTED_MODULE_0__.Auth.processUnauthorizedResponse();\r\n            if (result) {\r\n               return await this.request(url, method, body)\r\n            } else {\r\n               return null;\r\n            }\r\n         }\r\n         throw new Error(response.message);\r\n      }\r\n      return await response.json()\r\n\r\n   }\r\n}\n\n//# sourceURL=webpack://frontend-lumincoin/./src/js/services/custom-http.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _js_auth_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/auth/form */ \"./src/js/auth/form.js\");\n/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/main */ \"./src/js/main.js\");\n\r\n\r\n\r\nclass Router {\r\n   constructor() {\r\n      this.contentElement = document.getElementById('content');\r\n      this.titleElement = document.getElementById('title-page');\r\n\r\n\r\n      this.routes = [\r\n         {\r\n            route: '#/',\r\n            title: 'Главная',\r\n            template:'/templates/layout.html',\r\n            headerTitle: 'Главная',\r\n            useLayout: '/templates/layout.html',\r\n            load: () => {\r\n               new _js_main__WEBPACK_IMPORTED_MODULE_1__.Main();\r\n            }\r\n         },\r\n\r\n         {\r\n            route: '#/login',\r\n            title: 'Регистрация',\r\n            template: '/templates/pages/auth/login.html',\r\n            headerTitle: '',\r\n            useLayout: false,\r\n            load: () => {\r\n               new _js_auth_form__WEBPACK_IMPORTED_MODULE_0__.Form('login');\r\n            }\r\n         },\r\n         {\r\n            route: '#/sign-up',\r\n            title: 'Автортзация',\r\n            template: '/templates/pages/auth/sign-up.html',\r\n            headerTitle: '',\r\n            useLayout: false,\r\n            load: () => {\r\n               new _js_auth_form__WEBPACK_IMPORTED_MODULE_0__.Form('sign-up');\r\n            }\r\n         },\r\n\r\n         {\r\n            route: '#/logout',\r\n            load: () => {\r\n               new Logout(this.openRoute.bind(this))\r\n            }\r\n         },\r\n\r\n      ]\r\n      this.initEvents();\r\n   }\r\n   initEvents() {\r\n      window.addEventListener('DOMContentLoaded', this.openRoute.bind(this));\r\n      window.addEventListener('popstate', this.openRoute.bind(this));\r\n\r\n   }\r\n   async openRoute() {\r\n      //  считывает url до доп данных\r\n      const urlRoute = window.location.hash.split('?')[0];\r\n\r\n\r\n      const newRoute = this.routes.find(item => {\r\n         return item.route === urlRoute;\r\n      });\r\n      if (!newRoute) {\r\n         window.location.href = '#/login';\r\n         return;\r\n      }\r\n      // рендерим страницу\r\n      this.contentElement.innerHTML =\r\n         await fetch(newRoute.template).then(response => response.text());\r\n      this.titleElement.innerText = newRoute.title;\r\n      if (newRoute.useLayout) {\r\n         this.contentLayoutElement = document.getElementById('content-layout');\r\n         this.hederTitle = document.getElementById('header-title');\r\n         this.hederTitle.innerText = newRoute.title;\r\n         this.contentLayoutElement.innerText = 'сюда вставляем страницы'\r\n      }\r\n      newRoute.load();\r\n   }\r\n}\r\n\n\n//# sourceURL=webpack://frontend-lumincoin/./src/router.js?");

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