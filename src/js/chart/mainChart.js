export class MainChart {
   constructor(openNewRoute) {
       this.openNewRoute = openNewRoute;
       this.incomeDiagram = document.getElementById('income-diagramma');
       this.expensesDiagram = document.getElementById('expenses-diagramma');
// что это за данные,,,???
       let incomeData = [100, 119, 103, 58, 20, 3];
       let expensesData = [5, 30, 8, 45, 12, 7];

       this.incomeChart = new Chart(this.incomeDiagram, {
           type: 'pie',
           responsive: true,
           maintainAspectRatio: false,
           data: {
               labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
               datasets: [{
                   label: 'Income Data',
                   data: incomeData,
                   borderWidth: 1
               }]
           },
           options: {
               plugins: {
                   title: {
                       display: true,
                       text: 'Доходы',
                       color: '#290661',
                       font: {
                           size: 28
                       }
                   }
               }
           }
       });

       this.expensesChart = new Chart(this.expensesDiagram, {
           type: 'pie',
           responsive: true,
           maintainAspectRatio: false,
           data: {
               labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
               datasets: [{
                   label: 'Expenses Data',
                   data: expensesData,
                   borderWidth: 1
               }]
           },
           options: {
               plugins: {
                   title: {
                       display: true,
                       text: 'Расходы',
                       color: '#290661',
                       font: {
                           size: 28
                       }
                   }
               }
           }
       });
   }
}