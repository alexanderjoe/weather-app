import { createSignal } from 'solid-js';

const LoginPage = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email(), password: password() })
    }).then(response => {
      if (response.ok) {
        // Handle successful login
      } else {
        // Handle login error
      }
    }).catch(error => {
      // Handle network error
    });
    console.log('Email:', email());
    console.log('Password:', password());
  };

  return (
    <div class="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div class="bg-slate-800 p-10 rounded-lg shadow-lg">
        <h1 class="text-3xl text-slate-200 font-bold mb-4">Login</h1>
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
            Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;