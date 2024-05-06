document.addEventListener('DOMContentLoaded', function() {
    fetchCities();
    document.getElementById('citySelector').addEventListener('change', function() {
        displayTimeInfo(this.value);
    });
});

function fetchCities() {
    fetch('/cities')  // Adjusted to relative path assuming the same domain
        .then(response => response.json())
        .then(cities => {
            const citySelector = document.getElementById('citySelector');
            citySelector.innerHTML = cities.map(city => `<option value="${city.name}" data-timezone="${city.timezone}">${city.name}</option>`).join('');
            displayTimeInfo(citySelector.value); // Display time for the first city initially
        })
        .catch(error => console.error('Error fetching cities:', error));
}

function displayTimeInfo(city) {
    const timezone = document.querySelector(`option[value="${city}"]`).getAttribute('data-timezone');
    const date = new Date();

    // Options for displaying the current time without timezone name
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone
    };

    // Options for displaying the full timezone name
    const timezoneLongOptions = {
        timeZone: timezone,
        timeZoneName: 'long'  // Full name of the timezone
    };

    // Options for displaying the abbreviated timezone name
    const timezoneShortOptions = {
        timeZone: timezone,
        timeZoneName: 'short'  // Abbreviated name of the timezone
    };

    const timeFormatted = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
    const timezoneFull = new Intl.DateTimeFormat('en-US', timezoneLongOptions).format(date).split(', ')[1]; // Extracting full timezone name
    const timezoneShort = new Intl.DateTimeFormat('en-US', timezoneShortOptions).format(date).split(', ')[1]; // Extracting abbreviated timezone name

    document.getElementById('currentCity').textContent = city;
    document.getElementById('currentTime').textContent = timeFormatted;
    document.getElementById('timezone').textContent = `${timezoneFull} (${timezoneShort})`; // Now contains both full and abbreviated names
}

