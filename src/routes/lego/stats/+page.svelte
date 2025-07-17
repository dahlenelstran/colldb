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

    // Per Theme Data

    function getThemeMSRP(themeId: number): number {
        let sum = 0;
        for (const set of data.sets) {
            if (set.theme_id === themeId) {
                sum += Number(set.msrp) || 0;
            }
        }
        return sum;
    }

    function getThemeSets(themeId: number): number {
        return data.sets.filter(set => set.theme_id === themeId).length;
    }

    function getThemePieces(themeId: number): number {
        return data.sets.reduce((sum, set) => {
            return set.theme_id === themeId ? sum + (set.pieces ?? 0) : sum;
        }, 0);
    }

    function getThemeMinifigs(themeId: number): number {
        return data.sets.reduce((sum, set) => {
            return set.theme_id === themeId ? sum + (set.minifigs ?? 0) : sum;
        }, 0);
    }

    function getThemePPP(themeId: number): number {
        const themeMSRP = getThemeMSRP(themeId);
        const themePieces = getThemePieces(themeId);
        return (themePieces ? (themeMSRP / themePieces) : 0);
    }

    function getThemePPM(themeId: number): number {
        const themeMSRP = getThemeMSRP(themeId);
        const themeMinifigs = getThemeMinifigs(themeId);
        return (themeMinifigs ? (themeMSRP / themeMinifigs) : 0);
    }

    function getThemeAvgSetPrice(themeId: number): number {
        const themeSets = getThemeSets(themeId);
        const themeMSRP = getThemeMSRP(themeId);
        return (themeSets ? (themeMSRP / themeSets) : 0);
    }

    function getThemeAvgSetPieces(themeId: number): number {
        const themeSets = getThemeSets(themeId);
        const themePieces = getThemePieces(themeId);
        return (themeSets ? (themePieces / themeSets) : 0);
    }

    function getThemeAvgSetMinifigs(themeId: number): number {
        const themeSets = getThemeSets(themeId);
        const themeMinifigs = getThemeMinifigs(themeId);
        return (themeSets ? (themeMinifigs / themeSets) : 0);
    }

    // Per License Data

    let licensedThemes = [];
    let unlicensedThemes = [];

    if (data?.themes) {
        licensedThemes = data.themes.filter(theme => theme.licensed === true);
        unlicensedThemes = data.themes.filter(theme => theme.licensed === false);
    }

    function getLicenseMSRP(themeArray: any []): number {
        return themeArray.reduce((sum, theme) => {
            return sum + data.sets.reduce((themeSum, set) => {
                return set.theme_id === theme.id ? themeSum + (Number(set.msrp) || 0) : themeSum;
            }, 0);
        }, 0);
    }

    function getLicenseSets(themeArray: any []): number {
        return themeArray.reduce((sum, theme) => {
            return sum + data.sets.filter(set => set.theme_id === theme.id).length;
        }, 0);
    }

    function getLicensePieces(themeArray: any []): number {
        return themeArray.reduce((sum, theme) => {
            return sum + data.sets.reduce((themeSum, set) => {
                return set.theme_id === theme.id ? themeSum + (set.pieces ?? 0) : themeSum;
            }, 0);
        }, 0);
    }

    function getLicenseMinifigs(themeArray: any []): number {
        return themeArray.reduce((sum, theme) => {
            return sum + data.sets.reduce((themeSum, set) => {
                return set.theme_id === theme.id ? themeSum + (set.minifigs ?? 0) : themeSum;
            }, 0);
        }, 0);
    }

    function getLicensePPP(themeArray: any []): number {
        const themeMSRP = getLicenseMSRP(themeArray);
        const themePieces = getLicensePieces(themeArray);
        return (themePieces ? (themeMSRP / themePieces) : 0);
    }

    function getLicensePPM(themeArray: any []): number {
        const themeMSRP = getLicenseMSRP(themeArray);
        const themeMinifigs = getLicenseMinifigs(themeArray);
        return (themeMinifigs ? (themeMSRP / themeMinifigs) : 0);
    }

    function getLicenseAvgSetPrice(themeArray: any []): number {
        const themeSets = getLicenseSets(themeArray);
        const themeMSRP = getLicenseMSRP(themeArray);
        return (themeSets ? (themeMSRP / themeSets) : 0);
    }

    function getLicenseAvgSetPieces(themeArray: any []): number {
        const themeSets = getLicenseSets(themeArray);
        const themePieces = getLicensePieces(themeArray);
        return (themeSets ? (themePieces / themeSets) : 0);
    }

    function getLicenseAvgSetMinifigs(themeArray: any []): number {
        const themeSets = getLicenseSets(themeArray);
        const themeMinifigs = getLicenseMinifigs(themeArray);
        return (themeSets ? (themeMinifigs / themeSets) : 0);
    }

    function getLicenseYearlyMSRP(themeArray: any []): number {
        const yearlyMSRP = getLicenseMSRP(themeArray);
        const timeSpan = Math.max(...data.years) - Math.min(...data.years) + 1;
        return timeSpan ? (yearlyMSRP / timeSpan) : 0;
    }

    // Generating graphs

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
    let msrpBarCanvas: HTMLCanvasElement;
    let setsBarCanvas: HTMLCanvasElement;
    let piecesBarCanvas: HTMLCanvasElement;
    let minifigsBarCanvas: HTMLCanvasElement;
    let avgPPPBarCanvas: HTMLCanvasElement;
    let avgPPMBarCanvas: HTMLCanvasElement;
    let avgSetPriceBarCanvas: HTMLCanvasElement;
    let avgSetPiecesBarCanvas: HTMLCanvasElement;
    let avgSetMinifigsBarCanvas: HTMLCanvasElement;

    // Colors
    // const blueAccent = getComputedStyle(document.documentElement).getPropertyValue('--blue-accent').trim();
    // const redAccent = getComputedStyle(document.documentElement).getPropertyValue('--red-accent').trim();
    const redAccent: string = "#e94560";
    const blueAccent: string = "#7da0fa";

    onMount(() => {
        if (msrpBarCanvas) {
            new Chart(msrpBarCanvas, {
                type: 'bar',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: "Total Spent",
                        data: msrpPerYear,
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: "Total Spent ($)" } },
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                        backgroundColor: blueAccent,
                        hoverBackgroundColor: redAccent
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
                <span class="highlight">{totalParts.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Parts</span>
            </div>
            <div>
                <span class="highlight">{totalMinifigs.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Minifigs</span>
            </div>
            <div>
                <span class="highlight">${totalMSRP.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Total MSRP</span>
            </div>
            <div>
                <span class="highlight">${(totalMSRP*1.0975).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                <span class="highlight">${Number(averageYearly).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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

    <!-- Per License Info -->

    <div class="info">
       <div class="stat-header">
            Statistics for Licensed Themes
       </div>
       <div class="stat-body">
            <div>
                <span class="highlight">{getLicenseSets(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Sets</span>
            </div>
            <div>
                <span class="highlight">{getLicensePieces(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Parts</span>
            </div>
            <div>
                <span class="highlight">{getLicenseMinifigs(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Minifigs</span>
            </div>
            <div>
                <span class="highlight">${getLicenseMSRP(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Total MSRP</span>
            </div>
            <div>
                <span class="highlight">${(getLicenseMSRP(licensedThemes)*1.0975).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Total MSRP taxed</span>
            </div>
            <div>
                <span class="highlight">${getLicensePPP(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Price Per Part</span>
            </div>
            <div>
                <span class="highlight">${getLicensePPM(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Price Per Minifig</span>
            </div>
            <div>
                <span class="highlight">${getLicenseYearlyMSRP(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Yearly Spending</span>
            </div>
            <div>
                <span class="highlight">${getLicenseAvgSetPrice(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Set Price</span>
            </div>
            <div>
                <span class="highlight">{getLicenseAvgSetPieces(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                <span> Average Set Pieces</span>
            </div>
            <div>
                <span class="highlight">{getLicenseAvgSetMinifigs(licensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                <span> Average Set Minifigs</span>
            </div>
       </div>
    </div>

    <div class="info">
       <div class="stat-header">
            Statistics for Unlicensed Themes
       </div>
       <div class="stat-body">
            <div>
                <span class="highlight">{getLicenseSets(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Sets</span>
            </div>
            <div>
                <span class="highlight">{getLicensePieces(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Parts</span>
            </div>
            <div>
                <span class="highlight">{getLicenseMinifigs(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                <span> Total Minifigs</span>
            </div>
            <div>
                <span class="highlight">${getLicenseMSRP(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Total MSRP</span>
            </div>
            <div>
                <span class="highlight">${(getLicenseMSRP(unlicensedThemes)*1.0975).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Total MSRP taxed</span>
            </div>
            <div>
                <span class="highlight">${getLicensePPP(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Price Per Part</span>
            </div>
            <div>
                <span class="highlight">${getLicensePPM(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Price Per Minifig</span>
            </div>
            <div>
                <span class="highlight">${getLicenseYearlyMSRP(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Yearly Spending</span>
            </div>
            <div>
                <span class="highlight">${getLicenseAvgSetPrice(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span> Average Set Price</span>
            </div>
            <div>
                <span class="highlight">{getLicenseAvgSetPieces(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                <span> Average Set Pieces</span>
            </div>
            <div>
                <span class="highlight">{getLicenseAvgSetMinifigs(unlicensedThemes).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                <span> Average Set Minifigs</span>
            </div>
       </div>
    </div>

    <!-- Per Theme Info -->

    <div class="info">
        <div class="stat-header">
            <span>Total Spending Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeMSRP(b.id) - getThemeMSRP(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">
                            ${getThemeMSRP(theme.id).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    {:else}
                        <span class="highlight">
                            ${getThemeMSRP(theme.id).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    {/if}
                    <span> spent on <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a></span>
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Total Sets Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeSets(b.id) - getThemeSets(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">{getThemeSets(theme.id)}</span>
                    {:else}
                        <span class="highlight">{getThemeSets(theme.id)}</span>
                    {/if}
                    {#if getThemeSets(theme.id) === 1}
                        <span> <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> set</span>
                    {:else}
                        <span> <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> sets</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Total Pieces Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemePieces(b.id) - getThemePieces(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">{getThemePieces(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    {:else}
                        <span class="highlight">{getThemePieces(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    {/if}
                    <span> <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> pieces</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Total Minifigs Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeMinifigs(b.id) - getThemeMinifigs(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">{getThemeMinifigs(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    {:else}
                        <span class="highlight">{getThemeMinifigs(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    {/if}
                    {#if getThemeMinifigs(theme.id) === 1}
                        <span> <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> minifigure</span>
                    {:else}
                        <span> <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> minifigures</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Price Per Piece (PPP) Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemePPP(b.id) - getThemePPP(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">${getThemePPP(theme.id).toFixed(2)}</span>
                    {:else if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemePPP(a.id) - getThemePPP(b.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="green-highlight">${getThemePPP(theme.id).toFixed(2)}</span>
                    {:else}
                        <span class="highlight">${getThemePPP(theme.id).toFixed(2)}</span>
                    {/if}
                    <span> per piece in <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> sets</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Price Per Minifig (PPM) Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemePPM(b.id) - getThemePPM(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">${getThemePPM(theme.id).toFixed(2)}</span>
                    {:else if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemePPM(a.id) - getThemePPM(b.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="green-highlight">${getThemePPM(theme.id).toFixed(2)}</span>
                    {:else}
                        <span class="highlight">${getThemePPM(theme.id).toFixed(2)}</span>
                    {/if}
                    <span> per minifigure in <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a> sets</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Set Price Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeAvgSetPrice(b.id) - getThemeAvgSetPrice(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">${getThemeAvgSetPrice(theme.id).toFixed(2)}</span>
                    {:else if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeAvgSetPrice(a.id) - getThemeAvgSetPrice(b.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="green-highlight">${getThemeAvgSetPrice(theme.id).toFixed(2)}</span>
                    {:else}
                        <span class="highlight">${getThemeAvgSetPrice(theme.id).toFixed(2)}</span>
                    {/if}
                    <span> per set for <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a></span>
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Set Pieces Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeAvgSetPieces(b.id) - getThemeAvgSetPieces(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">{getThemeAvgSetPieces(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    {:else}
                        <span class="highlight">{getThemeAvgSetPieces(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    {/if}
                    <span> pieces per set for <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a></span>
                </div>
            {/each}
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Set Minifigs Per Theme</span>
        </div>
        <div class="stat-body">
            {#each data.themes as theme}
                <div>
                    {#if [0,1,2].includes(
                        [...data.themes]
                            .sort((a, b) => getThemeAvgSetMinifigs(b.id) - getThemeAvgSetMinifigs(a.id))
                            .slice(0, 3)
                            .map(t => t.id)
                            .indexOf(theme.id)
                    )}
                        <span class="yellow-highlight">{getThemeAvgSetMinifigs(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    {:else}
                        <span class="highlight">{getThemeAvgSetMinifigs(theme.id).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                    {/if}
                    {#if getThemeAvgSetMinifigs(theme.id) === 1}
                        <span> minifig per set for <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a></span>
                    {:else}
                        <span> minifigs per set for <a class="follow-link" href={`/lego?search=&year=&theme=${theme.id}&license=`}>{theme.title}</a></span>
                    {/if}
                </div>
            {/each}
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
                    <span class="highlight">${getYearlyMSRP(y).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                    <span class="highlight">${getYearlyAvgSetPrice(y).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span> Average Set Price</span>
                </div>
                <div>
                    <span class="highlight">{getYearlyAvgSetPieces(y).toFixed(2)}</span>
                    <span> pieces in the average set</span>
                </div>
                <div>
                    <span class="highlight">{getYearlyAvgSetMinifigs(y).toFixed(2)}</span>
                    <span> minifigures in the average set</span>
                </div>
            </div>
        </div>
    {/each}

    <!-- Generating Bar Charts -->

    <div class="info">
        <div class="stat-header">
            <span>Total MSRP by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={msrpBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Number of Sets by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={setsBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Total Pieces by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={piecesBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Total Minifigs by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={minifigsBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Price Per Piece (PPP) by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={avgPPPBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Price Per Minifig (PPM) by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={avgPPMBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Set Price by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={avgSetPriceBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Set Pieces by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={avgSetPiecesBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>

    <div class="info">
        <div class="stat-header">
            <span>Average Set Minifigs by Year</span>
        </div>
        <div class="stat-body">
            <canvas bind:this={avgSetMinifigsBarCanvas} width="600" height="300"></canvas>
        </div>
    </div>
</div>