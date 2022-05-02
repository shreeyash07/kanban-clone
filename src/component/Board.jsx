import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TicketModal from "./TicketModal";

const lists = ["Backlog", "todo", "inProgress", "done"];


const generateLists = () =>
    lists.reduce((acc, listKey) => ({ ...acc, [listKey]: [] }),
        {}
    );

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element, nextElementId) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    result[0].prefix = nextElementId;
    return result;
};


const Board = () => {
    const [elements, setElements] = useState(generateLists());
    const [modalIsOpen, setIsOpen] = useState(false);


    const addTask = (task) => {

        const randomId = Math.floor(Math.random() * 1000);

        setElements((prevState) => {
            const data = {
                ...prevState, Backlog: [
                    ...prevState.Backlog,
                    {
                        id: `item-${randomId}`,
                        prefix: lists[0],
                        content: `Ticket id:  ${randomId}`,
                        title: task.title
                    }
                ]
            }
            localStorage.setItem("taskAdded", JSON.stringify(data));
            return data;
        });
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    useEffect(
        () => {
            if (localStorage.getItem("taskAdded") !== null) {
                setElements(JSON.parse(localStorage.getItem("taskAdded")));
            }
        },
        []
    )

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...elements };

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement,
            result.destination.droppableId
        );

        setElements(listCopy);
    };

    return (
        <div className="board">
            <DragDropContext onDragEnd={onDragEnd}>
                <h2>Kanaban Board</h2>
                <div className="mb-3">

                    <button className="button button-30" onClick={openModal}>
                        Add Ticket
                    </button>
                </div>
                <TicketModal modalIsOpen={modalIsOpen} closeModal={closeModal} handleSubmit={addTask} />

                <div className="column-grid">
                    {lists.map((listKey) => (
                        <Column
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={`${listKey}`}
                            setElements={setElements}
                        />
                    ))}
                </div>
            </DragDropContext>

        </div>
    );
}

export default Board;
