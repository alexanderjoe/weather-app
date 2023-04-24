
import { createSignal, onMount } from 'solid-js';
import Searchbox from '../components/Searchbox';

const ProfilePage = () => {

    const [edit, setEdit] = createSignal(true);     // Shown when true, hidden when false
    const [save, setSave] = createSignal(false);
    const [latitude, setLatitude] = createSignal('')
    const [longitude, setLongitude] = createSignal('')
    const [location, setLocation] = createSignal('')
    const [username, setUsername] = createSignal('');
    const [userID, setUserID] = createSignal('');


    const editButtonClicked = (e) => {
        e.preventDefault();
        setEdit(false);
        setSave(true);
    }

    const saveButtonClicked = async (e) => {
        e.preventDefault();
        setEdit(true);
        setSave(false);
        const userRecord = await fetch('/api/account/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username(),
                location: {
                    lat: latitude(),
                    lon: longitude(),
                    name: location()
                },
                userID: userID()
            })
        });

        if (!userRecord.ok) {
            return;
        }

        const data = await userRecord.json();

        if(data.error) {
            return;
        }

        localStorage.setItem('user', JSON.stringify(data));
    }

    const getUserValues = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUsername(user.username)
        setLocation(JSON.parse(user.location).name)
        setUserID(user.id)
    }

    onMount(() => {
        getUserValues()
    })


    const handleLocationSelected = (lat, lon, locationName) => {
        if (lat > 90 || lat < -90 || lon > 180 || lon < -180) return;
        setLatitude(lat)
        setLongitude(lon)
        setLocation(locationName)
    }


    return (
        <div>
            <div class="bg-slate-800 p-10 rounded-lg shadow-lg w-[500px] ml-10">
                <h1 class="text-3xl text-slate-200 font-bold mb-4">Profile</h1>
                <form class="space-y-6 flex-row">
                    {edit() && (
                        <div>
                            <label htmlFor="username" class="flex text-slate-200 font-bold mb-2">
                                Username: {username()}
                            </label>
                            <label htmlFor="Location" class="block text-slate-200 font-bold mb-2">
                                Location: {location()}
                            </label>
                        </div>
                    )} {save() && (
                        <div>
                            <label htmlFor="username" class="block text-slate-200 font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="text"
                                onChange={(e) => setUsername(e.target.value)}
                                class="w-full border border-gray-300 p-2 rounded-lg mb-3"
                                placeholder="Enter your username"
                                value={username()}
                            />
                            <Searchbox onLocationSelected={handleLocationSelected} />

                        </div>
                    )}
                    <div>
                        {edit() && (
                            <button onClick={editButtonClicked} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </button>
                        )}
                        {save() && (
                            <button onClick={saveButtonClicked} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ProfilePage;