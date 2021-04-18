import throttle from 'lodash.throttle';
import './styles.css';
import tamplate from './tamplates/tamplate.hbs';
import countriesTamplate from './tamplates/countryList.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, defaultModules } from '@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.delay = 1000;

const refs = {
    formEl: document.querySelector('.js-form'),
    containerEl: document.querySelector('.container'),
};

let eTargetValue;

refs.formEl.addEventListener('input', throttle(inputValue, 1000));

function inputValue(e) {
    eTargetValue = e.target.value;
   
    const country = fetch(`${BASE_URL}/${eTargetValue}`)
    .then(response => {
    return response.json()
    })
    .then(data => {
        console.log(data);
        if (data.length > 2 && data.length < 10) {
            return renderCountriesCard(data);
        }
        else if (data.length === 1) {
            return renderOneCountryCard(data);
        }
        else if (data.length > 10) {
           alert({
            text: 'Введите более подробный запрос!'
           });
        }; 
    })
    .catch(error => {
        console.log(error)
    })
};

const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function renderOneCountryCard(data) {
    const markUp = tamplate(data);
        refs.containerEl.innerHTML = markUp;
};
function renderCountriesCard(data) {
    const markUpArr = countriesTamplate(data);
            refs.containerEl.innerHTML = markUpArr;
};

