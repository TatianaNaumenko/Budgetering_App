import { Form } from "./js/auth/form";
import { MainChart } from "./js/chart/mainChart";
import { CreateExpense } from "./js/expense/create-expense";
import { EditExpense } from "./js/expense/edit-expense";
import { Expense } from "./js/expense/expense";
import { CreateExpenseInIncomeExpense, CreateIncomeExpenseInIncomeExpense } from "./js/income-expense/create-income-expense-in-income-expense";
import { DeleteIncomeExpense } from "./js/income-expense/delete-income-expense";
import { EditIncomeExpense } from "./js/income-expense/edit-income-expense";
import { IncomeExpenses } from "./js/income-expense/income-expense";
import { CreateIncome } from "./js/income/create-income";
import { EditIncome } from "./js/income/edit-income";
import { Income } from "./js/income/income";
import { AuthUtils } from "./js/utils/auth-utils";
import { HttpUtils } from "./js/utils/http-utils";


export class Router {
   constructor() {
      this.contentElement = document.getElementById('content');
      this.titlePageElement = document.getElementById('title-page');
      this.contentLayoutElement = null;
      this.headerTitleElem = null;
      this.layoutPath = '/templates/layout.html';
      this.balanceElem = null;
      this.routes = [
         {
            route: '/',
            title: 'Главная',
            template: '/templates/pages/mainChart.html',
            useLayout: this.layoutPath,
            load: () => {
               new MainChart(this.openNewRoute.bind(this));
            }
         },

         {
            route: '/login',
            title: 'Авторизация',
            template: '/templates/pages/auth/login.html',
            useLayout: false,
            load: () => {
               new Form(this.openNewRoute.bind(this), 'login');
            }
         },
         {
            route: '/sign-up',
            title: 'Регистрация',
            template: '/templates/pages/auth/sign-up.html',
            useLayout: false,
            load: () => {
               new Form(this.openNewRoute.bind(this), 'sign-up');
            }
         },

         {
            route: '/incomes-expenses',
            title: ' Доходы & Расходы',
            template: '/templates/pages/income-expense/incomes-expenses.html',
            useLayout: this.layoutPath,
            load: () => {
               new IncomeExpenses(this.openNewRoute.bind(this));
            },
         },
         {
            route: '/edit-income-expense',
            title: 'Редактирование дохода/расхода',
            template: '/templates/pages/income-expense/edit-income-expense.html',
            useLayout: this.layoutPath,
            load: () => {
               new EditIncomeExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/delete-income-expense',
            load: () => {
               new DeleteIncomeExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/expenses',
            title: 'Расходы',
            template: '/templates/pages/expense/expenses.html',
            useLayout: this.layoutPath,
            load: () => {
               new Expense(this.openNewRoute.bind(this))
            },

         },
         {
            route: '/create-expense',
            title: 'Создание категории расходов',
            template: '/templates/pages/expense/create-expenses-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/edit-expense',
            title: 'Редактирование расхода',
            template: '/templates/pages/expense/edit-expenses-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new EditExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/create-expense',
            title: 'Создание расхода',
            template: '/templates/expense/create-expenses-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateExpense(this.openNewRoute.bind(this))
            }
         },

         {
            route: '/incomes',
            title: ' Доходы',
            template: '/templates/pages/income/incomes.html',
            useLayout: this.layoutPath,
            load: () => {
               new Income(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/create-income',
            title: ' Создание категории доходов',
            template: '/templates/pages/income/create-incomes-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateIncome(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/create-expense-in-income-expense',
            title: 'Создание дохода/расхода',
            template: '/templates/pages/income-expense/create-income-expense.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateIncomeExpenseInIncomeExpense(this.openNewRoute.bind(this), 'expense')
            }
         },
         {
            route: '/create-income-in-income-expense',
            title: 'Создание дохода/расхода',
            template: '/templates/pages/income-expense/create-income-expense.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateIncomeExpenseInIncomeExpense(this.openNewRoute.bind(this), 'income')
            }
         },
         {
            route: '/edit-income',
            title: 'Редактирование дохода',
            template: '/templates/pages/income/edit-incomes-categoty.html',
            useLayout: this.layoutPath,
            load: () => {
               new EditIncome(this.openNewRoute.bind(this))
            }
         },

      ]
      this.initEvents();
   }
   initEvents() {
      window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
      window.addEventListener('popstate', this.activateRoute.bind(this));
      document.addEventListener('click', this.clickHandler.bind(this));
   }

   async openNewRoute(url) {
      const currentRoute = window.location.pathname;
      history.pushState({}, '', url);
      await this.activateRoute(null, currentRoute)
   }


   async clickHandler(e) {
      let element = null
      if (e.target.nodeName === 'A') {
         element = e.target
      } else if (e.target.parentNode.nodeName === 'A') {
         element = e.target.parentNode
      }


      if (element) {
         e.preventDefault()
         const currentRoute = window.location.pathname;
         const url = element.href.replace(window.location.origin, '')
         if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
            return;
         }

         await this.openNewRoute(url)
      }
   }

   async activateRoute() {

      const urlRoute = window.location.pathname;
      const newRoute = this.routes.find(item => item.route === urlRoute); // это обект с данными маршрута

      if (newRoute) {
         if (newRoute.title) {
            this.titlePageElement.innerText = newRoute.title + ' |  Lumincoin Finance'
         }


         if (newRoute.template) {
            this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
            if (newRoute.useLayout) {
// Layout.initLayout()
               this.contentElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text())
               this.contentLayoutElement = document.getElementById('content-layout');
               this.userNameElement = document.getElementById('userName');
               this.logOutElement = document.getElementById('logOut');
               this.headerTitleElem = document.getElementById('header-title');
               this.headerTitleElem.innerText = newRoute.title;
               this.balanceElem = document.getElementById('balance-amount');
          
               let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoKey);
               if (userInfo) {
                  userInfo = JSON.parse(userInfo)
                  if (userInfo.name) {
                     this.userNameElement.innerText = userInfo.name + ' ' + userInfo.lastName
                  }
               } else {
                  location.href = '/login'
               }
               // обработадла выход из приложения
               this.logOutElement.addEventListener('click', (e) => {
                  e.preventDefault();
                  AuthUtils.removeAuthInfo();
                  location.href = '/login'
               })
               this.getBalance().then()
               this.activateLink('.main-menu-item');
               let menuDropdownLink = document.getElementById('menu-dropdown-link');
               if (menuDropdownLink) {
                  menuDropdownLink.addEventListener('click', (e) => {
                     e.preventDefault();
                     menuDropdownLink.classList.add('active');
                     this.activateLink('.menu-dropdown-item');


                  })

               }

               this.contentLayoutElement.innerHTML = await fetch(newRoute.template).then(response => response.text());

            }

         }

         if (newRoute.load && typeof newRoute.load === 'function') {
            newRoute.load()
         }

      } else {
         console.log("route not found")
         history.pushState({}, '', '/');
         await this.activateRoute();
      }
   }



   async getBalance() {
      const result = await HttpUtils.request('/balance')
      if (result.redirect) {
         return this.openNewRoute(result.redirect);
      }
      if (result.error || !result.response || (result.response && result.response.error)) {
         return console.log('Возникла ошибка при запросе Баланса. Обратитесь в поддержку ')
      }

      this.balanceElem.innerText = result.response.balance + '$';
      // // создать функцию обновления баланса
      // updatehBalance().then();

   }


   activateLink(elemClass) {
      let currentlocation = window.location.pathname;
      let menuLinks = document.querySelectorAll(elemClass);
      menuLinks.forEach((link) => {
         let linkHref = link.getAttribute('href');
         if (linkHref === currentlocation) {
            link.classList.add('active');

         } else {
            link.classList.remove('active');
         }

      })
   }


   // activateMenuItem(route) {
   //    document.querySelectorAll('#sidebar .menu .nav-link').forEach(item => {
   //       item.classList.remove('active');
   //       if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
   //          item.classList.add('active');
   //       } else {
   //          item.classList.remove('active');
   //       }
   //    })
   // }
   // я не знаю где и зачем применить эту функцию
   //   async updateBalance(){
   //    const result = await HttpUtils.request('/balance', 'PUT', true, {
   //       newBalance: 1000
   //    })
   //    if (result.redirect) {
   //        return this.openNewRoute(result.redirect);
   //    }
   //    if (result.error || !result.response || (result.response && result.response.error)) {
   //        return console.log('Возникла ошибка при запросе Баланса. Обратитесь в поддержку ')
   //    }
   //    this.balanceElem.innerText = result.response.balance + '$';
   //   }


}

