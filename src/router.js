
export class Router {
   constructor() {
      this.contentElement = document.getElementById('content');
      this.titleElement = document.getElementById('title-page');


      this.routes = [

         {
            route: '#/login',
            title: 'Регистрация',
            template: '/templates/pages/auth/login.html',
          
            load: () => {
               new Form('login');
            }
         },
         {
            route: '#/sign-up',
            title: 'Автортзация',
            template: '/templates/pages/auth/sign-up.html',
                     load: () => {
               new Form('sign-up');
            }
         },
    
         {
            route: '#/logout',
            load: () => {
               new Logout(this.openRoute.bind(this))
            }
         },

      ]
      this.initEvents();
   }
   initEvents() {
      window.addEventListener('DOMContentLoaded', this.openRoute.bind(this));
      window.addEventListener('popstate', this.openRoute.bind(this));
     
   }
   async openRoute() {
      //  считывает url до доп данных
      const urlRoute = window.location.hash.split('?')[0];


      const newRoute = this.routes.find(item => {
         return item.route === urlRoute;
      });
      if (!newRoute) {
         window.location.href = '#/login';
         return;
      }
      // рендерим страницу
      this.contentElement.innerHTML =
         await fetch(newRoute.template).then(response => response.text());
            this.titleElement.innerText = newRoute.title;

      newRoute.load();
   }
}
