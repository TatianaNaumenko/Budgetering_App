import { HttpUtils } from "../utils/http-utils";

export class CategoryDeleter {
    static async deleteCategory(categoryType, id, openNewRoute) {
        const categoryRoute = categoryType === 'income' ? '/categories/income/' : '/categories/expense/';
        const redirectRoute = categoryType === 'income' ? '/incomes' : '/expenses';

        const result = await HttpUtils.request(categoryRoute + id, 'DELETE', true);
        if (result.redirect) {
            return openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при удалении категории');
        }

        return openNewRoute(redirectRoute);
    }
}