import { Button, Dropdown, Navbar, Spacer, Text, User } from "@nextui-org/react";
import { logout } from "../firebase";
import { useRouter } from "next/router";
import { Logo } from "./img/logo";
import { useState } from "react";

const Navybar = (props) => {
    const router = useRouter();
    const [select, setSelector] = useState(props.location)
return (
<Navbar isBordered variant={"floating"}>
  <Navbar.Brand>
    <Logo />
    <Text b href="#">
      ez Bnk
    </Text>
  </Navbar.Brand>
  <Navbar.Content variant={'underline-rounded'}>
    <Navbar.Link isActive={select == 'past'} href="#" onClick={() => {
        setSelector('past')
        router.push('/past')
    }}>Past Transaction</Navbar.Link>
    <Spacer />
    <Navbar.Link isActive={select == 'request'} href="#" onClick={() => {
        setSelector('request')
        router.push('/request')
    }}>Requests</Navbar.Link>
    <Spacer />
    <Navbar.Link  isActive={select == 'ongoing'}href="#" onClick={() => {
        setSelector('ongoing')
        router.push('/dashboard')
    }}>Ongoing</Navbar.Link>
    <Spacer />
  </Navbar.Content>
  <Navbar.Content variant={'underline-rounded'}>
      <Navbar.Link isActive={select == 'about'} href="#" onClick={() => {
        setSelector('about')
    }}>About</Navbar.Link>
      <Navbar.Link isActive={select == 'contact'} href="#" onClick={() => {
        setSelector('contact')
        router.push('/contact')
    }}>Contact Us</Navbar.Link>
    <Navbar.Item>
    <Dropdown placement="top-right">
    <Dropdown.Trigger>
      <User
        bordered
        as="button"
        size="lg"
        color="primary"
        name="Jon Snow"
        description="@jonknowsnotin"
        src="https://i.pinimg.com/474x/a8/7d/5f/a87d5f319de7634f3080961617568670--game-of-thrones-images-game-of-thrones-characters.jpg"
      />
    </Dropdown.Trigger>
    <Dropdown.Menu color="primary" aria-label="User Actions" selectionMode="single" onSelectionChange={(e) => {
      if(e && e.currentKey == "logout"){
      logout();
      router.push('/');
    }}}>
      <Dropdown.Item key="profile" css={{ height: "$18" }}>
        <Text b color="inherit" css={{ d: "flex" }}>
          Signed in as
        </Text>
        <Text b color="inherit" css={{ d: "flex" }}>
          jsnow@kn.com
        </Text>
      </Dropdown.Item>
      <Dropdown.Item key="team_settings" withDivider>My Friends</Dropdown.Item>
      <Dropdown.Item key="settings" withDivider>
        Account Settings
      </Dropdown.Item>
      <Dropdown.Item key="logout" color="error" withDivider>
        Log Out
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    </Navbar.Item>
  </Navbar.Content>
</Navbar>)
}

export default Navybar;