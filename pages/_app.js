import { useEffect, useState } from 'react';
import Navybar from '../common/components/navbar'
import {Box} from "@nextui-org/react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [location, setLocation] = useState('ongoing');
  useEffect(() => {
    if(typeof window !== 'undefined')
    {switch(window.location.pathname){
    case (window.location.pathname.includes("past")):
      setLocation("past");
      break;
    case (window.location.pathname.includes("request")):
      setLocation("request");
      break;
    case (window.location.pathname.includes("contact")):
      setLocation("contact");
      break;
    case (window.location.pathname.includes("/")):
      setLocation("/");
      break;
    }
    }
  },[]);
 
  return <div>
    {location !== "/" ? <Navybar location={location} /> : null}
    <Component {...pageProps} /></div>
}
export default MyApp
