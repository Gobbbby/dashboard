// making the search bar form functionality
document.getElementById('search-form').addEventListener('submit', (form) => {
    form.preventDefault();
    window.location.href = `https://duckduckgo.com/?q=${document.getElementById('search-txt').value}`;
});


// making the time and date functionality
var zeroFormat = (timeStr) => timeStr.toString().length == 2 ? timeStr : '0' + timeStr;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function updateTime() {
    let now = new Date(),
        date = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
        hours = now.getHours() > 12 ? now.getHours()-12 : now.getHours(),
        time = `${zeroFormat(hours)}:${zeroFormat(now.getMinutes())}`;

    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;

    setTimeout(updateTime, 1500);
}

updateTime();


// making the weather glyphs functionality
const imageCodes = {
    'clear sky': 'sun',
    'few clouds': 'cloud-sun',
    'scattered clouds': 'cloud',
    'broken clouds': 'cloud-sun',
    'overcast clouds': 'cloud-sun',
    'shower rain': 'cloud-showers-heavy',
    'light rain': 'cloud-showers-heavy',
    'moderate rain': 'cloud-showers-heavy',
    'rain': 'cloud-sun-rain',
    'thunderstorm': 'bolt',
    'snow': 'snowflake',
    'mist': 'smog',
}
const api = 'https://api.openweathermap.org/data/2.5/weather?id=6173577&units=metric&appid=2021dc531ebc043065163783f251a3a9';

$.getJSON(api, (data) => {
    // getting the correct FontAwesome icon with a fontawesome class based on the dictionary I made above
    document.getElementById('weather-icon').classList.add(`fa-${imageCodes[data['weather'][0]['description']]}`);
    // adding the wind icon if the wind speed is over 5 km/h
    if (data['wind']['speed'] > 5) { document.getElementById('wind-icon').classList.add('fa-wind'); }
    // adding the weather details in text, and roudning the degrees to one decimal place
    document.getElementById('weather-text').innerHTML = ` ${data['weather'][0]['description']}, ${data['main']['temp'].toFixed(1)}ºC`;
});
