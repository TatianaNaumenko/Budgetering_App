export class Form {
   constructor(page) {
      this.page = page;
      this.loginBtnElem = null;
      this.passwordElem = null;
      this.passwordRepeatElem = null;
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
            regex: /^([А-ЯЁ][а-яё]+[\-\s]?){3,}$/,
            valid: false,
         },
            {
               name: "lastName",
               id: "userLastName",
               element: null,
               regex: /^([А-ЯЁ][а-яё]+[\-\s]?){3,}$/,
               valid: false,
            });
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

      else {
         elem.classList.remove('is-invalid')
         field.valid = true;
      }
      this.validateForm();

   }

   validateForm() {
      let validForm = this.fields.every(item => item.valid);
      
      return validForm;
   }

}


