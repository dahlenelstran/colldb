<script lang="ts">
    import "$lib/assets/css/global.css";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import type { PageData } from './$types';
    export let data: PageData;

    // Generating overall numbers

    let totalParts = 0;
    let totalMinifigs = 0;
    let totalMSRP = 0;

    if (data?.sets) {
        totalParts = data.sets.reduce((sum, x) => sum + (x.pieces ?? 0), 0);
        totalMinifigs = data.sets.reduce((sum, x) => sum + (x.minifigs ?? 0), 0);
        totalMSRP = data.sets.reduce((sum, x) => sum + (Number(x.msrp) || 0), 0);
    }

    let averagePPP = (totalMSRP / totalParts).toFixed(2);
    let averagePPM = (totalMSRP / totalMinifigs).toFixed(2);

    let timeSpan = Math.max(...data.years) - Math.min(...data.years) + 1;
    let averageYearly = (totalMSRP / timeSpan).toFixed(2);

    let averageSetPrice = (totalMSRP / data.sets.length).toFixed(2);
    let averageSetPieces = (totalParts / data.sets.length).toFixed(2);
    let averageSetMinifigs = (totalMinifigs / data.sets.length).toFixed(2);

    // Per year data

    function getYearlyMSRP(year: number): number {
        let sum = 0;
        for (const set of data.sets) {
            if (set.year === year) {
                sum += Number(set.msrp) || 0;
            }
        }
        return sum;
    }

    function getYearlySets(year: number): number {
        return data.sets.filter(set => set.year === year).length;
    }

    function getYearlyPieces(year: number): number {
        return data.sets.reduce((sum, set) => {
            return set.year === year ? sum + (set.pieces ?? 0) : sum;
        }, 0);
    }

    function getYearlyMinifigs(year: number): number {
        return data.sets.reduce((sum, set) => {
            return set.year === year ? sum + (set.minifigs ?? 0) : sum;
        }, 0);
    }

    function getYearlyPPP(year: number): number {
        const yearlyMSRP = getYearlyMSRP(year);
        const yearlyPieces = getYearlyPieces(year);
        return (yearlyPieces ? (yearlyMSRP / yearlyPieces) : 0);
    }

    function getYearlyPPM(year: number): number {
        const yearlyMSRP = getYearlyMSRP(year);
        const yearlyMinifigs = getYearlyMinifigs(year);
        return (yearlyMinifigs ? (yearlyMSRP / yearlyMinifigs) : 0);
    }

    function getYearlyAvgSetPrice(year: number): number {
        const yearlySets = getYearlySets(year);
        const yearlyMSRP = getYearlyMSRP(year);
        return (yearlySets ? (yearlyMSRP / yearlySets) : 0);
    }

    function getYearlyAvgSetPieces(year: number): number {
        const yearlySets = getYearlySets(year);
        const yearlyPieces = getYearlyPieces(year);
        return (yearlySets ? (yearlyPieces / yearlySets) : 0);
    }

    function getYearlyAvgSetMinifigs(year: number): number {
        const yearlySets = getYearlySets(year);
        const yearlyMinifigs = getYearlyMinifigs(year);
        return (yearlySets ? (yearlyMinifigs / yearlySets) : 0);
    }

    // Generating graphs

        let msrpBarCanvas: HTMLCanvasElement;

    const msrpPerYear = data.years.map(y => {
        return data.sets
            .filter(set => set.year === y)
            .reduce((sum, set) => sum + (Number(set.msrp) || 0), 0);
    });

    // Number of sets per year
const setsPerYear = data.years.map(y =>
    data.sets.filter(set => set.year === y).length
);

// Pieces per year
const piecesPerYear = data.years.map(y =>
    data.sets.filter(set => set.year === y).reduce((sum, set) => sum + (set.pieces ?? 0), 0)
);

// Minifigs per year
const minifigsPerYear = data.years.map(y =>
    data.sets.filter(set => set.year === y).reduce((sum, set) => sum + (set.minifigs ?? 0), 0)
);

// Average PPP (Price Per Piece) per year
const avgPPPPerYear = data.years.map((y, i) =>
    piecesPerYear[i] ? msrpPerYear[i] / piecesPerYear[i] : 0
);

// Average PPM (Price Per Minifig) per year
const avgPPMPerYear = data.years.map((y, i) =>
    minifigsPerYear[i] ? msrpPerYear[i] / minifigsPerYear[i] : 0
);

// Average Set Price per year
const avgSetPricePerYear = data.years.map((y, i) =>
    setsPerYear[i] ? msrpPerYear[i] / setsPerYear[i] : 0
);

// Average Set Pieces per year
const avgSetPiecesPerYear = data.years.map((y, i) =>
    setsPerYear[i] ? piecesPerYear[i] / setsPerYear[i] : 0
);

// Average Set Minifigs per year
const avgSetMinifigsPerYear = data.years.map((y, i) =>
    setsPerYear[i] ? minifigsPerYear[i] / setsPerYear[i] : 0
);

// Canvas refs
let setsBarCanvas: HTMLCanvasElement;
let piecesBarCanvas: HTMLCanvasElement;
let minifigsBarCanvas: HTMLCanvasElement;
let avgPPPBarCanvas: HTMLCanvasElement;
let avgPPMBarCanvas: HTMLCanvasElement;
let avgSetPriceBarCanvas: HTMLCanvasElement;
let avgSetPiecesBarCanvas: HTMLCanvasElement;
let avgSetMinifigsBarCanvas: HTMLCanvasElement;

    onMount(() => {
        if (msrpBarCanvas) {
            new Chart(msrpBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Total MSRP",
                        data: msrpPerYear,
                        backgroundColor: "#42a5f5"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Total MSRP ($)" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (setsBarCanvas) {
            new Chart(setsBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Number of Sets",
                        data: setsPerYear,
                        backgroundColor: "#66bb6a"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Sets" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (piecesBarCanvas) {
            new Chart(piecesBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Total Pieces",
                        data: piecesPerYear,
                        backgroundColor: "#ffa726"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Pieces" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (minifigsBarCanvas) {
            new Chart(minifigsBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Total Minifigs",
                        data: minifigsPerYear,
                        backgroundColor: "#ab47bc"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Minifigs" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (avgPPPBarCanvas) {
            new Chart(avgPPPBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Average PPP",
                        data: avgPPPPerYear,
                        backgroundColor: "#26c6da"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Price Per Piece ($)" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (avgPPMBarCanvas) {
            new Chart(avgPPMBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Average PPM",
                        data: avgPPMPerYear,
                        backgroundColor: "#ef5350"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Price Per Minifig ($)" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (avgSetPriceBarCanvas) {
            new Chart(avgSetPriceBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Average Set Price",
                        data: avgSetPricePerYear,
                        backgroundColor: "#8d6e63"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Average Set Price ($)" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (avgSetPiecesBarCanvas) {
            new Chart(avgSetPiecesBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Average Set Pieces",
                        data: avgSetPiecesPerYear,
                        backgroundColor: "#789262"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Average Set Pieces" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
        if (avgSetMinifigsBarCanvas) {
            new Chart(avgSetMinifigsBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Average Set Minifigs",
                        data: avgSetMinifigsPerYear,
                        backgroundColor: "#ffd600"
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Average Set Minifigs" } },
                        x: { title: { display: true, text: "Year" } }
                    }
                }
            });
        }
    });
</script>

<div class="container">

    <h1 class="aurabesh">LEGO Statistics</h1>

    <div class="info">
        <div class="stat-header">
            <span>Overall Statistics</span>
        </div>
        <div class="stat-body">
            <div>
                <span class="highlight">{data.sets.length}</span>
                <span> Total Sets</span>
            </div>
            <div>
                <span class="highlight">{totalParts}</span>
                <span> Total Parts</span>
            </div>
            <div>
                <span class="highlight">{totalMinifigs}</span>
                <span> Total Minifigs</span>
            </div>
            <div>
                <span class="highlight">${totalMSRP}</span>
                <span> Total MSRP</span>
            </div>
            <div>
                <span class="highlight">${(totalMSRP*1.0975).toFixed(2)}</span>
                <span> Total MSRP taxed</span>
            </div>
            <div>
                <span class="highlight">${averagePPP}</span>
                <span> Average Price Per Part</span>
            </div>
            <div>
                <span class="highlight">${averagePPM}</span>
                <span> Average Price Per Minifig</span>
            </div>
            <div>
                <span class="highlight">${averageYearly}</span>
                <span> Average Yearly Spending</span>
            </div>
            <div>
                <span class="highlight">${averageSetPrice}</span>
                <span> Average Set Price</span>
            </div>
            <div>
                <span class="highlight">{averageSetPieces}</span>
                <span> Average Set Pieces</span>
            </div>
            <div>
                <span class="highlight">{averageSetMinifigs}</span>
                <span> Average Set Minifigs</span>
            </div>
        </div>
    </div>

    <!-- Per Year Info -->

    {#each data.years as y}
        <div class="info">
            <div class="stat-header">
                <span>Statistics for {y}</span>
            </div>
            <div class="stat-body">
                <div>
                    <span class="highlight">{getYearlySets(y)}</span>
                    <span> Total Sets</span>
                </div>
                <div>
                    <span class="highlight">{getYearlyPieces(y)}</span>
                    <span> Total Pieces</span>
                </div>
                <div>
                    <span class="highlight">{getYearlyMinifigs(y)}</span>
                    <span> Total Minifigs</span>
                </div>
                <div>
                    <span class="highlight">${getYearlyMSRP(y).toFixed(2)}</span>
                    <span> Total Spent</span>
                </div>
                <div>
                    <span class="highlight">${getYearlyPPP(y).toFixed(2)}</span>
                    <span> Average PPP</span>
                </div>
                <div>
                    <span class="highlight">${getYearlyPPM(y).toFixed(2)}</span>
                    <span> Average PPM</span>
                </div>
                <div>
                    <span class="highlight">${getYearlyAvgSetPrice(y).toFixed(2)}</span>
                    <span> Average Set Price</span>
                </div>
                <div>
                    <span class="highlight">{getYearlyAvgSetPieces(y).toFixed(2)}</span>
                    <span> Average Set Pieces</span>
                </div>
                <div>
                    <span class="highlight">{getYearlyAvgSetMinifigs(y).toFixed(2)}</span>
                    <span> Average Set Minifigs</span>
                </div>
            </div>
        </div>
    {/each}

    <h2>Total MSRP by Year</h2>
    <canvas bind:this={msrpBarCanvas} width="600" height="300"></canvas>

    <h2>Number of Sets by Year</h2>
    <canvas bind:this={setsBarCanvas} width="600" height="300"></canvas>

    <h2>Total Pieces by Year</h2>
    <canvas bind:this={piecesBarCanvas} width="600" height="300"></canvas>

    <h2>Total Minifigs by Year</h2>
    <canvas bind:this={minifigsBarCanvas} width="600" height="300"></canvas>

    <h2>Average Price Per Piece (PPP) by Year</h2>
    <canvas bind:this={avgPPPBarCanvas} width="600" height="300"></canvas>

    <h2>Average Price Per Minifig (PPM) by Year</h2>
    <canvas bind:this={avgPPMBarCanvas} width="600" height="300"></canvas>

    <h2>Average Set Price by Year</h2>
    <canvas bind:this={avgSetPriceBarCanvas} width="600" height="300"></canvas>

    <h2>Average Set Pieces by Year</h2>
    <canvas bind:this={avgSetPiecesBarCanvas} width="600" height="300"></canvas>

    <h2>Average Set Minifigs by Year</h2>
    <canvas bind:this={avgSetMinifigsBarCanvas} width="600" height="300"></canvas>
</div>