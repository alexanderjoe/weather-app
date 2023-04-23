import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';

const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username(), password: password() })
    }).then(response => {
      if (response.ok) {
        // Handle successful login
        navigate('/current');
      } else {
        // Handle login error
        setError(true);
      }
    }).catch(error => {
      // Handle network error
    });
    console.log('Email:', username());
    console.log('Password:', password());
  };

  return (
    <div class="flex flex-col items-center justify-center h-screen bg-slate-900">
      {error() && (
        <div class="bg-red-500 text-white p-4 rounded-lg mb-6">
          <p>Invalid Username or password.</p>
        </div>
      )}
      <div class="bg-slate-800 p-10 rounded-lg shadow-lg w-[350px]">
        <h1 class="text-3xl text-slate-200 font-bold mb-4">Login</h1>
        <form class="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" class="block text-slate-200 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="text"
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
          <div>
            <button
            type="submit"
            class="w-full rounded-3xl bg-slate-500 px-6 py-2 text-xl font-medium uppercase text-white"
            >
            Login
            </button>
          </div>
          <div class="text-center hover:underline">
            <a href="/register" class="text-slate-200 mt-4 align">Register here!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;