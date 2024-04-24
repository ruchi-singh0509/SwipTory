import React, { Fragment, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import button from "../styles/button.module.css";
import close from "../assets/logos/close.png";
import viewpassword from "../assets/logos/eye.png";
import { loginUser } from "../api/login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../Components/Toast";

export default function LoginButton({ onLogin }) {
  //check if modal is open
  const [open, setOpen] = useState(false);

  //opens modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleUserLogin = async () => {
    try {
      if (!loginData.username || !loginData.password) {
        setError(true);
        return;
      }
      const payload = await loginUser(loginData);
      onLogin();
      toast.success("User Log In Successfull ");
      setError(false);
      localStorage.setItem("username", payload.message);
      console.log("User Logged In", payload.message);

      //reset form
      setLoginData({
        username: "",
        password: "",
      });

      //close modal after successfull registraton
      onCloseModal();
    } catch (err) {
      toast.error("Something is wrong");
      console.log(err);
      onOpenModal();
    }
  };

  const [showPassword,setShowPassword] = useState(false)

  const handlePassword=(e)=>{
    setLoginData({...loginData,password:e.target.value})
  }
  const togglePassword=()=>{
    setShowPassword(!showPassword)
  }

  return (
    <Fragment>
      <Toast />
      <button className={button.login} onClick={onOpenModal}>
        Sign In
      </button>
      <Modal
        open={open}
        showCloseIcon={false}
        center
        classNames={{
          modal: button.customModal,
        }}
      >
        <img
          src={close}
          width={30}
          height={30}
          className={button.close}
          onClick={onCloseModal}
        ></img>
        <h1 className={button.loginHead}>Login to SwipTory</h1>
        <form>
          <div className={button.usernamelogin}>
            <label className={button.usernamelabel}> Username </label>
            <input
              className={button.usernameinput}
              placeholder="Enter your Username"
              value={loginData.username}
              name="username"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            ></input>
          </div>
          <br />
          <div className={button.passwordcontainerlogin}>
            <label className={button.passwordlabel}> Password </label>
            <img
              src={viewpassword}
              width={12}
              height={12}
              className={button.viewpassword}
              onClick={togglePassword}
              alt={showPassword ? 'Hide Password' : 'Show Password'}
            ></img>
            <input
              type={showPassword ? 'text' : 'password'}
              className={button.passwordinput}
              placeholder="Enter your Password"
              name="password"
              value={loginData.password}
              onChange={handlePassword}
            ></input>
          </div>
          <span className={button.error}>
            {error ? "Username and password required" : ""}
          </span>
        </form>
        <br />
        <button className={button.loginbtn} onClick={handleUserLogin}>
          Login
        </button>
      </Modal>
    </Fragment>
  );
}
