import { Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
import React from "react";

const Column = ({ prefix, elements, setElements }) => (
    <div className="column-wrap">
        <div className="column-title">{prefix}</div>
        <Droppable droppableId={`${prefix}`}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {elements.map((item, index) => (
                        <Ticket key={item.id} item={item} index={index} setElements={setElements} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

export default Column;
