import { DateFilter } from "../config/data-filter";
import { HttpUtils } from "../utils/http-utils";


// export class MainChart {
//     constructor(openNewRoute) {
//         this.openNewRoute = openNewRoute;
//         this.getOperations('all').then();
//         new DateFilter(this.getOperations.bind(this));
//     }

//     async getOperations(period, dateFrom = '', dateTo = '') {
//         let url = '/operations?period=all';
//         if (period !== 'all') {
//             url = `/operations?period=interval&dateFrom=${dateFrom}&dateTo=${dateTo}`;
//         }
//         const result = await HttpUtils.request(url);
//         if (result.redirect) {
//             return this.openNewRoute(result.redirect);
//         }
//         if (result.error || !result.response || (result.response && result.response.error)) {
//             return alert('Возникла ошибка при запросе операций');
//         }
//         this.loadOperationsIntoChart(result.response);
//     }

//     loadOperationsIntoChart(operations) { //загружаем данные по операциям в чарты
//         const incomeData = this.getDataByType(operations, 'income'); //сюда размещаем доходы
//         const expensesData = this.getDataByType(operations, 'expense'); //сюда размещаем расходы

//         this.renderCharts(incomeData, expensesData); //создаем и обновляем данные в чартах
//     }

//     getDataByType(operations, type) { //фильтруем операции по типу
//         const filteredOperations = operations.filter(operation => operation.type === type); //создаем массив, в который попадают операции с соответствующим типом
//         const categoriesSum = {}; //тут будем хранить категории с суммами

//         filteredOperations.forEach(operation => { //проходим по каждой отфильтрованной операции
//             if (!categoriesSum[operation.category]) { //проверяем наличие категории в объекте categories, обращаемся к свойству category текущей операции
//                 categoriesSum[operation.category] = 0; //если категории еще нет, то создаем ее с суммой 0
//             }
//             categoriesSum[operation.category] += parseFloat(operation.amount); //добавляем сумму текущей операции к значению этой категории в объекте categories.
//         });
//         console.log(categoriesSum);

//         //извлекаем ключи и значения из объекта categories, задаем цвета для графиков:
//         const labels = Object.keys(categoriesSum);
//         const data = Object.values(categoriesSum);
//         const backgroundColor = ['#DC3545', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD'];

//         return { labels, data, backgroundColor }; //возвращаем объект с этими данными
//     }

//     renderCharts(incomeData, expensesData) { //отрисовываем чарты
//         let incomeChartCanvas = document.getElementById('income-diagramma');
//         let expensesChartCanvas = document.getElementById('expenses-diagramma');
//         //удаляем существующие чарты, если они есть, чтобы фильтр обновлял данные
//         if (this.incomeChart) {
//             this.incomeChart.destroy();
//         }
//         if (this.expensesChart) {
//             this.expensesChart.destroy();
//         }

//         // Создаем новые чарты
//         this.incomeChart = new Chart(incomeChartCanvas, {
//             type: 'pie',
//             data: {
//                 labels: incomeData.labels, //сюда подставляем полученные выше значения, которые передаем как аргументы при вызове
//                 datasets: [{
//                     backgroundColor: incomeData.backgroundColor,
//                     data: incomeData.data
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                         labels: {
//                             color: '#000',
//                             boxWidth: 35,
//                             font: {
//                                 size: 12,
//                                 weight: 'bold'
//                             }
//                         },
//                     },
//                     title: {
//                         display: false,
//                     }
//                 }
//             }
//         });

//         this.expensesChart = new Chart(expensesChartCanvas, {
//             type: 'pie',
//             data: {
//                 labels: expensesData.labels,
//                 datasets: [{
//                     backgroundColor: expensesData.backgroundColor,
//                     data: expensesData.data
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                         labels: {
//                             color: '#000',
//                             boxWidth: 35,
//                             font: {
//                                 size: 12,
//                                 weight: 'bold'
//                             }
//                         },
//                     },
//                     title: {
//                         display: false,
//                     }
//                 }
//             }
//         });
//     }
// }


export class MainChart {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.incomeChart = null; // Инициализация переменных для графиков
        this.expensesChart = null;

        // Вызов метода для загрузки операций при создании экземпляра
        this.init();
    }

    async init() {
        await this.getOperations('all'); // Получаем все операции
        new DateFilter(this.getOperations.bind(this)); // Инициализируем DateFilter
    }

    async getOperations(period, dateFrom = '', dateTo = '') {
        let url = '/operations?period=all';
        if (period !== 'all') {
            url = `/operations?period=interval&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        }

        try {
            const result = await HttpUtils.request(url);
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response && result.response.error)) {
                throw new Error('Возникла ошибка при запросе операций');
            }
            this.loadOperationsIntoChart(result.response);
        } catch (error) {
            console.log(error.message);
        }
    }

    loadOperationsIntoChart(operations) {
        const incomeData = this.getDataByType(operations, 'income');
        const expensesData = this.getDataByType(operations, 'expense');
        this.renderCharts(incomeData, expensesData);
    }

    getDataByType(operations, type) {
        const filteredOperations = operations.filter(operation => operation.type === type);
        const categoriesSum = {};

        filteredOperations.forEach(operation => {
            categoriesSum[operation.category] = (categoriesSum[operation.category] || 0) + parseFloat(operation.amount);
        });

        const labels = Object.keys(categoriesSum);
        const data = Object.values(categoriesSum);
        const backgroundColor = ['#DC3545', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD'];

        return { labels, data, backgroundColor };
    }

    renderCharts(incomeData, expensesData) {
        this.destroyCharts(); // Уничтожаем старые графики

        // Создаем новые графики
        this.incomeChart = this.createChart('income-diagramma', incomeData);
        this.expensesChart = this.createChart('expenses-diagramma', expensesData);
    }

    destroyCharts() {
        if (this.incomeChart) {
            this.incomeChart.destroy();
            this.incomeChart = null; // Сбрасываем переменную
        }
        if (this.expensesChart) {
            this.expensesChart.destroy();
            this.expensesChart = null; // Сбрасываем переменную
        }
    }

    createChart(canvasId, chartData) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chartData.labels,
                datasets: [{
                    backgroundColor: chartData.backgroundColor,
                    data: chartData.data
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#000',
                            boxWidth: 35,
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                    },
                    title: {
                        display: false,
                    }
                }
            }
        });
    }
}

