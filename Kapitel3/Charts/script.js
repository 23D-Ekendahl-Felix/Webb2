// bitcoinChart.js
// Se till att du har en <canvas id="graf"></canvas> i din HTML
// och att du laddar in Chart.js via CDN innan denna fil.

async function createBitcoinChart() {
    const graf = document.getElementById('graf');

    const chart = new Chart(graf, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Bitcoin (USD)',
                data: [],
                borderColor: 'green',
                backgroundColor: 'rgba(173,216,230,0.3)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            scales: { y: { beginAtZero: false } }
        }
    });

    async function fetchBTC() {
        const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly";
        const svar = await fetch(url);
        const data = await svar.json();

        // CoinGecko returnerar [timestamp, price]
        const priser = data.prices;
        const labels = priser.map(p => new Date(p[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        const values = priser.map(p => p[1]);

        chart.data.labels = labels;
        chart.data.datasets[0].data = values;
        chart.update();
    }

    // Kör direkt och uppdatera var 60:e sekund
    fetchBTC();
    setInterval(fetchBTC, 600);
}

// Starta när sidan laddats
window.addEventListener('DOMContentLoaded', createBitcoinChart);
