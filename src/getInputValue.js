import { ifElse, map, pathOr, pipe, tap, trim } from 'ramda';

export default pipe(
    // map(e => e.keyCode===16 ? e.preventDefault() : e),
    // tap(e => {
    //             console.log("Value:", e.target.value);
    //             console.log("Key code:", e.keyCode);
    //          }
    // ),
    pathOr('', ['target', 'value']),

    trim
);