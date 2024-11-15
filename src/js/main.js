import { Auth } from "./services/auth";

export class Main {
   constructor() {
      this.contentLayoutElement = document.getElementById('content-layout');
      this.userName = document.getElementById('userName');
      this.logOutElement = document.getElementById('logOut');
      this.mainPageLinkElement = document.getElementById('mainPage');
      this.initPage()
   }
   initPage() {
      let userInfo = Auth.getUserInfo();
      console.log(userInfo)
      this.userName.style.fontSize = '12px';
      this.userName.innerText = userInfo.name + ' ' + userInfo.lastName;
      this.mainPageLinkElement.classList.add('active')
      this.logOutElement.addEventListener('click', (e) => {
         e.preventDefault();
         Auth.logout();
      })
   }

}