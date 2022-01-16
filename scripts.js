const endpoint = 'https://raw.githubusercontent.com/thatisuday/indian-cities-database/master/cities.json';
const cities = [];
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));
function findMatches(wordToMatch, cities) {
    const regex = new RegExp(wordToMatch, 'gi');
    return cities.filter(place => {
        return place.city.match(regex) || place.state.match(regex);
    });
}
function displayMatches() {
    if (this.value === undefined || this.value === null || this.value === '') {
        suggestions.innerHTML = `<li>Filter for a city</li><li> or a state</li>`;
        return;
    }
    const matchArray = findMatches(this.value, cities);
    const regex = new RegExp(this.value, 'gi');
    const html = matchArray.map(place => {
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);