// document.body.style.height = `${document.body.clientHeight}px`;
let count = 0;
let current_count = 23;
let user_filter = 'All';
// Filtering results `all` is the defualt value
async function countries() {
    let see_more = document.querySelector('.see-more')
        // `see-more btn` (global in this function)
    let api = await (await fetch('https://restcountries.com/v3.1/all')).json();

    async function addCountries() {
        for (; count < current_count;) {
            // Sign needed info (API)
            // if (api[count].region === 'Africa') {


            let api_country_flag = await api[count].flags.png;
            let api_country_name = await api[count].name.common;
            let api_country_population = await api[count].population;
            let api_country_region = await api[count].region;
            let api_country_capital = await api[count].capital;

            function setInfo() {
                // Create country
                let country = document.createElement('div');
                country.classList.add('country');
                // country img
                let country_flag = document.createElement('div');
                country_flag.classList.add('country-flag');

                let flag_img = document.createElement('img');
                country_flag.append(flag_img);

                flag_img.src = api_country_flag;

                country.append(country_flag);

                flag_img.onload = () => {

                    country.innerHTML += `
                        <div class="info">
                            <div class="country-name"><span class="value">${api_country_name}</span></div>
                            <span class="population">Population: <span class="value">${api_country_population}</span></span>
                            <span class="region">Region: <span class="value">${api_country_region}</span></span>
                            <span class="capital">Capital: <span class="value">${api_country_capital}</span></span>
                        </div>
                        `;
                    // Add the country
                    see_more.before(country)
                        // the `see_more` btn will be under all countries

                    // Add the next country

                    let loading = document.querySelector('.loading');
                    loading.style.display = 'none';
                    if (count >= current_count) {
                        current_count *= 2;
                    }
                }
            }

            function filtering() {
                if (user_filter === 'All') {
                    setInfo();
                    count++;

                } else if (api[count].region === user_filter) {
                    setInfo();
                    count++;
                } else {
                    count++;
                    current_count++;

                }
            }

            filtering();

            (function selectMenu() {
                let select = document.querySelector('.select span');
                let drop_down = document.querySelector('.select .drop-down');
                select.onclick = () => {
                    drop_down.classList.toggle('active');
                }

                let options = document.querySelectorAll('.drop-down li');
                options.forEach(option => {
                    option.onclick = async function() {
                        let continent_name = option.textContent;
                        select.innerHTML = `${continent_name}  <i class="icon-down-open">`;

                        count = 0;
                        current_count = 23;

                        // delete all the exist countries
                        // and add new according to the filter
                        let clear_countries = document.querySelectorAll('.countries-container > div');
                        clear_countries_length = clear_countries.length;
                        for (let country = 0; country < clear_countries_length; country++) {
                            if (clear_countries[country].className !== 'see-more') {
                                clear_countries[country].style.display = 'none';
                                let search_input = document.querySelector('.search input');
                                search_input.value = '';
                            }
                        }


                        user_filter = continent_name;
                        await addCountries();
                        // filtering();
                    }

                })
            }());


            if (count === 250) {
                console.log('Quit')
                see_more.style.display = 'none';
                break;
            } else {
                see_more.style.display = 'flex';
            }
        }
    }

    addCountries();

    function moreCountres() {
        // Loading more countris
        see_more.onclick = () => {
            addCountries();
        }
    }

    moreCountres();

    async function search() {
        let search = document.querySelector('.search');
        let search_btn = search.querySelector('i');

        search_btn.onclick = async() => {
            let search_input = search.querySelector('.search input').value;

            for (let name = 0; name < api.length; name++) {
                if (api[name].name.common === search_input || api[name].name.common.toLowerCase() === search_input) {
                    console.log(true);

                    let countries_container = document.querySelector('.countries-container');
                    let countries_container_children = document.querySelectorAll('.countries-container > div');
                    console.log(countries_container_children);
                    countries_container_children.forEach(country => {
                        country.style.display = 'none';
                        console.log('hi')
                    });

                    // Add the country searched for 

                    let api_country_flag = await api[name].flags.png;
                    let api_country_name = await api[name].name.common;
                    let api_country_population = await api[name].population;
                    let api_country_region = await api[name].region;
                    let api_country_capital = await api[name].capital;

                    let country = document.createElement('div');
                    country.classList.add('country');
                    // country img
                    let country_flag = document.createElement('img');
                    country_flag.src = api_country_flag;

                    country.append(country_flag);

                    country.innerHTML += `
                        <div class="info">
                            <div class="country-name"><span class="value">${api_country_name}</span></div>
                            <span class="population">Population: <span class="value">${api_country_population}</span></span>
                            <span class="region">Region: <span class="value">${api_country_region}</span></span>
                            <span class="capital">Capital: <span class="value">${api_country_capital}</span></span>
                        </div>
                        `;

                    console.log(country);
                    countries_container.append(country);
                } else {
                    // console.log(false)
                }
            }

        }

    }
    search();
}
countries();


// Change the theme
let theme_btn = document.querySelector('.theme');
let theme = document.querySelector("#theme");
console.log(theme)
theme_btn.onclick = () => {
    theme.classList.toggle('active');
    let icon = theme_btn.querySelector('i');

    if (theme.classList.contains('active')) {
        theme.href = '';
        icon.className = 'icon-moon'
    } else {
        theme.href = './css/theme.css';
        icon.className = 'icon-moon-inv'
    }
}