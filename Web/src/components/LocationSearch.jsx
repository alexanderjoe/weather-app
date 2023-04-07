import { debounce } from "@solid-primitives/scheduled";
import { createEffect, createSignal } from 'solid-js';

const LocationSearch = (props) => {
    const [latitude, setLatitude] = createSignal('');
    const [longitude, setLongitude] = createSignal('');
    const [search, setSearch] = createSignal('');
    const [location, setLocation] = createSignal('');
    const [results, setResults] = createSignal([]);
    const [isOpen, setIsOpen] = createSignal(false);
    let inputRef = null;

    const fetchGeocodeResults = async (query) => {
        const API_ENDPOINT = `http://localhost:3001/geo?loc=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error('Error fetching geocode results:', error);
            return [];
        }
    };

    const handleSearch = async () => {
        if (search().trim() === '') {
            setResults([]);
            return;
        }

        const newResults = await fetchGeocodeResults(search());
        setResults(newResults);
    };

    const handleResultClick = (result) => {
        setSearch({ lat: result.lat, lon: result.lon });
        setLatitude(result.lat);
        setLongitude(result.lon);
        setLocation(`${result.name}, ${result.state}`);
        if(props.onLocationSelected) {
            props.onLocationSelected(result.lat, result.lon);
        }
        setIsOpen(false);
    }

    createEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef && !inputRef.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    })

    const searchDebounce = debounce(handleSearch, 750);

    return (
        <>
            <div class='bg-gray-400 p-4 container mx-auto rounded-md'>
                <div class='flex flex-row items-center justify-around gap-2'>
                    <div class=''>
                        <label class='block text-sm font-medium text-gray-700' for="latitude">Latitude</label>
                        <input type="number" step="any" id="latitude" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={latitude()} oninput={(e) => setLatitude(e.target.value)} />
                    </div>
                    <div class=''>
                        <label class='block text-sm font-medium text-gray-700' for="longitude">Longitude</label>
                        <input type="number" step="any" id="longitude" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={longitude()} oninput={(e) => setLongitude(e.target.value)} />
                    </div>
                    <div class="relative w-2/3" ref={inputRef}>
                        <label class="block text-sm font-medium text-gray-700" for="search">
                            Location Search:
                        </label>
                        <input
                            id="search"
                            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                            type="text"
                            autocomplete='off'
                            placeholder='Search for a location...'
                            value={location()}
                            oninput={(e) => { setSearch(e.target.value); searchDebounce(); }}
                            onfocus={() => setIsOpen(true)}
                            onkeydown={(e) => { e.key === 'Enter' ? handleSearch() : null }}
                        />
                        <div class={`absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg ${isOpen() ? 'block' : 'hidden'}`}>
                            <ul class="max-h-48 overflow-y-auto">
                                {results().length === 0 && (
                                    <li class="text-gray-500 py-2 px-4">No results</li>
                                )}
                                {results().map((result) => (
                                    <li class="text-gray-900 py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => handleResultClick(result)}>
                                        {result.name},&nbsp;{result.state}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationSearch;