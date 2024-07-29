document.addEventListener('DOMContentLoaded', function() {
    const zone = 'MLK01'; // Replace with your zone code
    const apiUrl = `https://api.waktusolat.app/v2/solat/${zone}`;

    let currentDay = getCurrentDay();
    console.log('currentDay:', currentDay);

    function getCurrentTime(){
        let time = document.getElementById('current_time');

        setInterval(() => {
            let d = new Date();
            time.innerHTML = d.toLocaleTimeString();
        }, 1000);
    }

    function getCurrentDate(){
        //get current date in full
        let date = document.getElementById('current_date');
        let d = new Date().toLocaleDateString('en-MY');
        console.log(' Date:', d);
        date.innerHTML = d;

    }

    function getCurrentDay(){
        //get current day value for tracking numerical day
        let x = new Date();
        let day = x.getDate();
        console.log(' day:', day);

        return day;

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
            
            //meaning check if the data object has no property called prayers, then throw an error
            if (!data.prayers) {
                throw new Error('No data property in the response');
            }

            const prayerTimes = data.prayers[currentDay - 1];
            console.log('test:', data.prayers[currentDay - 1]);
            setupPrayerTimes(prayerTimes);
            const prayerTimesContainer = document.getElementById('prayer-times');
            
            prayerTimesContainer.innerHTML = `
                <h3>Prayer Times</h3>
                <p>Day: ${(prayerTimes.day)}</p>
                <p>Fajr: ${new Date(prayerTimes.fajr * 1000).toLocaleTimeString()}</p>
                <p>Syuruk: ${new Date(prayerTimes.syuruk * 1000).toLocaleTimeString()}</p>
                <p>Dhuhr: ${new Date(prayerTimes.dhuhr * 1000).toLocaleTimeString()}</p>
                <p>Asr: ${new Date(prayerTimes.asr * 1000).toLocaleTimeString()}</p>
                <p>Maghrib: ${new Date(prayerTimes.maghrib * 1000).toLocaleTimeString()}</p>
                <p>Isha: ${new Date(prayerTimes.isha * 1000).toLocaleTimeString()}</p>
            `;
        })
        .catch(error => console.error('Error fetching prayer times:', error));


    function setupPrayerTimes(prayerTimes){
        const times = {
            fajr: new Date(prayerTimes.fajr * 1000).toLocaleTimeString(),
            syuruk: new Date(prayerTimes.syuruk * 1000).toLocaleTimeString(),
            dhuhr: new Date(prayerTimes.dhuhr * 1000).toLocaleTimeString(),
            asr: new Date(prayerTimes.asr * 1000).toLocaleTimeString(),
            maghrib: new Date(prayerTimes.maghrib * 1000).toLocaleTimeString(),
            isha: new Date(prayerTimes.isha * 1000).toLocaleTimeString(),
        };

        checkPrayerTimes(times);
    }

    function checkPrayerTimes(times){
        setInterval(() => {
            const now = new Date();

            for (const [prayer, time] of Object.entries(times)) {
                if (now.getHours() === time.getHours() && now.getMinutes() === time.getMinutes()) {
                    alert(`It's time for ${prayer} prayer!`);
                    playAudio();
                }   
            }   
        },1000);
    }

    // function playAudio(prayer){
    //     const audio = new Audio(`athan/${prayer}.mp3`);
    //     audio.play();
    // }

    function playAudio(){
        const audio = new Audio(`athan.mp3`);
        audio.play();
    }
        
});
