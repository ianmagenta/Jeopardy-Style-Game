
export function getClue(cb){
    // Step 1
    const xhr = new XMLHttpRequest();
    // Step 2
    xhr.addEventListener('readystatechange', () => {
    // Step 2.1
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    // Step 2.2
    if (xhr.status < 200 || xhr.status >= 300) return;

    // Step 2.3
    const data = JSON.parse(xhr.responseText);
    cb(null, data);
    });

    // Step 3
    xhr.open('GET', 'https://jservice.xyz/api/random-clue');

    // Step 4
    xhr.send();
};
