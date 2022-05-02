import React from "react";
import Modal from "react-modal";
import TicketForm from "./TicketForm";

const TicketModal = ({ modalIsOpen, closeModal, handleSubmit, title, isEdit }) => {

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal-ticket"
            ariaHideApp={false}
        >
            <TicketForm closeModal={closeModal} handleSubmit={handleSubmit} title={title} isEdit = {isEdit}/>
        </Modal>
    );
};

export default TicketModal;