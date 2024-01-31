const inputElement = document.querySelectorAll('.card__input');
const submitButton = document.querySelector('.card__button');

const validDay = (day) => {
    if (day > 0 && day <= 31) {
        return true;
    }
}
const validMonth = (month) => {
    if (month > 0 && month <= 12) {
        return true;
    }
}
const validYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (year > 0 && year <= currentYear) {
        return true;
    }
}

const isValidate = (dayElement, monthElement, yearElement) => {
    let isValid = [false, false, false];
    if (!validDay(dayElement.value)) {
        dayElement.classList.add('card__input--error');
    } else {
        isValid[0] = true;
        dayElement.classList.remove('card__input--error');
    }
    if (!validMonth(monthElement.value)) {
        monthElement.classList.add('card__input--error');
    } else {
        isValid[1] = true;
        monthElement.classList.remove('card__input--error');
    }
    if (!validYear(yearElement.value)) {
        yearElement.classList.add('card__input--error');
    } else {
        isValid[2] = true;
        yearElement.classList.remove('card__input--error');
    }
    return isValid.every((item)=> item==true);
}

const ageCalc = (year, month, day)=>{
    const today = new Date();
    const birthdate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) { 
        age--;
    };
    return age;
}
const onClickHandler = () => {
    const dayElement =document.querySelector('.card__input[name="day"]');
    const monthElement =document.querySelector('.card__input[name="month"]');
    const yearElement =document.querySelector('.card__input[name="year"]');
    const resultElement = document.querySelector('.card__resultValue');
    
    if (!isValidate(dayElement, monthElement, yearElement)) {
        resultElement.textContent = "--";
        return;
    }

    resultElement.textContent = ageCalc(yearElement.value, monthElement.value, dayElement.value)
    
}
inputElement.forEach((item) => {
    item.addEventListener('keydown', (e) => {
        e.key === "Enter" && onClickHandler();
    })
})
submitButton.addEventListener('click',onClickHandler);