async function getPrayerTimes() {
    const county = document.getElementById('countySelect').value;
    const city = document.getElementById('cityInput').value;
    const date = document.getElementById('dateInput').value;
    if (!county || !city || !date) return;

    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('prayerTimes').innerHTML = '';

    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Kenya&method=2&date=${date}`);
        const data = await response.json();
        
        if (data.code === 200) {
            const times = data.data.timings;
            const prayerTimesHtml = `
                <p>Fajr: ${times.Fajr}</p>
                <p>Dhuhr: ${times.Dhuhr}</p>
                <p>Asr: ${times.Asr}</p>
                <p>Maghrib: ${times.Maghrib}</p>
                <p>Isha: ${times.Isha}</p>
            `;
            document.getElementById('prayerTimes').innerHTML = prayerTimesHtml;
        } else {
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').innerText = 'Error fetching prayer times.';
        }
    } catch (error) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerText = 'Error fetching prayer times.';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}
