import React, { Fragment, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import addStory from "../styles/addstory.module.css";
import close from "../assets/logos/close.png";
import Slide from "./Slide";

export default function AddStory() {
  const [open, setOpen] = useState(false);

  //opens modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <Fragment>
      <button onClick={onOpenModal} className={addStory.btn}>
        Add Story
      </button>
      <Modal
          open={open}
          showCloseIcon={false}
          center
          classNames={{
            modal:addStory.customModal
          }}
      >
        <img src={close} onClick={onCloseModal} className={addStory.close}></img>
        <h1 className={addStory.mobilehead}>Add Story to Feed</h1>
        <p className={addStory.para}>Add upto 6 slides</p>
        <Slide />
      </Modal>
    </Fragment>
  );
}
