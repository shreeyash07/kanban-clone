import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import TicketModal from "./TicketModal";

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
// const getItems = (count, prefix) =>
//     Array.from({ length: count }, (v, k) => k).map((k) => {
//         const randomId = Math.floor(Math.random() * 1000);
//         return {
//             id: `item-${randomId}`,
//             prefix,
//             content: `item ${randomId}`
//         };
// });

// const getItems = (prefix) => ([{
//     id: `item-${1}`,
//     prefix,
//     content: `item ${1}`
// }])

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

const lists = ["Backlog", "todo", "inProgress", "done"];

const generateLists = () =>
    lists.reduce((acc, listKey) => ({ ...acc, [listKey]: [] }),
        {}
    );


function DragList() {
    const [elements, setElements] = useState(generateLists());
    // const [task, setTask] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    // const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
    const addTask = (task) => {
        // setNewTask([...getTasks, task]);
        // localStorage.setItem("taskAdded", JSON.stringify([...newTask, task]));
        const randomId = Math.floor(Math.random() * 1000);

        setElements((prevState) => {
            return {
                ...prevState, Backlog: [
                    ...prevState.Backlog,
                    {
                        id: `item-${randomId}`,
                        prefix: lists[0],
                        content: `item ${randomId}`,
                        title: task.title
                    }
                ]
            }
        });
    }

    // useEffect(() => {
    //     if (getTasks == null) {
    //         setTask([])
    //     } else {
    //         setTask(getTasks);
    //     }
    // }, [])

    const closeModal = () => {

        setIsOpen(false);
    };

    const openModal = () => {

        setIsOpen(true);
    };

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
        <DragDropContextContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <button onClick={openModal}>
                    click
                </button>
                <TicketModal modalIsOpen={modalIsOpen} closeModal={closeModal} addTask={addTask} />

                <ListGrid>
                    {lists.map((listKey) => (
                        <DraggableElement
                            elements={elements[listKey]}
                            key={listKey}
                            prefix={`${listKey}`}
                        />
                    ))}
                </ListGrid>
            </DragDropContext>

        </DragDropContextContainer>
    );
}

export default DragList;
