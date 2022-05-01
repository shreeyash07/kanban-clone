import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

const TicketForm = ({ closeModal, addTask }) => {

    const [newTask, setNewTask] = useState([]);

    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

    useEffect(() => {
        if (getTasks == null) {
            setNewTask([])
        } else {
            setNewTask(getTasks);
        }
        console.log(getTasks)
    }, [])



    const randomId = Math.floor(Math.random() * 1000);

    const formik = useFormik({
        initialValues: {
            id: `${randomId}`,
            prefix: "",
            content: "",
            title: "",
        },
        onSubmit: (values) => {
            addTask(values);
            closeModal();
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    placeholder="Ticket Title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}

                />
                {/* <label>Description</label>
                <input
                    type="text"
                    placeholder="Description"
                    id="content"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                /> */}

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TicketForm;
