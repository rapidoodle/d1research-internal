'use client';

import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

//export a signout component
export default function Signout() {
    return (
<a className="nav-link" href="#" onClick={signOut}> <FontAwesomeIcon icon={faPowerOff} /> Sign out </a>
    )
}