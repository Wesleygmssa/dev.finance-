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


// eu preciso somas as entras
// depois eu preciso somar as saidas e
// remover adas entradas o valor das saidas
// assim, eu terei o tatal
const Transaction = {

    all: [{
        description: 'luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        description: 'luz',
        amount: -20000,
        date: '23/01/2021'

    }

    ], // todos os dados


    add(transactions) {
        Transaction.all.push(transactions)

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1)
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index); // html a abaixo
        tr.dataset.index = index
        DOM.transactionContainer.appendChild(tr); // adicinar dentro tbody
    },

    innerHTMLTransaction(transaction, index) {
        //validação de class
        const CSSclass = transaction.amount > 0 ? "income" : 'expense';

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
             <td class="description">${transaction.description}</td>
             <td class="${CSSclass}">${amount}</td>
             <td class="date">${transaction.date}</td>
             <td>
                <img onclik="Transaction.remove(${index})" src="./assets/minus.svg" alt="">
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
    formatAmuunt(value) {
        value = Number(value.replace(/\,\./g, "")) * 100

        return value
    },
    formatDate(date) {
        const spittedDate = date.split("-");
        return `${spittedDate[2]}/${spittedDate[1]}/${spittedDate[0]}`;
    },
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

const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateField() {
        const { description, amount, date } = Form.getValues();

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues();

        amount = Utils.formatAmuunt(amount);

        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date

        }

    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },
    clearFields() {
        Form.description.value = '';
        Form.amount.value = '';
        Form.date.value = '';
    },
    submit(event) {
        event.preventDefault();

        try {
            Form.validateField();
            const transaction = Form.formatValues();
            Form.saveTransaction(transaction);
            Form.clearFields();
            Modal.close();
        } catch (err) {
            alert(err.message)
        }


    }
}

const App = {
    init() {
        //objetos para tipos array para cada elemto executar uma funcionalidade
        Transaction.all.forEach(function (transaction, index) {
            DOM.addTransaction(transaction, index);
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

