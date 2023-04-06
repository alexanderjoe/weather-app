import { A } from '@solidjs/router';


const NavbarLink = (props) => {
  return (
    <>
      <A href={props.href} onclick={props.onclick} class={`block py-2 pr-4 pl-3 rounded md:border-0 md:p-0 ${props.current ? 'text-gray-400' : 'underline text-white font-extrabold'}`}>
        {props.linkText}
      </A>
    </>
  );
};

export default NavbarLink;
