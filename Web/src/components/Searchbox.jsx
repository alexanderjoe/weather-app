import { debounce } from "@solid-primitives/scheduled";
import { createEffect, createSignal } from 'solid-js';

const Searchbox = (props) => {
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
        setLocation(`${result.name}, ${result.state}`);
        if (props.onLocationSelected) {
            props.onLocationSelected(result.lat, result.lon, `${result.name}, ${result.state}`);
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
        <div class="relative" ref={inputRef}>
            <label htmlFor="search" class="block text-slate-200 font-bold mb-2">
                Location
            </label>
            <input
                id="search"
                class="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
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
    );
};

export default Searchbox;