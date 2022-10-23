import { Button, Card, Dropdown, Navbar, Spacer, Text, User } from "@nextui-org/react";
import { logout } from "../common/firebase";
import { useRouter } from "next/router";
import { Logo } from "../common/components/img/logo";
import Navybar from "../common/components/navbar";
const Dashboard = () => {
  const router = useRouter();


  const requestCards = (numCards) => {
    const cards = [];
    for(var i = 0; i< numCards; i++){
        cards.push(<><Card css={{w: '70%', color: 'Green'}}>
        <Card.Body>
            <Text>Request From: </Text>
            <Text>Requested Amount: </Text>
        </Card.Body>
      </Card><Spacer /></>);
    }
    return cards;
  }
  return (
    <>
    <Navybar location='ongoing'/>
    <div style={{marginTop: '5%', marginLeft:'16%'}}>{requestCards(8)}</div>
    </>
  );
};

export default Dashboard;
