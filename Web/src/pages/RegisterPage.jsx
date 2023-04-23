import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

const RegisterPage = () => {

    const navigate = useNavigate()

    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        if (response.ok) {
            navigate('/login')
        } else {
            console.log('Error')
        }
    }


    return (
        <div class="flex flex-col items-center justify-center h-screen bg-slate-900">

            <div class="bg-slate-800 p-10 rounded-lg shadow-lg w-[350px]">
                <h1 class="text-3xl text-slate-200 font-bold mb-4">Register</h1>
                <form class="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" class="block text-slate-200 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="Enter your email address"
                            value={email()}
                            onInput={(e) => setEmail(e.target.value)}
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