import config from "../config/config";
import { Auth } from "../services/auth";
import { CustomHttp } from "../services/custom-http";

export class Form {
   constructor(page) {
      this.page = page;
      this.loginBtnElem = null;
      this.passwordElem = null;
      this.passwordRepeatElem = null;
      this.commonErrorElement = document.getElementById('common-error');
      this.commonErrorElement.style.display = 'none';
      this.fields = [
         {
            name: "email",
            id: "email",
            element: null,
            regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            valid: false,
         },
         {
            name: "password",
            id: "password",
            element: null,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{8})[a-zA-Z0-9]{0,30}$/,
            valid: false,
         },
      ];

      if (this.page === 'sign-up') {
         this.fields.unshift({
            name: "name",
            id: "userName",
            element: null,
            regex: /^([А-ЯЁ][а-яё]+[\-\s]?){2,}$/,
            valid: false,
         }
         );
         this.fields.push({
            name: "passwordRepeat",
            id: "passwordRepeat",
            element: null,
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{8})[a-zA-Z0-9]{0,30}$/,
            valid: false,
         });
         this.passwordElem = document.getElementById('password');
         this.passwordRepeatElem = document.getElementById('passwordRepeat');
      }


      this.fields.forEach(item => {
         item.element = document.getElementById(item.id);
         item.element.addEventListener('change', () => {
            this.validateInput(item, item.element);
         })

      });
      this.loginBtnElem = document.getElementById("loginBtn");
      this.loginBtnElem.addEventListener('click', () => {
         this.processForm();

      });
      if (this.page === 'login') {
         this.rememberMeElem = document.getElementById("RememberMe");
      }
   }

   validateInput(field, elem) {
      if (!elem.value || !elem.value.match(field.regex)) {
         elem.classList.add('is-invalid');
         field.valid = false;

      } else {
         elem.classList.remove('is-invalid')
         field.valid = true;
      }

      // Дополнительная проверка для страницы регистрации
      if (this.page === 'sign-up' && field.name === 'passwordRepeat') {
         if (this.passwordElem.value !== this.passwordRepeatElem.value) {
            this.passwordRepeatElem.classList.add('is-invalid');
            field.valid = false;
         } else {
            this.passwordRepeatElem.classList.remove('is-invalid');
            field.valid = true;
         }
      }
      this.validateForm();

   }

   validateForm() {
      let validForm = this.fields.every(item => item.valid);

      return validForm;
   }

   async processForm() {

      if (this.validateForm()) {

         let email = this.fields.find(item => item.name === 'email').element.value;
         let password = this.fields.find(item => item.name === 'password').element.value;

         if (this.page === 'sign-up') {
            let fullName = this.fields.find(item => item.name === 'name').element.value;
            let [name, lastName] = fullName.split(" ");
            let passwordRepeat = this.fields.find(item => item.name === 'passwordRepeat').element.value;
            try {
               let result = await CustomHttp.request(config.host + '/signup', 'POST', {
                  name: name,
                  lastName: lastName,
                  email: email,
                  password: password,
                  passwordRepeat: passwordRepeat
               })

               if (result.error || !result.response || (result.response && (!result.response.tokens || (result.response.tokens && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user ||
                  (result.response.user && (!result.response.user.name || !result.response.user.lastName || !result.response.user.id))))))) {
                  if (result.error || !result.user) {
                     this.commonErrorElement.style.display = 'block'; // не хочет блок появляться

                     throw new Error(result.message);

                  } else {
                     this.commonErrorElement.style.display = 'none';
                     console.log(result);
                  }
               }

            } catch (err) {
               return console.log(err);
            }
         }
         location.href = '#/'; // тут не получается   this.userName.innerText = userInfo.name + ' ' + userInfo.lastName;
         await this.login(email, password);

      }
   }

   async login(email, password) {
      try {
         const result = await CustomHttp.request(config.host + '/login', 'POST', {
            email: email,
            password: password,
            rememberMe: this.rememberMeElem.checked
         });
         if (result.error || !result.response || (result.response && (!result.response.tokens || (result.response.tokens && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user ||
            (result.response.user && (!result.response.user.name || !result.response.user.lastName || !result.response.user.id))))))) {
            if (result.error) {
               throw new Error(result.message);
            }

            Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
            Auth.setUserInfo({
               name: result.user.name,
               lastName: result.user.lastName,
               userId: result.user.id,
               userEmail: email
            });
            location.href = '#/';
         }
      } catch (error) {
         console.log(error);
      }
   }

}


