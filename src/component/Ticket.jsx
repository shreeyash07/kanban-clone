import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import TicketModal from "./TicketModal";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Ticket = ({ item, index, setElements }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const editTask = (values) => {
    setElements((prevState) => {
      const data = { ...prevState };
      const index = prevState[item.prefix].findIndex(
        (val) => val.id === item.id
      );
      data[item.prefix][index].title = values.title;
      localStorage.setItem("taskAdded", JSON.stringify(data));
      return data;
    });
  };

  const deleteTask = () => {
    setElements((prevState) => {
      const data = { ...prevState };
      const index = prevState[item.prefix].findIndex(
        (val) => val.id === item.id
      );
      data[item.prefix].splice(index, 1);
      localStorage.setItem("taskAdded", JSON.stringify(data));
      return data;
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="ticketDrag"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="row">
              <h3 className="col-6">{item.title}</h3>
              <div className="col-3">
                <EditIcon onClick={openModal} />
              </div>
              <div className="col-3">
                <DeleteIcon onClick={deleteTask} />
              </div>
            </div>

            <div className="ticketFooter">
              <span>{item.content}</span>
            </div>

            <TicketModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              handleSubmit={editTask}
              title={item.title}
              isEdit={true}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default Ticket;
