const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status__statusText_negative';
const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';

const inputNode = document.getElementById('inputExpense');
const categorySelectNode = document.getElementById('categorySelect');
const buttonNode = document.getElementById('addButton');
const historyNode = document.getElementById('historyList');
const totalNode = document.getElementById('totalValue');
const statusNode = document.getElementById('statusText');
const resetBtnNode = document.getElementById('resetButton');

const limitNode = document.getElementById('limitValue');
let limit = parseInt(limitNode.innerText);

const innitLimit = () => {
    const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT))
    if (!limitFromStorage) {
        return;
    }
    limitNode.innerText = limitFromStorage;
    limit = parseInt(limitNode.innerText);
}

innitLimit();

let expenses = [];

const innitHistory = () => {
    const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
    const expensesFromStorage = JSON.parse(expensesFromStorageString);
    if (Array.isArray(expensesFromStorage)) {
        expenses = expensesFromStorage;
    }

    render();
}

const getTotal = () => {
    let sum = 0;

    expenses.forEach(expense => {
        sum += expense.amount;
    });

    return sum;
};

const renderStatus = () => {
    const total = getTotal(expenses);
    totalNode.innerText = total;

    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб.)`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
};

const renderHistory = () => {
    historyNode.innerHTML = '';

    expenses.forEach(expense => {
        const historyItem = document.createElement('li');
        historyItem.innerText = `${expense.category} - ${expense.amount}`;
        historyItem.className = 'rub';

        historyNode.appendChild(historyItem); //генерирует элемент в конец
    });
};

const render = () => {
    renderStatus();
    renderHistory(); 
};

innitHistory();

const getExpenseFromUser = () => parseInt(inputNode.value);
const getSelectedCategory = () => categorySelectNode.value;

const clearInput = () => {
    inputNode.value = '';
};

const clearCategory = () => {
    categorySelectNode.value  = 'Категория';
}

const saveExpensesToStorage = () => {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

const addBtnHandler = () => {
    const expense = getExpenseFromUser();
    if (!expense) {
        alert('Введите стоимость');
        return;
    }

    const category = getSelectedCategory();
    if (category === 'Категория') {
        alert('Выберите категорию');
        return;
    }
    
    const newExpense = { amount: expense, category: category };
    console.log(newExpense);

    expenses.push(newExpense);
    saveExpensesToStorage();


    render();
    clearInput();
    clearCategory();
}

const clearStorage = () => {
    localStorage.removeItem(STORAGE_LABEL_EXPENSES);
}

const clearBtnHandler = () => {
    expenses = [];
    clearStorage();
    render();
}

buttonNode.addEventListener('click', addBtnHandler);
resetBtnNode.addEventListener('click', clearBtnHandler);





