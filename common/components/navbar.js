import {
  Button,
  Dropdown,
  Link,
  Navbar,
  Spacer,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import { logout } from "../firebase";
import { useRouter } from "next/router";
import { Logo } from "./img/logo";
import { useEffect, useState } from "react";
import { Heart2, Star } from "react-iconly";

const Navybar = (props) => {
  const router = useRouter();
  const [select, setSelector] = useState(props.location);
  const [user,setUser] = useState({});
  const collapseItems = [
    "Past Transaction",
    "Resquest",
    "Ongoing",
    "Savings",
    "About",
    "Contact Us",
    "Logout",
  ];

  useEffect(()=> {
  
    setUser(require('../db/user.json'));
  },[])
  const transactionsAction = (type) => {
    setSelector('transactions');
    router.push(`/${type.currentKey}`);
  };
  return (
    <Navbar isBordered variant={"floating"}>
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand>
        <Logo />
        <Text b href="#">
          ez Bnk
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        variant={"underline-rounded"}
        enableCursorHighlight
        hideIn="xs"
      >
        <Navbar.Item isActive={select == 'transactions'}>
          <Dropdown>
            <Dropdown.Button light color={"primary"}>Transactions</Dropdown.Button>
            <Dropdown.Menu
              aria-label="Static Actions"
              selectionMode="single"
              onSelectionChange={transactionsAction}
            >
              <Dropdown.Item
                key="past"
              >
                Past
              </Dropdown.Item>
              <Dropdown.Item
                key="dashboard"
              >
                Current
              </Dropdown.Item>
              <Dropdown.Item key="all">All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
        <Navbar.Link
          isActive={select == "request"}
          href="#"
          onClick={() => {
            setSelector("request");
            router.push("/request");
          }}
        >
          Requests
        </Navbar.Link>
        <Navbar.Link
          isActive={select == "savings"}
          href="#"
          onClick={() => {
            setSelector("savings");
            router.push("/savings");
          }}
        >
          Savings
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content hideIn={"md"}>
        <Navbar.Item>
          <Text
            weight="extrabold"
            h1
            size={60}
            color="success"
            css={{ fontWeight: "bold" }}
          >
            ${user.currentAmount}
          </Text>
        </Navbar.Item>
        <Tooltip
          content="Your Lending score"
          trigger="hover"
          placement="bottom"
          color="warning"
          hideArrow
        >
          <Link href="#" color={"warning"}>
            {<Star set="bulk" primaryColor="black" />}{user.lendScore}
          </Link>
        </Tooltip>
        <Tooltip
          content="Your Borrowing score"
          trigger="hover"
          placement="bottom"
          color="warning"
          hideArrow
        >
          <Link href="#" color={"warning"}>
            {<Heart2 set="bulk" primaryColor="black" />}{user.borrowScore}
          </Link>
        </Tooltip>
      </Navbar.Content>
      <Navbar.Content variant={"underline-rounded"} hideIn="xs">
        <Navbar.Link
          isActive={select == "about"}
          href="#"
          onClick={() => {
            setSelector("about");
          }}
        >
          About
        </Navbar.Link>
        <Navbar.Link
          isActive={select == "contact"}
          href="#"
          onClick={() => {
            setSelector("contact");
            router.push("/contact");
          }}
        >
          Contact Us
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Dropdown placement="top-right">
            <Dropdown.Trigger>
              <User
                bordered
                as="button"
                size="lg"
                color="primary"
                name={`${user.firstName} ${user.lastName}`}
                description={user.username}
                src={user.avatar}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              color="primary"
              aria-label="User Actions"
              selectionMode="single"
              onSelectionChange={(e) => {
                if (e && e.currentKey == "logout") {
                  logout();
                  router.push("/");
                }
              }}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="team_settings" withDivider>
                My Friends
              </Dropdown.Item>
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
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navybar;
