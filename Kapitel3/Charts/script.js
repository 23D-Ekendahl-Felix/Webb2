
        const graf = document.getElementById('graf');
        new Chart(graf, {
            type: 'line',
            data: {

                labels,
                datasets: [{
                    label: 'Känsla (0-10)',
                    temps,
                    borderColor: 'gteen',
                    backgroundColor: 'rgba(173,216,230,0.3)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });

        //hämtaprognosen från smhi api
        const url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.06/lat/59.33/data.json";
        fetch(url)
            .then(svar => svar.json())
            .then(data => {
                const timeSerise = data.timeSerise.slice(0, 48);
                const labels = [];
                const temps = [];
                timeSerise.forEach(item => {
                    const radT = item.parameters.find(p => p.name === 't');
                    const temp = radT?.value?.[0];
                    const datum = item.validTime.slice(0, 10);
                    console.log(datum, temp);
                    labels.push(datum);
                    temps.push(temp);
                });
            });
