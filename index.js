const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'wrapper-status__status_red';

const inputNode = document.getElementById('inputExpense');
const categorySelectNode = document.getElementById('categorySelect');
const buttonNode = document.getElementById('button');
const historyNode = document.getElementById('history');
const totalNode = document.getElementById('total');
const statusNode = document.getElementById('status');
const resetBtnNode = document.getElementById('resetBtn');

let expenses = [];

const limitNode = document.getElementById('limit');
const limit = parseInt(limitNode.innerText);

const getTotal = () => {
    let sum = 0;

    expenses.forEach(expense => {
        sum += expense.amount;
    });

    return sum;
};

const renderStatus = () => {
    const total = getTotal(expenses);
    totalNode.innerText = `${total} руб.`;

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
        historyItem.innerText = `${expense.category} - ${expense.amount} руб.`;
        historyItem.className = 'history__item';

        historyNode.appendChild(historyItem); //генерирует элемент в конец
    });
};

const render = () => {
    renderStatus();
    renderHistory(); 
};

const getExpenseFromUser = () => parseInt(inputNode.value);
const getSelectedCategory = () => categorySelectNode.value;

const clearInput = () => {
    inputNode.value = '';
};

const addBtnHandler = () => {
    const expense = getExpenseFromUser();
    if (!expense) {
        return;
    }

    const category = getSelectedCategory();
    if (category === 'Категория') {
        return;
    }
    
    const newExpense = { amount: expense, category: category };
    console.log(newExpense);

    expenses.push(newExpense);
    render();
    clearInput();
}

const clearBtnHandler = () => {
    expenses = [];
    render();
}

buttonNode.addEventListener('click', addBtnHandler);
resetBtnNode.addEventListener('click', clearBtnHandler);



