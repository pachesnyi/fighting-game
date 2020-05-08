const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

fetch(API_URL)
    .then( response => {
        if(!response.ok) {
            Promise.reject(new Error('Failed to load data'));
        }
        return response.json();
    } )
    .then(file => {
        const fighters = JSON.parse(atob(file.content));
        console.log(fighters);
        const names = fighters.map(it => it.name).join('\n')
        rootElement.innerText = names;
    })
    .catch(error=>{
        console.warn(error);
        rootElement.innerText = 'Failed to load data';
    })
    .finally(()=>{
        loadingElement.remove();
    })
