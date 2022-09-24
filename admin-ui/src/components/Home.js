import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import ModalContent from "./ModalContent";
import { Modal} from "bootstrap";

const Home = () => {
  const [loading, setloading] = useState(true);
  const [userList, setuserList] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [selected, setselected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCheckedAll, setisCheckedAll] = useState(false);
  const postperPage = 10;

  //GET the details of the users by making an API call
  /*
   * API endpoint - "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
   */
  const performUserApi = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      // console.log(response.data);
      setloading(false);
      setuserList(response.data);
    } catch (error) {
      alert("Failed to fecth data");
    }
  };

  const indexOfLastItem = currentPage * postperPage;
  const indexOfFirstItem = indexOfLastItem - postperPage;
  let currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the user based on this text.
   *    so we are setting the text into state called searchText and filtering the list
   *
   */
  const handleSearchInput = (e) => {
    setsearchText(e.target.value);
  };

//filtering list on the basis of search data  
  let filterList = [];
  if (searchText.length <= 1) {
    filterList = currentItems;
  } else {
    filterList = userList.filter(
      (userData) =>
        userData.name.toLowerCase().includes(searchText.toLowerCase()) ||
        userData.email.toLowerCase().includes(searchText.toLowerCase()) ||
        userData.role.toLowerCase().includes(searchText.toLowerCase())
      //toLowerCase() is using here for the case-sensitivity
    );
  }

  useEffect(() => {
    performUserApi();
  }, []);


  /**
   * Definition for Edit handler
   * This is the function that is to be called to update user data
   *
   * * @param {{ userId: string, updatedData: object }}
   *    ID of the user that is to be updated into the list
   *    UpdatedData of the user
   */
  const updateUserData = (userId, updatedData) => {
    let indexOfUserData = userList.findIndex((data) => data.id === userId);
    // console.log(indexOfUserData)
    userList.splice(indexOfUserData, 1, updatedData);
    filterList = userList;
    setuserList([...filterList]);
    alert("Data updated successfully");
  };


  /**
   * Definition for delete handler
   * This is the function that is called on pressing delete button
   *
   *  @param {string} userId
   *    ID of the user that is to be deleted from the list
   *
   */
  const deleteUser = (userId) => {
    filterList = userList.filter((userData) => userData.id !== userId);
    setuserList([...filterList]);
  };

  /**
   * This is the function that is called when we want to delete some users
   *
   */
  const deleteSelectedUser = () => {
    // console.log(selected);
    filterList = userList.filter((userData) => !selected.includes(userData));
    setuserList([...filterList]);
    setisCheckedAll(false);
    // setisChecked(false);
  };

  /**
   * This is the function that is called to select all user's of a particular page
   *
   */
  const selectAllUser = (e) => {
    const { checked } = e.target;
    if (checked) {
      setisCheckedAll(true);
      setselected([...currentItems]);
    } else {
      setisCheckedAll(false);
      setselected([]);
    }
  };

  /**
   * This is the function that is called to handle selected users
   *
   */
  const handleCheckBox = (e, data) => {
    const { checked } = e.target;
    //console.log(checked);
    if (checked) {
      setselected([...selected, data]);
    } else {
      setselected([...selected].filter((userData) => userData !== data));
      //console.log(selected);
    }
  };

  //----------------------------------------pagination----------------------------------------------------------------

  const totalPages = [];
  for (let i = 1; i <= Math.ceil(userList.length / postperPage); i++) {
    totalPages.push(i);
  }

  /*
   * This is the function that is called when we want to go on particular page
   */
  const pageClicked = (e) => {
    setCurrentPage(e.target.id);
  };

  /*
   * This is the function that is called when we want to go directly on first page
   */
  const firstPage = () => {
    setCurrentPage(totalPages[0]);
  };

  /*
   * This is the function that is called when we want to go directly on last page
   */
  const lastPage = () => {
    setCurrentPage(totalPages.length);
  };

  /*
   * This is the function that is called when we want to go on previous page from current page
   */
  const previousPage = () => {
    let page = parseInt(currentPage);
    if (page === totalPages[0]) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page - 1);
    }
  };

  /*
   * This is the function that is called when we want to go on next page from current page
   */
  const nextPage = () => {
    let page = parseInt(currentPage);
    if (page === totalPages.length) {
      setCurrentPage(totalPages.length);
    } else {
      setCurrentPage(page + 1);
    }
  };

  return (
    <div className="container p-3">
      <SearchBar handleChange={handleSearchInput} text={searchText} />
      {loading ? (
        <div className="spinner-border text-primary progress" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      style={{
                        border: "2px outset",
                        fontSize: "22px",
                        marginRight: "5px",
                      }}
                      onChange={selectAllUser}
                      checked={isCheckedAll}
                      value="CheckedAll"
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterList.map((userData) => {
                  return (
                    <tr
                      key={userData.id}
                      className={`${
                        selected.includes(userData) && "table-active"
                      }`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          style={{ border: "2px outset" }}
                          value={userData.id}
                          id={userData.id}
                          checked={selected.includes(userData)}
                          onChange={(e) => handleCheckBox(e, userData)}
                        />
                      </td>
                      <td>{userData.name}</td>
                      <td>{userData.email}</td>
                      <td>{userData.role}</td>
                      <td>
                        <ModalContent
                          data={userData}
                          updateUserData={updateUserData}
                        />
                        <button
                          onClick={() => deleteUser(userData.id)}
                          className="btn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash text-danger"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filterList.length !== 0 ? (
              <Footer
                selected={selected}
                deleteSelectedUser={deleteSelectedUser}
                totalPages={totalPages}
                pageClicked={pageClicked}
                currentPage={currentPage}
                firstPage={firstPage}
                lastPage={lastPage}
                previousPage={previousPage}
                nextPage={nextPage}
                searchText={searchText}
              />
            ) : (
              <div class="alert alert-danger" role="alert">
                Data Not Aailable!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
