let age = {
    day: 0,
    month: 0,
    year: 0,
}

const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');

const resultDay = document.querySelector('.result-day');
const resultMonth = document.querySelector('.result-month');
const resultYear = document.querySelector('.result-year');

function isLeap(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

const monthDays = {
    0: 31,
    1: (year) => isLeap(year) ? 29 : 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31, 
}

function calculateAge(birthday) {
    let age = {};
    const today = new Date();
    const birthDate = new Date(birthday.year, birthday.month - 1, birthday.day);

    let ageInYears = today.getFullYear() - birthDate.getFullYear();
    let ageInMonths = today.getMonth() - birthDate.getMonth();
    let ageInDays = today.getDate() - birthDate.getDate();


    if (ageInDays < 0) {
        ageInMonths--;
        const daysInLastMonth = typeof monthDays[birthDate.getMonth()] === "function"
        ? monthDays[birthDate.getMonth()](birthDate.getFullYear())
        : monthDays[birthDate.getMonth()];
        ageInDays += daysInLastMonth;
    }
    if (ageInMonths < 0) {
        ageInYears--;
        ageInMonths += 12;
    }

    age.years = ageInYears;
    age.months = ageInMonths;
    age.days = ageInDays;

    return age;
}

function handleChange(event) {
    const { name, value } = event.target;
    age[name] = Number(value);

    console.log(age)

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    toastr.options = {
        "progressBar": true,
        "positionClass": "toast-bottom-full-width",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    if (age.day >= 32 || age.month >= 13 || age.year > currentYear) {
        toastr.error('Please enter a valid date');
        age = { day: 0, month: 0, year: 0 };
        day.value = "";
        month.value = "";
        year.value = "";
        resultDay.textContent = "- -";
        resultMonth.textContent = "- -";
        resultYear.textContent = "- -";
        return;
    }

    if (age.year && age.month && age.day) {
        
        if (age.year > currentYear) {
            toastr.error('Please enter a valid year');
            age = { ...age, year: 0 };
            year.value = "";
            return;
        }

        if (age.month > 12 || age.month < 1 || (age.year === currentYear && age.month > currentMonth)) {
            toastr.error('Please enter a valid month');
            age = { ...age, month: 0 };
            month.value = "";
            return;
        }

        const daysInMonth = typeof monthDays[age.month - 1] === "function" ? monthDays[age.month - 1](age.year) : monthDays[age.month - 1];
        if (age.day > daysInMonth || age.day < 1 || (age.year === currentYear && age.month === currentMonth && age.day > currentDay)) {
            toastr.warning(`Please enter a valid day`);
            age = { ...age, day: 0 };
            day.value = "";
            return;
        }

        const calculatedAge = calculateAge(age);

        resultDay.textContent = calculatedAge.days;
        resultMonth.textContent = calculatedAge.months;
        resultYear.textContent = calculatedAge.years;
    }
}

day.addEventListener('input', handleChange);
month.addEventListener('input',handleChange);
year.addEventListener('input', handleChange);
