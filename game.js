import { getClue as getClueFromCallback } from './callback-version.js';
import { getClue as getClueFromPromise } from './promise-version.js';
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'

const button = document.getElementById('use-callback');

function setHtmlFromClue(clue) {
    const question = document.getElementById('question');
    const answer = document.getElementById('answer');
    const value = document.getElementById('value');
    const catTitle = document.getElementById('category-title');

    question.innerHTML = clue.question;
    answer.innerHTML = clue.answer;
    value.innerHTML = clue.value;
    catTitle.innerHTML = clue.category.title

    const invalidCount = document.getElementById('invalid-count');
    if (clue.invalid_count && clue.invalid_count > 0) {
        invalidCount.innerHTML = "invalid";
    } else {
        invalidCount.innerHTML = "valid";
    }
}

button.addEventListener('click', () => {
    getClueFromCallback((err, clue) => {
        if (err !== null) return console.error(err);
        setHtmlFromClue(clue);
    });
})

const promiseButton = document.getElementById('use-promise');
promiseButton.addEventListener('click', () => {
    getClueFromPromise()
        .then(clue => setHtmlFromClue(clue))
        .catch(err => console.error(err.message));
});


const asyncButton = document.getElementById('use-async-await');
asyncButton.addEventListener('click', async() => {
    try {
        const clue = await getClueFromAsyncFunction();
        setHtmlFromClue(clue);
    } catch (error) {
        console.error(error.message);
    }
})

const checkResponse = document.getElementById('check-response');
const textArea = document.getElementById('player-response');
const answerElement = document.getElementById('answer');
const score = document.getElementById('score');
const valueDiv = document.getElementById('value');
checkResponse.addEventListener('click', (event) => {
    const finalValue = textArea.value.trim().toLowerCase();
    const answerValue = answerElement.innerHTML.trim().toLocaleLowerCase();
    if (finalValue === answerValue) {
        score.innerHTML = Number(score.innerHTML) + Number(valueDiv.innerHTML);
    } else {
        score.innerHTML = Number(score.innerHTML) - Number(valueDiv.innerHTML);
    }
    answerElement.classList.remove('is-hidden');
    checkResponse.classList.add('is-hidden');
});

const buttonHolder = document.getElementById('game-board');
buttonHolder.addEventListener('click', event => {
    checkResponse.classList.remove('is-hidden');
    textArea.value = '';
    answerElement.classList.add('is-hidden');

})
