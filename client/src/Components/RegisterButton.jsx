import React,{ Fragment, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import button from "../styles/button.module.css";
import close from "../assets/logos/close.png";
import viewpassword from "../assets/logos/eye.png";
import { registerUser } from "../api/register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastStyles from "../styles/toast.module.css";
import Toast from "../Components/Toast";

export default function RegisterButton({onRegister,className}) {
  //check if modal is open
  const [open, setOpen] = useState(false);

  //opens modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  //handling formdata
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  //handle user registration
  const handleRegister = async () => {
    try {
      if (!registerData.username || !registerData.password) {
        setError(true);
        return;
      }
      const payload = await registerUser(registerData);
      onRegister();
      localStorage.setItem("username",registerData.username)
      setError(false);
      console.log("User Registered", payload);

      //reset form values
      setRegisterData({
        username: "",
        password: "",
      });

      //show toast when registration successfull
      toast.success("User Registered successfully!", {
        progressClassName: toastStyles["green-progress-bar"],
      });

      //close modal after successfull registraton
      onCloseModal()
    } catch (err) {
      console.error("Error during registration:", err.message);
    }
  };

  const [showPassword,setShowPassword] = useState(false)

  const handlePassword=(e)=>{
    setRegisterData({...registerData,password:e.target.value})
  }
  const togglePassword=()=>{
    setShowPassword(!showPassword)
  }

  return (
    <Fragment>
      <Toast />
      <button className={button.register} onClick={onOpenModal}>
        Register
      </button>
      <Modal
        open={open}
        showCloseIcon={false}
        center
        classNames={{
          modal:button.customModal
        }}
      >
        <img
          src={close}
          height={30}
          width={30}
          className={button.close}
          onClick={onCloseModal}
        ></img>
        <h1 className={button.modalHead}>Register to SwipTory</h1>
        <form>
          <div className={button.username}>
            <label className={button.usernamelabel}> Username </label>
            <input
              className={button.usernameinput}
              placeholder="Enter your Username"
              value={registerData.username}
              name="username"
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            ></input>
            <br />
          </div>
          <br />
          <div className={button.passwordcontainer}>
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
              value={registerData.password}
              onChange={handlePassword}
            ></input>
          </div>
          <span className={button.error}>
            {error ? "Username and password required" : ""}
          </span>
          <br />
        </form>
        <br />
        <button className={button.registerbtn} onClick={handleRegister}>
          Register
        </button>
      </Modal>
    </Fragment>
  );
}
