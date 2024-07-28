document.addEventListener('DOMContentLoaded', function() {
    const zone = 'MLK01'; // Replace with your zone code
    const apiUrl = `https://api.waktusolat.app/v2/solat/${zone}`;

    function getCurrentTime(){
        let time = document.getElementById('current_time');
        let date = new Date().toLocaleDateString('en-MY');
        // console.log('Current Date:', date);


        setInterval(() => {
            let d = new Date();
            time.innerHTML = d.toLocaleTimeString();
        }, 1000);
    }

    function getCurrentDate(){
        let date = document.getElementById('current_date');
        let d = new Date().toLocaleDateString('en-MY');
        console.log(' Date:', d);
        date.innerHTML = d;
    }

    getCurrentTime(); 
    getCurrentDate();

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Full API Response:', data); // Log the full API response
            
            //meaning check if the data object has a property called 'prayers'
            if (!data.prayers) {
                throw new Error('No data property in the response');
            }

            const prayerTimes = data.prayers;
            console.log('PrayerTimes:', data.prayers);
            const prayerTimesContainer = document.getElementById('prayer-times');
            
            prayerTimesContainer.innerHTML = `
                <h3>Prayer Times</h3>
                <p>Day: ${new Date(prayerTimes.date)}</p>
                <p>Fajr: ${new Date(prayerTimes.fajr * 1000)}</p>
                <p>Dhuhr: ${new Date(prayerTimes.dhuhr * 1000).toLocaleTimeString()}</p>
                <p>Asr: ${new Date(prayerTimes.asr * 1000).toLocaleTimeString()}</p>
                <p>Maghrib: ${new Date(prayerTimes.maghrib * 1000).toLocaleTimeString()}</p>
                <p>Isha: ${new Date(prayerTimes.isha * 1000).toLocaleTimeString()}</p>
                <p>Syuruk: ${new Date(prayerTimes.syuruk * 1000).toLocaleTimeString()}</p>
            `;
            console.log('Prayer Times:', prayerTimes.fajr);
        })
        .catch(error => console.error('Error fetching prayer times:', error));
});
