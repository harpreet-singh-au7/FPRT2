import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import isEmail from "validator/lib/isEmail";
import { useStateValue } from "../../Redux/StateProvider";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  }, 
  input: {
    width: "100%",
  }
  
};

function Login() {
  const history = useHistory();
  const[{user},dispatch] = useStateValue()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  let databody={
      email,
      password
  }
  const login = (event) => {
    event.preventDefault();
    //login logic
    async function fetchUserData() {
        const res = await axios.post("/user/login",databody)
          .then((res) => {
                if(res){
                    dispatch({
                        type: "SET_TOKEN",
                        item: res.data,
                      });
                }
              console.log(res.data)
            setLoading(true)
            console.log("Logged in")
          })
          .catch((error) => {
            alert(error.message);
          });
          setTimeout(() => {
            history.replace("/");
          }, 1500);
      }
      fetchUserData();
    }

  // const Register = (event) => {
  //   event.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)

  //     .then((auth) => {
  //       //user created and redirect to homepage
  //       history.push("/");
  //     })
  //     .catch((e) => alert(e.message));
  // };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://149448277.v2.pressablecdn.com/wp-content/uploads/2019/12/small_logo.png"
          alt=""
        />
      </Link>

      <div className="login_container">
        <h1>Login</h1>
        <form>
          <label for="email">
            <h5>E-mail</h5>
          </label>
          <br />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            placeholder="Please enter your email here"
            type="email"
            ref={register({
              required: true,
              validate: (input) => isEmail(input),
            })}
            style={{ ...styles.input, borderColor: errors.email && "red" }}
          />
          {errors.email && (
            <p className="red">Email not valid & it's required field</p>
          )}

          <br />
          <label for="password">
            <h5>Password</h5>
          </label>
          <br />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Enter your password here"
            type="password"
            ref={register({
              required: true,
              minLength: 6,
              message: "min length should be 6",
            })}
            style={{ ...styles.input, borderColor: errors.password && "red" }}
          />
          {errors.password && (
            <p className="red">
              Password length should be more than 6 characters & it's required
              field{" "}
            </p>
          )}
          <button onClick={login} type="submit" className="login_SigninButton">
            Sign In
          </button>
        </form>
        <p>
          By signing - in you agree the terms of our website. Check out our
          cookies, privacy notice prior to sign-in
        </p>
      </div>
      <br />
      <div className="login_divider">
        <div class="inside">
          <span>
            <h5>New to Amazon?</h5>
          </span>
        </div>

        <button
          onClick={(e) => history.push("/createuser")}
          className="login_RegisterButton"
        >
          Create your Account
        </button>
      </div>
    </div>
  );
}

export default Login;