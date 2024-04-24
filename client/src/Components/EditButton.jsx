import React,{useState,Fragment} from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import close from "../assets/logos/close.png";
import edit from "../assets/logos/edit.png"
import Slide from "./Slide";
import addStory from "../styles/addstory.module.css";

export default function EditButton() {
    const [open, setOpen] = useState(false);

    //opens modal
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  return (
    <div>
        <Fragment>
        <button className={addStory.editbtn}  onClick={onOpenModal}>
              <img src={edit} width={12} height={12}></img>Edit</button>
      <Modal
          open={open}
          showCloseIcon={false}
          center
          classNames={{
            modal:addStory.customModal
          }}
      >
        <img src={close} onClick={onCloseModal} className={addStory.close}></img>
        <p className={addStory.para}>Add upto 6 slides</p>
        <Slide />
      </Modal>
    </Fragment>

    </div>
  )
}
