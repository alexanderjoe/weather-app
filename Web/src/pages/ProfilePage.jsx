
import { createSignal } from 'solid-js';
import Searchbox from '../components/Searchbox';

const ProfilePage = () => {

    const [edit, setEdit] = createSignal(false);
    const [latitude, setLatitude] = createSignal('')
    const [longitude, setLongitude] = createSignal('')
    const [location, setLocation] = createSignal('')

    const editButtonClicked = (e) => {
        e.preventDefault();
        if (edit() == true) {
            setEdit(false);
            
        } else {
            setEdit(true);
            //push data to backend
        }
    }

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
                    {!edit() && (
                    <div>
                        <label htmlFor="username" class="flex text-slate-200 font-bold mb-2">
                            Username: {localStorage.getItem('username')}
                        </label>
                        <label htmlFor="password" class="block text-slate-200 font-bold mb-2">
                            Password: {localStorage.getItem('password')}
                        </label>
                        <label htmlFor="Location" class="block text-slate-200 font-bold mb-2">
                            Location: {localStorage.getItem('location')}
                        </label>
                    </div>
                    )} {edit() && (
                        <div>
                            <label htmlFor="username" class="block text-slate-200 font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="text"
                                class="w-full border border-gray-300 p-2 rounded-lg mb-3"
                                placeholder="Enter your username"
                                value={localStorage.getItem('username')}
                            />
                            <label htmlFor="password" class="block text-slate-200 font-bold mb-2">
                                Password

                            </label>
                            <input
                                type="text"
                                id="password"
                                name="text"
                                class="w-full border border-gray-300 p-2 mb-3 rounded-lg"
                                placeholder="Enter your password"
                                value={localStorage.getItem('password')}
                            />
                            <Searchbox onLocationSelected={handleLocationSelected}/>

                        </div> 
                    )}
                    <div>
                        <button onClick={editButtonClicked} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {edit() == true ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ProfilePage;