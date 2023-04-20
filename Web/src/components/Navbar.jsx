
import { A, useLocation } from '@solidjs/router';
import NavbarLink from './NavbarLink';


const Navbar = () => {
  const location = useLocation();


  return (
    <nav class="px-2 sm:px-4 py-2.5">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <A href="/" class="flex items-center">
          <span class="self-center text-2xl font-bold whitespace-nowrap text-white">Weather App</span>
        </A>
        <div class={`w-full md:block md:w-auto`} id="navbar-default">
          <ul class="flex flex-col p-4 mt-10 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <NavbarLink href="/current" linkText="Home" current={location.pathname !== '/current'} />
            <NavbarLink href="/forecast" linkText="Forecast" current={location.pathname !== '/forecast'} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
