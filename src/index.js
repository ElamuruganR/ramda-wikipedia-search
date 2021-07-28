import 'bootstrap/dist/css/bootstrap.min.css';
import { contains, equals, ifElse, isEmpty, map, pathOr, pipe, reject, tap, complement } from 'ramda';
import Results from './Results';
import getInputValue from './getInputValue';
import getWikipediaSearchUrlFor from './getWikipediaSearchUrlFor';


const doNothing = () => {};
const emptyString = () => "";

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
const isShiftKey = pipe(

    pathOr('', ['keyCode']),
    tap(x => console.log('pathOr keyCode: ',x)),
    equals(16),
    tap(x => console.log('retur:',x))
)
const makeSearchRequestIfValid = pipe(
    ifElse( isShiftKey,  emptyString, getInputValue),
    ifElse( isEmpty, doNothing, searchAndRenderResults)
);

const inputElement = document.querySelector('input');

inputElement.addEventListener('keyup', makeSearchRequestIfValid);
