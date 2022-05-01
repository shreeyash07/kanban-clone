import React from "react";
import Modal from "react-modal";
import TicketForm from "./TicketForm";

const TicketModal = ({ modalIsOpen, closeModal, addTask }) => {

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal-appointment"
            ariaHideApp={false}
        >
            <TicketForm closeModal={closeModal} addTask={addTask} />
        </Modal>
    );
};

export default TicketModal;