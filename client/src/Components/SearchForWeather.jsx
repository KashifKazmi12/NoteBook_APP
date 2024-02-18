import React, { useEffect, useState } from 'react'

export const SearchForWeather = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            fetchSuggestions(searchTerm);
        } else {
            clearSuggestions();
        }
    }, [searchTerm]);

    const fetchSuggestions = (query) => {
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=7`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data);
            })
            .catch(error => console.error('Error fetching suggestions:', error));
    };

    const handleInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSuggestions = () => {
        setSuggestions([]);
    };

    const selectSuggestion = (selectedValue) => {
        setSearchTerm(selectedValue);
        setTimeout(() => { clearSuggestions(); }, 500)
    };

    const search = () => {
        props.setCity(searchTerm)
    }
    return (
        <div>

            {/* ------------------------------ */}

            <div style={{position:'relative', zIndex:2}} class="flex items-center py-4 px-8 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                <div class="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input class="bg-gray-100 outline-none" type="text" value={searchTerm} onChange={handleInput} placeholder="Search for a city..." />
                </div>
                <div class="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                    <span>All categorie</span>

                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div onClick={search} class="bg-purple-800 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                    <span>Search</span>
                </div>
            </div>

            {/* ------------------------------ */}
            {suggestions.length?
                <div style={{ position: 'relative' }} className="suggestion-list">
                    <ul className='bg-gray-100' style={{ width: '100%', listStyle: 'none', padding: '5px 0 30px 0', borderRadius: '0 0px 10px 10px', margin: 0, position: 'absolute', top: '-5px' }}>
                        {suggestions.map((result, index) => (
                            <li
                                key={index}
                                className="suggestion-item text-gray:400"
                                style={{ cursor: 'pointer', textAlign: 'center', padding: '8px', fontWeight: 'bolder', borderBottom: '1px solid #ccc' }}
                                onClick={() => selectSuggestion(result.display_name)}
                            >
                                {result.display_name}
                            </li>
                        ))}
                    </ul>
                </div> : ''
            }
        </div>
    )
}
