const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = 'body_fixed'

const bodyNode = document.getElementById('body');
const changeLimitButton = document.getElementById('changeLimitButton');
const newLimitNode = document.getElementById('inputNewLimit');
const addNewLimitButton = document.getElementById('addNewLimitButton');

const popupNode = document.getElementById('popup');
const closePopupBtnNode = document.getElementById('closePopupBtn');

// const limitNode = document.getElementById('limitValue');

//открывает, закрывает попап
const togglePopup = () => {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}

//Чистим инпут
const clearInputLimit = () => {
    newLimitNode.value = '';
}

//изменяем лимит
const addNewLimit = () => {
    const newLimit = parseInt(newLimitNode.value);

    if (!newLimit) {
        return;
    }

    limit = newLimit;

    limitNode.innerText = newLimit;
    //сохраняем лимит в локал 
    localStorage.setItem(STORAGE_LABEL_LIMIT, newLimit);

    render();
    clearInputLimit();
    togglePopup();
}

changeLimitButton.addEventListener('click', togglePopup);
closePopupBtnNode.addEventListener('click', togglePopup);
addNewLimitButton.addEventListener('click', addNewLimit);
