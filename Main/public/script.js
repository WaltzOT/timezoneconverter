document.addEventListener('DOMContentLoaded', function() {
    fetchCities();
    document.getElementById('citySelector').addEventListener('change', function() {
        displayTimeInfo(this.value);
    });
    document.getElementById('switchToUTC').addEventListener('click', function() {
        switchToUTC();
    });
    document.getElementById('switchToLocal').addEventListener('click', function() {
        switchToLocal();
    });
    document.getElementById('addCityButton').addEventListener('click', function() {
        addNewCity();
    });
    document.getElementById('compareTimeButton').addEventListener('click', function() {
        compareTimeDifference();
    });
});

function fetchCities() {
    fetch('/cities')
        .then(response => response.json())
        .then(cities => {
            const citySelector = document.getElementById('citySelector');
            const city1Selector = document.getElementById('city1Selector');
            const city2Selector = document.getElementById('city2Selector');
            citySelector.innerHTML = cities.map(city => `<option value="${city.name}" data-timezone="${city.timezone}">${city.name}</option>`).join('');
            city1Selector.innerHTML = cities.map(city => `<option value="${city.timezone}">${city.name}</option>`).join('');
            city2Selector.innerHTML = cities.map(city => `<option value="${city.timezone}">${city.name}</option>`).join('');
            displayTimeInfo(citySelector.value);
            showButton('switchToUTC');
        })
        .catch(error => console.error('Error fetching cities:', error));
}

function displayTimeInfo(city) {
    const timezone = document.querySelector(`option[value="${city}"]`).getAttribute('data-timezone');
    updateTimeAndTimezone(city, timezone);
}

function switchToUTC() {
    fetch('/cities/utc')
        .then(response => response.json())
        .then(data => {
            const citySelector = document.getElementById('citySelector');
            citySelector.innerHTML = data.map(city => `<option value="${city.name}" data-timezone="${city.timezone}">${city.name}</option>`).join('');
            displayTimeInfo(citySelector.value);
            showButton('switchToLocal');
        })
        .catch(error => console.error('Error fetching cities in UTC timezone:', error));
}

function switchToLocal() {
    fetch('/cities/local')
        .then(response => response.json())
        .then(data => {
            const citySelector = document.getElementById('citySelector');
            citySelector.innerHTML = data.map(city => `<option value="${city.name}" data-timezone="${city.timezone}">${city.name}</option>`).join('');
            displayTimeInfo(citySelector.value);
            showButton('switchToUTC');
        })
        .catch(error => console.error('Error fetching cities in local timezone:', error));
}

function addNewCity() {
    const newCity = document.getElementById('newCity').value;

    if (!newCity) {
        alert('Please enter a city.');
        return;
    }

    fetch('/add-city', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newCity })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchCities(); // Refresh the city list
            document.getElementById('newCity').value = '';
        } else {
            alert('Error adding city.');
        }
    })
    .catch(error => console.error('Error adding city:', error));
}

function compareTimeDifference() {
    const timeZone1 = document.getElementById('city1Selector').value;
    const timeZone2 = document.getElementById('city2Selector').value;

    if (!timeZone1 || !timeZone2) {
        alert('Please select both cities.');
        return;
    }

    fetch(`/api/time-difference?timeZone1=${timeZone1}&timeZone2=${timeZone2}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert(`Time difference between ${data.timeZone1} and ${data.timeZone2} is ${data.difference}`);
            }
        })
        .catch(error => console.error('Error fetching time difference:', error));
}

function updateTimeAndTimezone(city, timezone) {
    const date = new Date();

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone
    };

    const timezoneLongOptions = {
        timeZone: timezone,
        timeZoneName: 'long'
    };

    const timezoneShortOptions = {
        timeZone: timezone,
        timeZoneName: 'short'
    };

    const timeFormatted = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
    const timezoneFull = new Intl.DateTimeFormat('en-US', timezoneLongOptions).format(date).split(', ')[1];
    const timezoneShort = new Intl.DateTimeFormat('en-US', timezoneShortOptions).format(date).split(', ')[1];

    document.getElementById('currentCity').textContent = city;
    document.getElementById('currentTime').textContent = timeFormatted;
    document.getElementById('timezone').textContent = `${timezoneFull} (${timezoneShort})`;
}

function showButton(buttonId) {
    document.getElementById('switchToUTC').classList.add('hidden');
    document.getElementById('switchToLocal').classList.add('hidden');
    document.getElementById(buttonId).classList.remove('hidden');
}
