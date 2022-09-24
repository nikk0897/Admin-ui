import { useState } from "react";

const ModalContent = ({ data, updateUserData }) => {
  const { id, name, email, role } = data;
  //Destructuring data of user 

  const [updateData, setupdateData] = useState({
    id: id,
    name: name,
    email: email,
    role: role
  });

  /*
  /* This function is called on change of partiucluar input field to edit the user's data
  */
  const editUserData = (e) => {
    setupdateData({...updateData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#myModal${updateData.id}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          style={{ opacity: "0.8"}}
          fill="currentColor"
          className="bi bi-pencil-square mx-4"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
        </svg>
      </button>
      <div className="modal fade" id={`myModal${updateData.id}`}>
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: "16px 0 0 16px" }}>
              <h5
                className="modal-title"
                id={`exampleModalLabel${updateData.id}`}
              >
                Update Userdata
              </h5>
              <button
                type="button"
                className="close btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" id="modal-cancel">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="text-start">
                  <label className="col-form-label">Name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="name"
                    value={`${updateData.name}`}
                    onChange={(e) => editUserData(e)}
                  />
                </div>
                <div className="text-start">
                  <label className="col-form-label">Email</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="recipient-email"
                    name="email"
                    value={`${updateData.email}`}
                    onChange={(e) => editUserData(e)}
                  />
                </div>
                <div className="text-start">
                  <label className="col-form-label">Role</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="recipient-role"
                    name="role"
                    value={`${updateData.role}`}
                    onChange={(e) => editUserData(e)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-sm btn-outline-primary"
                onClick={() => updateUserData(updateData.id, updateData)}
              >
                Update data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalContent;
