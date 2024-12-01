import NavButton from "./NavButton";

import HeartSVG from "../../public/HeartSVG";
import HomeSVG from "../../public/HomeSVG";
import SquareSVG from "../../public/square-plus.svg";
import { useEffect, useState } from "react";
import Image from "next/image"

import styleVar from '@/styles/_variables.module.scss'
import { useRouter } from "next/router";

export default function Navbar() {

  const router = useRouter();

  // true if at home page, this controls navigation and the buttons color
  const [homePressed, setHomePressed] = useState(null);

  // For the initial Load
  useEffect(() => {
    if (router.pathname == "/") {
      setHomePressed(true);
    } else
      setHomePressed(false);
  }, [])


  let homeColor = styleVar.unusedColor;
  let favouriteColor = styleVar.unusedColor;

  // set appropriate colors according to page.
  if (homePressed) {
    homeColor = styleVar.bottomNavColor;
    favouriteColor = styleVar.unusedColor;
  } else if (homePressed != null) {
    {
      homeColor = styleVar.unusedColor;
      favouriteColor = styleVar.bottomNavColor;
    }
  }

  return (
    <nav>
      <NavButton path='/' myState={{ homePressed, setHomePressed }}>
        <HomeSVG fill={homeColor} />
      </NavButton>

      <NavButton path='favourites' myState={{ homePressed, setHomePressed }}>
        <HeartSVG fill={favouriteColor} />
      </NavButton>

      <NavButton path='new-post' myState={{ homePressed, setHomePressed }}>
        <Image src={SquareSVG}
          width={30}
          height={30}
          priority={true}
          alt="Profile Picture." />
      </NavButton>
    </nav>
  )
}
