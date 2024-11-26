import { HttpUtils } from "../utils/http-utils";

export class Income{
   constructor(openNewRoute){
      this.openNewRoute = openNewRoute;
this.getIncomes().then();
   }
   async getIncomes() {
      const result = await HttpUtils.request('/categories/income');
      
      if (result.redirect) {
          return this.openNewRoute(result.redirect);
      }

      if (result.error || !result.response || (result.response && result.response.error)) {
          console.log(result.response.message || 'Возникла ошибка при запросе. Обратитесь в поддержку');
          return;
      }

      this.getIncomeList(result.response);
  }

  getIncomeList(incomes) {
      let cardsElement = document.getElementById('cards');
      
      if (cardsElement) {
          cardsElement.innerHTML = "";

          for (let i = 0; i < incomes.length; i++) {
              let cardElement = document.createElement('div');
              cardElement.className = 'col-md-4 mb-4';
              cardElement.innerHTML = `
                  <div class="card h3 p-3 text-purple-dark">
                      ${incomes[i].title}
                      <div class="action pt-3">
                          <a href="/edit-expense?id=${incomes[i].id}&title=${incomes[i].title}" class="btn btn-primary">Редактировать</a>
                          <a href="javascript:void(0)" class="delete-card btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${expenses[i].id}">Удалить</a>
                      </div>
                  </div>
              `;
              cardsElement.appendChild(cardElement);
          }
      }

      let cardLinkElement = document.createElement('div');
      cardLinkElement.className = 'new-card col-md-4 mb-4 card h3 p-3 d-flex justify-content-center align-items-center';
      cardLinkElement.innerHTML = `
              <a href="/create-income" class="text-center text-decoration-none">Создать категорию доходов</a>
      `;

      if (cardsElement) {
          cardsElement.appendChild(cardLinkElement);
      }

      this.categoryDeleteEventListeners();
  }

  categoryDeleteEventListeners() {
      document.addEventListener('click', (event) => {
          if (event.target.classList.contains('delete-card')) {
              let operationId = event.target.getAttribute('data-id');
              let deleteBtn = document.getElementById('delete-btn');
              deleteBtn.setAttribute('href', '/delete-expense?id=' + operationId);
          }
      });
  }
}
