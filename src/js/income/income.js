import { CategoryDeleter } from "../config/delete-category";
import { HttpUtils } from "../utils/http-utils";

export class Income {
    constructor(openNewRoute) {
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
            // проходим по объектам массива incomes
            incomes.forEach(income => {
                let cardElement = this.createIncomeCard(income);
                cardsElement.appendChild(cardElement);
            });
        }

        this.addNewCardLink(cardsElement);
        this.categoryDeleteEventListeners();
    }
    // передаем объект в функцию создания карточки дохода
    createIncomeCard(income) {
        let cardElement = document.createElement('div');
        cardElement.className = 'col-md-4 mb-4';
        cardElement.innerHTML = `
           <div class="card h3 p-3 text-purple-dark">
               ${income.title}
               <div class="action pt-3">
                   <a href="/edit-income?id=${income.id}&title=${income.title}" class="btn btn-primary">Редактировать</a>
                   <a href="javascript:void(0)" class="delete-card btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"
                   data-id="${income.id}" data-title="${income.title}">Удалить</a>
               </div>
           </div>
       `;
        return cardElement;
    }

    addNewCardLink(cardsElement) {
        const cardLinkElement = document.createElement('div');
        cardLinkElement.className = 'new-card card col-md-4 mb-4 card h3 p-3 d-flex justify-content-center align-items-center';
        cardLinkElement.style.height = '121px';
        cardLinkElement.innerHTML = `
           <a href="/create-income" class="text-center text-decoration-none"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5469 6.08984V9.05664H0.902344V6.08984H14.5469ZM9.32422 0.511719V15.0039H6.13867V0.511719H9.32422Z" fill="#CED4DA"/>
</svg>
</a>
       `;
        cardsElement.appendChild(cardLinkElement);
    }

    categoryDeleteEventListeners() {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-card')) {
                const operationId = event.target.getAttribute('data-id');
                const operationTitle = event.target.getAttribute('data-title');
                const deleteBtn = document.getElementById('delete-btn');

                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    CategoryDeleter.deleteCategory('income', operationId, operationTitle, this.openNewRoute);
                });
            }
        });
    }
}