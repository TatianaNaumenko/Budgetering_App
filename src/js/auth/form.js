import { AuthUtils } from "../utils/auth-utils";
import { HttpUtils } from "../utils/http-utils";



export class Form {
   constructor(openNewRoute, page) {
      this.openNewRoute = openNewRoute;
      this.page = page;
      this.loginBtnElem = null;
      this.passwordElem = null;
      this.passwordRepeatElem = null;
      this.commonErrorElement = document.getElementById('common-error');
      this.emailElem = null;
      this.passwordElem = null;
      this.rememberMeElem = null;

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
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/,
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
      this.loginBtnElem.addEventListener('click', (e) => {
         e.preventDefault();
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

         this.emailElem = this.fields.find(item => item.name === 'email').element.value;
         this.passwordElem = this.fields.find(item => item.name === 'password').element.value;
         try {
            if (this.page === 'sign-up') {

               this.commonErrorElement.style.display = 'none';
               let fullName = this.fields.find(item => item.name === 'name').element.value;
               let [name, lastName] = fullName.split(" ");
               let passwordRepeat = this.fields.find(item => item.name === 'passwordRepeat').element.value;


               let result = await HttpUtils.request('/signup', 'POST', false, {
                  name: name,
                  lastName: lastName,
                  email: this.emailElem,
                  password: this.passwordElem,
                  passwordRepeat: passwordRepeat
               })


               if (result.error || !result.response || (result.response && (!result.response.user || (result.response.user && (!result.response.user.id || !result.response.user.email || !result.response.user.name || !result.response.user.lastName))))) {
                  this.commonErrorElement.style.display = 'block';
                  throw new Error(result.message);
               }


               AuthUtils.setAuthInfo(null, null, {
                  name: result.response.user.name,
                  email: result.response.user.email,
                  lastName: result.response.user.lastName,
                  id: result.response.user.id
               })

               if (localStorage.getItem('accessToken')) {
                  return this.openNewRoute('/login')
               }

               this.openNewRoute('/login')
            }


         } catch (error) {
            return console.log(error)
         }
      }

      if (this.page === 'login') {

         try {

            const result = await HttpUtils.request('/login', 'POST', false, {
               email: this.emailElem,
               password: this.passwordElem,
               rememberMe: this.rememberMeElem.checked
            })

            if (result.error || !result.response || (result.response && (!result.response.tokens || (result.response.tokens && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user ||
               (result.response.user && (!result.response.user.name || !result.response.user.lastName || !result.response.user.id))))))) {
               this.commonErrorElement.style.display = 'block';
               throw new Error(result.message);
            }

            AuthUtils.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken, {
               name: result.response.user.name,
               lastName: result.response.user.lastName,
               id: result.response.user.id
            })
            this.openNewRoute('/')

         } catch (error) {
            return console.log(error)
         }





      }

   }



}


