import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import logo from "../assets/logo.png"
import { ChatBubbleOvalLeftIcon, HomeIcon } from '@heroicons/react/24/outline'; // Outline style
import { UserGroupIcon } from '@heroicons/react/24/outline'; // Outline style
import { BuildingOfficeIcon } from '@heroicons/react/24/outline'; // Outline style
import { FaceSmileIcon } from '@heroicons/react/24/outline'; // Outline style


export const NavBar = () => {
    return (
        <nav class="flex items-center justify-between p-1 lg:px-12 px-20 bg-white" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">Travel Friends</span>
                    <img class="h-20 w-auto" src={logo} alt=""></img>
                </a>
            </div>
            <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                    <span class="sr-only">Open main menu</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <NavLink className="navlink"
                    to="/inicio"
                >        <HomeIcon className="h-6 w-6 inline-block mr-2" />

                    Inicio
                </NavLink>{/* <NavLink className="navlink"
                    to="/nosotros"
                ><UserGroupIcon className="h-6 w-6 inline-block mr-2" />
                    Nosotros
                </NavLink> */}<NavLink className="navlink"
                    to="/cotiza"
                ><BuildingOfficeIcon className="h-6 w-6 inline-block mr-2"/>
                    Promociones
                </NavLink>{/* <NavLink className="navlink"
                    to="/contacto"
                ><ChatBubbleOvalLeftIcon className="h-6 w-6 inline-block mr-2"/>
                    Contacto
                </NavLink> */}
                {/* <a href="/inicio" class="text-sm font-semibold leading-6 text-gray-900">Inicio</a>
                <a href="/nosotros" class="text-sm font-semibold leading-6 text-gray-900">Nosotros</a>
                <a href="/cotiza" class="text-sm font-semibold leading-6 text-gray-900">Cotiza</a>
                <a href="/contacto" class="text-sm font-semibold leading-6 text-gray-900">Contacto</a> */}
            </div>
            {/* <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href="#" class="text-sm font-semibold leading-6 text-neutral-950">Log in <span aria-hidden="true">&rarr;</span></a>
            </div> */}
        </nav>

    )
}