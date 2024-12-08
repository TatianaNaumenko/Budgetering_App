import { CategoryDeleter } from "../config/delete-category";
import { HttpUtils } from "../utils/http-utils";



export class Expense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getExpense().then();
    }

    async getExpense() {
        const result = await HttpUtils.request('/categories/expense');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message || 'Возникла ошибка при запросе. Обратитесь в поддержку');
            return;
        }

        this.getExpenseList(result.response);
    }

    getExpenseList(expenses) {
        let cardsElement = document.getElementById('cards');

        if (cardsElement) {
            cardsElement.innerHTML = "";
            // проходим по объектам массива incomes
            expenses.forEach(expense => {
                let cardElement = this.createExpenseCard(expense);
                cardsElement.appendChild(cardElement);
            });
        }

        this.addNewCardLink(cardsElement);
        this.categoryDeleteEventListeners();
    }
    // передаем объект в функцию создания карточки дохода
    createExpenseCard(expense) {
        let cardElement = document.createElement('div');
        cardElement.className = 'col-md-4 mb-4';
        cardElement.innerHTML = `
            <div class="card h3 p-3 text-purple-dark">
                ${expense.title}
                <div class="action pt-3">
                    <a href="/edit-expense?id=${expense.id}&title=${expense.title}" class="btn btn-primary">Редактировать</a>
                    <a href="javascript:void(0)" class="delete-card btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${expense.id}">Удалить</a>
                </div>
            </div>
        `;
        return cardElement;
    }

    addNewCardLink(cardsElement) {
        const cardLinkElement = document.createElement('div');
        cardLinkElement.className = 'new-card col-md-4 mb-4 card h3 p-3 d-flex justify-content-center align-items-center';
        cardLinkElement.innerHTML = `
            <a href="/create-expense" class="text-center text-decoration-none">Создать категорию доходов</a>
        `;
        cardsElement.appendChild(cardLinkElement);
    }

    categoryDeleteEventListeners() {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-card')) {
                const operationId = event.target.getAttribute('data-id');
                const deleteBtn = document.getElementById('delete-btn');

                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    CategoryDeleter.deleteCategory('expense', operationId, this.openNewRoute);
                });
            }
        });
    }
}