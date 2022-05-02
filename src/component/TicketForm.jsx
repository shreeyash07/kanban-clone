import React from "react";
import { useFormik } from "formik";

const TicketForm = ({ closeModal, handleSubmit, title, isEdit }) => {


    const formik = useFormik({
        initialValues: {

            title: (title) ? title : "",
        },
        onSubmit: (values) => {
            handleSubmit(values);
            closeModal();
        },
    });

    return (
        <div className="container">
            <div className="title-wrap mb-3 row">
                <h4 className="col-11">{isEdit? 'Edit Ticket': "Add Ticket"}</h4>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-wrap">
                    <div className="mb-3 row">
                        <h4>Title</h4>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Ticket Title"
                            id="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="mb-3 row">
                        <button className="button button-30" type="submit">
                        {isEdit? 'Update': "Add"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TicketForm;
