import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Searchbox from '../components/Searchbox'

const RegisterPage = () => {

    const navigate = useNavigate()

    const [username, setUsername] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [error, setError] = createSignal(false)
    const [latitude, setLatitude] = createSignal('')
    const [longitude, setLongitude] = createSignal('')
    const [location, setLocation] = createSignal('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username(), password: password() })
        })
        if (response.ok) {
            navigate('/login')
        } else {
            setError(true)
            console.log('Error')
        }
    }

    const handleLocationSelected = (lat, lon, locationName) => {
        if (lat > 90 || lat < -90 || lon > 180 || lon < -180) return;
        setLatitude(lat)
        setLongitude(lon)
        setLocation(locationName)
    }

    return (
        <div class="flex flex-col items-center justify-center h-screen bg-slate-900">
            {error() && (
                <div class="bg-red-500 text-white p-4 rounded-lg mb-6">
                <p>Error Registering Account</p>
                </div>
            )}
            <div class="bg-slate-800 p-10 rounded-lg shadow-lg w-[350px]">
                <h1 class="text-3xl text-slate-200 font-bold mb-4">Register</h1>
                <form class="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" class="block text-slate-200 font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            class="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="Enter your username"
                            value={username()}
                            onInput={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" class="block text-slate-200 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="Enter your password"
                            value={password()}
                            onInput={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Searchbox onLocationSelected={handleLocationSelected} />
                    <div>
                        <button
                            type="submit"
                            class="w-full rounded-3xl bg-slate-500 px-6 py-2 text-xl font-medium uppercase text-white"
                        >
                            Register
                        </button>
                    </div>
                    <div class="text-center hover:underline">
                        <a href="/" class="text-slate-200 mt-4 align">Login here!</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage