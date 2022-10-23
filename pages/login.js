import {react} from 'react'
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Button, Card, Input, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../common/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import axios from 'axios';
const Login = () => {
    const router = useRouter();
    const [loginTog, setLoginTog] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [streetNum, setStreetNum] = useState(0);
    const [streetName, setStreetName] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState(0);
    const [city, setCity] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [capUserId, setCapUserId] = useState("");
    //db
    const userCollection = collection(db, "userInfo");
  
    useEffect(() => {
      onAuthStateChanged(auth, (currUser) => {
        if (currUser) {
          setCurrentUser(currUser);
          router.push("/dashboard");
        }
      });
    }, []);
    
    const makeBody = () => {
      const body = {
        "first_name": firstname,
        "last_name": lastname,
        "address": {
          "street_number": streetNum,
          "street_name": streetName,
          "city": city,
          "state": state,
          "zip": zip
        }
      }
      return body
    }
    //getUserInfo
    const setUsersInfo = async () => {
      const data = await addDoc(userCollection, {
        Email: email,
        "First Name": firstname,
        "Last Name": lastname,
      });
    };
    const handleRegister = async () => {
      try {
        const body = JSON.stringify(makeBody());
        console.log(body);
        // axios.post('http://api.nessieisreal.com/customers?key=b15ac660689d1fa5a4b7349375aef3e0',body)
        // .then(res => {
        //   setCapUserId(res.body['_id']);
        // })
        const user = await createUserWithEmailAndPassword(auth, email, password);
        setUsersInfo();
        console.log(capUserId);
        router.push("/dashboard");
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleLogin = async () => {
      const user = await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    };
  
    const login = (
      <>
        <Card.Body>
          <Spacer y={0.5} />
          <Input
            clearable
            bordered
            labelPlaceholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Spacer y={2.5} />
          <Input.Password
            labelPlaceholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleLogin}>Login</Button>
        </Card.Footer>
      </>
    );
    const register = (
      <>
        <Card.Body>
          <Spacer y={0.5} />
          <Input
            clearable
            bordered
            labelPlaceholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Spacer y={2} />
          <Input
            clearable
            bordered
            labelPlaceholder="First Name"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <Spacer y={2} />
          <Input
            clearable
            bordered
            labelPlaceholder="Last Name"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <Spacer y={2} />
          <Input
            clearable
            bordered
            labelPlaceholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Spacer y={2} />
          <Input.Password
            labelPlaceholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          /><Spacer y={2} />
          <Input.Password labelPlaceholder="Reenter Password" />
          <Spacer y={2} />
          <Input labelPlaceholder='Street Number' type={'number'} onChange={(e) => {
            setStreetNum(e.target.value);
          }}/>
          <Spacer y={2} />
          <Input labelPlaceholder='Street Name' onChange={(e) => {
            setStreetName(e.target.value);
          }}/>
          <Spacer y={2} />
          <Input labelPlaceholder='City' onChange={(e) => {
            setCity(e.target.value);
          }}/>
          <Spacer y={2} />
          <Input labelPlaceholder='State (2 letter)' onChange={(e) => {
            setState(e.target.value);
          }}/>
          <Spacer y={2} />
          <Input labelPlaceholder='Zipcode' type={'number'} onChange={(e) => {
            setZip(e.target.value);
          }}/>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleRegister}>Register</Button>
        </Card.Footer>
      </>
    );
    return (
        <>
      <div className={styles.container}>
        <Card
          style={{
            width: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Header>
            <Button.Group>
              <Button
                flat={loginTog != "login"}
                onClick={() => {
                  setLoginTog("login");
                }}
              >
                Login
              </Button>
              <Button
                flat={loginTog == "login"}
                onClick={() => {
                  setLoginTog("register");
                }}
              >
                Register
              </Button>
            </Button.Group>
          </Card.Header>
          <Card.Divider />
          {loginTog == "login" ? login : register}
        </Card>
      </div>
      </>
    );
}

export default Login;