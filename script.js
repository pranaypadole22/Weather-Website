document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = '51f59038dc1488e03ee1763cbcbdb6af'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data to the console for debugging
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
            document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
            document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

            const weatherAnimation = document.getElementById('weatherAnimation');
            weatherAnimation.innerHTML = ''; // Clear previous animation

            const weatherMain = data.weather[0].main.toLowerCase();

            if (weatherMain.includes('rain')) {
                const rainDiv = document.createElement('div');
                rainDiv.classList.add('rain');
                weatherAnimation.appendChild(rainDiv);
            } else if (weatherMain.includes('clear')) {
                const sunDiv = document.createElement('div');
                sunDiv.classList.add('sun');
                weatherAnimation.appendChild(sunDiv);
            }
            // Add more conditions for other weather types as needed
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
});
