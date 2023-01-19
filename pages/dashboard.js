import { Button, Card, Dropdown, Navbar, Spacer, Text, User } from "@nextui-org/react";
import { logout } from "../common/firebase";
import { useRouter } from "next/router";
import { Logo } from "../common/components/img/logo";
import Navybar from "../common/components/navbar";
import Image from "next/image";
const Dashboard = () => {
  const router = useRouter();
  const requests = [{
    from: 'Robert Baratheon',
    amount: '$200',
    src: 'https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/robert-baratheon-1920.jpg',
  },
  {
    from: 'Tyrion Lannister',
    amount: '$50',
    src: 'https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/tyrion-lannister-1920.jpg',
  },
  {
    from: 'Daenerys Targaryen',
    amount: '$650',
    src: 'https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/daenarys-1920.jpg',
  },
  {
    from: 'Arya Stark',
    amount: '$443',
    src: 'https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/arya-stark-1920.jpg'
  },
  {
    from: 'Rickon Stark',
    amount: '$730',
    src: 'https://static.hbo.com/content/dam/hbodata/series/game-of-thrones/character/s5/rickon-stark-1920.jpg',

  },
  {
    from: 'Catelyn Stark',
    amount: '$990',
    src: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Michelle_Fairley_Cat_Stark_in_the_Vale.png',
  },
]
  const requestCards = (numCards) => {
    const cards = [];
    for(var i = 0; i< numCards; i++){
        cards.push(<><Card css={{w: '70%', color: 'Green'}}>
        <Card.Body>
        <Text>{'Request From: ' + requests[i]?.from}</Text>
            <Text>{'Requested Amount: ' + requests[i]?.amount}</Text>
        </Card.Body>
      </Card><Spacer /></>);
    }
    return cards;
  }
  return (
    <>
    <div style={{marginTop: '5%', marginLeft:'16%'}}>{requestCards(8)}</div>
    </>
  );
};

export default Dashboard;
