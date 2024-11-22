import { Form } from "./js/auth/form";
import { MainChart } from "./js/chart/mainChart";
import { AuthUtils } from "./js/utils/auth-utils";
import { HttpUtils } from "./js/utils/http-utils";

export class Router {
   constructor() {
      this.contentElement = document.getElementById('content');
      this.titlePageElement = document.getElementById('title-page');
      this.contentLayoutElement = null;
      this.headerTitleElem = null;
      this.layoutPath = '/templates/layout.html';
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
            route: '/logout',
            load: () => {
               new Logout(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/income-expenses',
            title: ' Доходы & Расходы',
            template: '/templates/income&expenses/incomes&expenses.html',
            useLayout: this.layoutPath,
            load: () => {
               new IncomeExpenses(this.openNewRoute.bind(this));
            },
         },
         {
            route: '/edit-income-expense',
            title: 'Редактирование дохода/расхода',
            template: '/templates/income-expenses/edit-incomes-category.html',
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
            route: '/expense',
            title: 'Расходы',
            template: '/templates/expense/expenses.html',
            useLayout: this.layoutPath,
            load: () => {
               new Expense(this.openNewRoute.bind(this))
            },

         },
         {
            route: '/create-expense',
            title: 'Создание категории расходов',
            template: '/templates/expense/create-expenses-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/edit-expense',
            title: 'Редактирование расхода',
            template: '/templates/expense/edit-expenses-category.html',
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
            route: '/delete-expense',
            load: () => {
               new DeleteExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/income',
            title: ' Доходы',
            template: '/templates/income/incomes.html',
            useLayout: this.layoutPath,
            load: () => {
               new Income(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/create-income',
            title: ' Создание категории доходов',
            template: '/templates/income/create-incomes-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateIncome(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/create-expense-in-income-expense',
            title: 'Создание дохода/расхода',
            template: '/templates/income&expense/create-income&expense.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateExpenseInIncomeExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/create-income-in-income-expense',
            title: 'Создание дохода/расхода',
            template: '/templates/income&expense/create-income&expense.html',
            useLayout: this.layoutPath,
            load: () => {
               new CreateIncomeInIncomeExpense(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/edit-income',
            title: 'Редактирование дохода',
            template: '/templates/income/edit-incomes-category.html',
            useLayout: this.layoutPath,
            load: () => {
               new EditIncome(this.openNewRoute.bind(this))
            }
         },
         {
            route: '/delete-income',
            load: () => {
               new DeleteIncome(this.openNewRoute.bind(this))
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

               this.contentElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text())
               this.contentLayoutElement = document.getElementById('content-layout');
               this.userNameElement = document.getElementById('userName');
               this.logOutElement = document.getElementById('logOut');
               this.headerTitleElem = document.getElementById('header-title');
               this.headerTitleElem.innerText = newRoute.title;

               let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoKey);
               if (userInfo) {
                  userInfo = JSON.parse(userInfo)
                  if (userInfo.name) {
                     this.userNameElement.innerText = userInfo.name + ' ' + userInfo.lastName
                  }
               } else {
                  location.href = '/login'
               }
               this.logOutElement.addEventListener('click', (e) => {
                  e.preventDefault();
                  AuthUtils.removeAuthInfo();
                   location.href = '/login'
               })
               this.getBalance().then()
               this.activateMenuItem(newRoute);
               this.contentLayoutElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
               this

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

      document.getElementById('balance-amount').innerText = result.response.balance + '$'

   }

   activateMenuItem(route) {
      document.querySelectorAll('#sidebar .menu .nav-link').forEach(item => {
          let href = item.getAttribute('href')
          if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
              item.classList.add('active');
          } else {
              item.classList.remove('active');
          }
      })
  }
}

