const Modal = {
    open() {
        //abrir modal
        // adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active');
    },
    close() {
        //fechar modal
        //remover a class active do modal

        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active');
    }

    //podendo utilizar uma function toogle() 
}

//transações feitas
const transactions = [{
    id: 1,
    description: 'luz',
    amount: -50000,
    date: '23/01/2021'
},
{
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021'
},
{
    id: 3,
    description: 'luz',
    amount: -20000,
    date: '23/01/2021'

}

]

// eu preciso somas as entras
// depois eu preciso somar as saidas e
// remover adas entradas o valor das saidas
// assim, eu terei o tatal
const Transaction = {

    all: transactions, // todos os dados


    add(transactions) {
        Transaction.all.push(transactions)

        App.reload();
    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(function (transaction) {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
        // csomar as entradas
    },
    expenses() {
        let expenses = 0;
        Transaction.all.forEach(function (transaction) {
            if (transaction.amount < 0) {
                expenses += transaction.amount;
            }
        })
        return expenses;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}
/*

    Substituir os dados do HTML com os dados do JS
*/

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr'); // criando um tr
        tr.innerHTML = DOM.innerHTMLTransaction(transaction); // html a abaixo
        DOM.transactionContainer.appendChild(tr); // adicinar dentro tbody
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : 'expense';

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
             <td class="description">${transaction.description}</td>
             <td class="${CSSclass}">${amount}</td>
             <td class="date">${transaction.date}</td>
             <td>
                <img src="./assets/minus.svg" alt="">
             </td>
        `

        return html;
    },

    updateBalace() {
        document.querySelector('#incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());

        document.querySelector('#expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document.querySelector('#totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },
    clearTransactions() {
        DOM.transactionContainer.innerHTML = "";
    }
}


//formatação de para moeda
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, ""); //pegando só os numeros
        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value;
    }
}

const App = {
    init() {
        //objetos para tipos array para cada elemto executar uma funcionalidade
        Transaction.all.forEach(function (transaction) {
            DOM.addTransaction(transaction);
        })

        DOM.updateBalace();
        // transactions.length


    },
    reload() {
        DOM.clearTransactions();
        App.init();

    }
}

App.init();

Transaction.add({
    id: 4,
    description: 'luz',
    amount: -20000,
    date: '23/01/2021'

})

