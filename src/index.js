import 'bootstrap/dist/css/bootstrap.min.css';
import { ifElse, isEmpty, pipe } from 'ramda';
import Results from './Results';
import getInputValue from './getInputValue';
import getWikipediaSearchUrlFor from './getWikipediaSearchUrlFor';

// const R = require('ramda');

const doNothing = () => {};

const render = markup => {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = markup;
};

const searchAndRenderResults = pipe(
    // getInputValue,
    getWikipediaSearchUrlFor,
    (url)=>{
        fetch(url)
        .then(res => res.json())
        .then(Results)
        .then(render)
        .catch(err => console.log(err))
    }
);

const makeSearchRequestIfValid = pipe(
    getInputValue,
    ifElse(isEmpty, doNothing, searchAndRenderResults)
);

const inputElement = document.querySelector('input');

inputElement.addEventListener('keyup', makeSearchRequestIfValid);

// const Results = ([query, titles, descriptions, links]) => (
//     `
//         <h2>Searching for "${query}"</h2>
//         <ul class="list-group">
//             ${titles.map(
//                 (title, index)=>(
//                     `
//                     <li class="list-group-item">
//                         <a href=${links[index]}>${title}</a>
//                         <p>${descriptions[index]}</p>
//                     </li>
//                     `
//                 )).join('')
//             }
//         </ul>
//     `
// )
// const getInputValue = R.pipe(R.pathOr('',['target','value']), R.trim);
// const baseUrl = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
// const getWikipediaSearchUrlFor = R.concat(baseUrl);



