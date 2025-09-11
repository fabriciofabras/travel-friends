import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import { GifIcon, HomeIcon, StarIcon } from '@heroicons/react/24/outline'; // Outline style
import { BuildingOfficeIcon } from '@heroicons/react/24/outline'; // Outline style
import { useState } from 'react';
import { GiftIcon, FacebookIcon, InstagramIcon, ShieldIcon } from "lucide-react";

export const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className="flex items-center justify-around pt-4 lg:px-12 px-4 bg-white border-2" aria-label="Global">
            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white p-4 shadow-lg`}>
                <NavLink onClick={toggleMenu} className="block py-2 text-gray-900 hover:bg-gray-100" to="/inicio">
                    <HomeIcon className="h-6 w-6 inline-block mr-2" />
                    Inicio
                </NavLink>
                <NavLink onClick={toggleMenu} className="block py-2 text-gray-900 hover:bg-gray-100" to="/viaja-seguro">
                    <ShieldIcon className="h-6 w-6 inline-block mr-2" />
                    Viaja Seguro
                </NavLink>
                <NavLink onClick={toggleMenu} className="block py-2 text-gray-900 hover:bg-gray-100" to="/oficina">
                    <HomeIcon className="h-6 w-6 inline-block mr-2" />
                    Nuestra Oficina
                </NavLink>
                 <NavLink onClick={toggleMenu} className="block py-2 text-gray-900 hover:bg-gray-100" to="/promociones">
                    <BuildingOfficeIcon className="h-6 w-6 inline-block mr-2" />
                    Promociones
                </NavLink>
                {/*<NavLink onClick={toggleMenu} className="block py-2 text-gray-900 hover:bg-gray-100" to="/favoritos">
                    <StarIcon className="h-6 w-6 inline-block mr-2" />
                    Destinos Favoritos
                </NavLink> */}
                <NavLink
                    onClick={toggleMenu}
                    className="block py-2 text-gray-900 hover:bg-gray-100" to="https://www.facebook.com/travelfriendsmx"

                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FacebookIcon className="h-6 w-6 inline-block mr-2" />
                    Facebook
                </NavLink>

                <NavLink
                    onClick={toggleMenu}
                    className="block py-2 text-gray-900 hover:bg-gray-100" to="https://www.instagram.com/travel.friends.mexico"


                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InstagramIcon className="h-6 w-6 inline-block mr-2" />
                    Instagram
                </NavLink>
                {/* Añade más enlaces si es necesario */}
            </div>
            <div className="flex lg:flex-1">
                <b href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Travel Friends</span>
                    <img className="h-20 w-auto" src={logo} alt=""></img>
                </b>
            </div>

            <div className="hidden lg:flex lg:gap-x-12">
                <NavLink className="navlink"
                    variant="custom"

                    to="/inicio"
                >        <HomeIcon className="h-6 w-6 inline-block mr-2" />

                    Inicio
                </NavLink>
                <NavLink className="navlink"
                    variant="custom" to="/viaja-seguro">
                    <ShieldIcon className="h-6 w-6 inline-block mr-2" />
                    Viaja Seguro
                </NavLink>
                <NavLink className="navlink"
                    variant="custom" to="/oficina">
                    <BuildingOfficeIcon className="h-6 w-6 inline-block mr-2" />
                    Nuestra Oficina
                </NavLink>
                 <NavLink className="navlink"
                    to="/promociones"
                ><GiftIcon className="h-6 w-6 inline-block mr-2" />
                    Promociones
                </NavLink>
                {/*<NavLink className="navlink"
                    to="/favoritos"
                ><StarIcon className="h-6 w-6 inline-block mr-2" />
                    Destinos Favoritos
                </NavLink> */}
                <NavLink
                    className="navlink hover:text-blue-600"
                    to="https://www.facebook.com/travelfriendsmx"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FacebookIcon className="h-6 w-6 inline-block mr-2" />
                    Facebook
                </NavLink>

                <NavLink
                    className="navlink hover:text-pink-500"
                    to="https://www.instagram.com/travel.friends.mexico"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InstagramIcon className="h-6 w-6 inline-block mr-2" />
                    Instagram
                </NavLink>
            </div>
            {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <b href="#" className="text-sm font-semibold leading-6 text-neutral-950">Log in <span aria-hidden="true">&rarr;</span></b>
            </div> */}
        </nav>

    )
}