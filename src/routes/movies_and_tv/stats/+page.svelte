<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;

    // Helper for percent display
    function percent(count: number, total: number) {
        if (!total) return "0%";
        return ((count / total) * 100).toFixed(1) + "%";
    }
</script>

<div class="container">
    <h1 class="aurabesh">Movies and TV Shows Statistics</h1>

    <p><a class="follow_link" href="/movies_and_tv/">Back to List</a></p>

    <p>Total Movies and TV Shows: {('total' in data.results) ? data.results.total : 0}</p>
    
    <p> By Type:</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Movies</td>
                <td>{'Movie' in data.results ? data.results.Movie : 0}</td>
                <td>{percent('Movie' in data.results ? data.results.Movie : 0, 'total' in data.results ? data.results.total : 0)}</td>
            </tr>
            <tr>
                <td>Total TV Shows</td>
                <td>{(data.results as { [key: string]: number })["TV Show"]}</td>
                <td>{percent((data.results as { [key: string]: number })["TV Show"], ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
        </tbody>
    </table>

    <p> By Format:</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total VHS</td>
                <td>{'VHS' in data.results ? data.results.VHS : 0}</td>
                <td>{percent('VHS' in data.results ? data.results.VHS : 0, 'total' in data.results ? data.results.total : 0)}</td>
            </tr>
            <tr>
                <td>Total DVD</td>
                <td>{'DVD' in data.results ? data.results.DVD : 0}</td>
                <td>{percent('DVD' in data.results ? data.results.DVD : 0, ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
            <tr>
                <td>Total Blu Ray</td>
                <td>{(data.results as { [key: string]: number })["Blu-Ray"]}</td>
                <td>{percent((data.results as { [key: string]: number })["Blu-Ray"], ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
            <tr>
                <td>Total 4K</td>
                <td>{(data.results as { [key: string]: number })["4K"]}</td>
                <td>{percent((data.results as { [key: string]: number })["4K"], ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
        </tbody>
    </table>

    <p> TV Shows by Format:</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total VHS TV Shows</td>
                <td>{'VHS_TV' in data.results ? data.results.VHS_TV : 0}</td>
                <td>{percent('VHS_TV' in data.results ? data.results.VHS_TV : 0, (data.results as { [key: string]: number })["TV Show"])}</td>
            </tr>
            <tr>
                <td>Total DVD TV Shows</td>
                <td>{'DVD_TV' in data.results ? data.results.DVD_TV : 0}</td>
                <td>{percent('DVD_TV' in data.results ? data.results.DVD_TV : 0, ('TV Show' in data.results ? data.results["TV Show"] : 0))}</td>
            </tr>
            <tr>
                <td>Total Blu Ray TV Shows</td>
                <td>{'BluRay_TV' in data.results ? data.results.BluRay_TV : 0}</td>
                <td>{percent('BluRay_TV' in data.results ? data.results.BluRay_TV : 0, ('TV Show' in data.results ? data.results["TV Show"] : 0))}</td>
            </tr>
            <tr>
                <td>Total 4K TV Shows</td>
                <td>{'UHD_TV' in data.results ? data.results.UHD_TV : 0}</td>
                <td>{percent('UHD_TV' in data.results ? data.results.UHD_TV : 0, ('TV Show' in data.results ? data.results["TV Show"] : 0))}</td>
            </tr>
        </tbody>
    </table>

    <p> Movies by Format:</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total VHS Movies</td>
                <td>{'VHS_Movie' in data.results ? data.results.VHS_Movie : 0}</td>
                <td>{percent('VHS_Movie' in data.results ? data.results.VHS_Movie : 0, ('Movie' in data.results ? data.results.Movie : 0))}</td>
            </tr>
            <tr>
                <td>Total DVD Movies</td>
                <td>{'DVD_Movie' in data.results ? data.results.DVD_Movie : 0}</td>
                <td>{percent('DVD_Movie' in data.results ? data.results.DVD_Movie : 0, ('Movie' in data.results ? data.results.Movie : 0))}</td>
            </tr>
            <tr>
                <td>Total Blu Ray Movies</td>
                <td>{'BluRay_Movie' in data.results ? data.results.BluRay_Movie : 0}</td>
                <td>{percent('BluRay_Movie' in data.results ? data.results.BluRay_Movie : 0, ('Movie' in data.results ? data.results.Movie : 0))}</td>
            </tr>
            <tr>
                <td>Total 4K Movies</td>
                <td>{'UHD_Movie' in data.results ? data.results.UHD_Movie : 0}</td>
                <td>{percent('UHD_Movie' in data.results ? data.results.UHD_Movie : 0, ('Movie' in data.results ? data.results.Movie : 0))}</td>
            </tr>
        </tbody>
    </table>

    <p>Steelbooks</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Non-Steelbooks</td>
                <td>{'nonSteelbooks' in data.results ? data.results.nonSteelbooks : 0}</td>
                <td>{percent(('nonSteelbooks' in data.results ? data.results.nonSteelbooks : 0), ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
            <tr>
                <td>Total Steelbooks</td>
                <td>{'steelbooks' in data.results ? data.results.steelbooks : 0}</td>
                <td>{percent(('steelbooks' in data.results ? data.results.steelbooks : 0), ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
        </tbody>
    </table>

    <p>Watched vs Not Watched</p>
    <table>
        <thead>
            <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Watched</td>
                <td>{'watched' in data.results ? data.results.watched : 0}</td>
                <td>{percent(('watched' in data.results ? data.results.watched : 0), ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
            <tr>
                <td>Total Not Watched</td>
                <td>{'notWatched' in data.results ? data.results.notWatched : 0}</td>
                <td>{percent(('notWatched' in data.results ? data.results.notWatched : 0), ('total' in data.results) ? data.results.total : 0)}</td>
            </tr>
        </tbody>
    </table>
</div>