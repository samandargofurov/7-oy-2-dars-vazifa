import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { nanoid } from "nanoid";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let u = getUsers();
    setUsers(u);
  }, []);

  function validate(name, age, email) {
    if (name.trim().length < 3) {
      alert("Name is empty");
      return false;
    }
  
    if (email.trim().length < 3) {
      alert("Email is empty");
      return false;
    }
  
    if (age <= 0 || age >= 200) {
      alert("Age is not a number");
      return false;
    }
  
    if (!Number(age)) {
      alert("Age is not a number");
      return false;
    }
  
    const emailValid = validateEmail(email);
    if (!emailValid) {
      alert("Email is empty");
      return false;
    }
  
    return true;
  }

  function handleClick(e) {
    e.preventDefault();

    const isValid = validate(name, age, email);
    if (isValid) {
      const user = {
        name: name,
        email: email,
        age: age,
        id: nanoid()
      };

      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user);
      localStorage.setItem("users", JSON.stringify(copied));
      setName("");
      setAge(0);
      setEmail("");
      setUsers(copied);
    }
  }

  function handleDelete(item) {
    let isDelete = confirm("Rostdan ham ochirmoqchimisiz");
    if (isDelete) {
      let copied = JSON.parse(JSON.stringify(users));
      copied = copied.filter((user) => {
        return user.id != item.id;
      });

      localStorage.setItem("users", JSON.stringify(copied));
      setUsers(copied);
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  function getUsers() {
    let users = [];
  
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
    }
  
    return users;
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-2 mb-3">Users information</h2>

        <form className="w-50 mx-auto d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={handleClick} className="btn btn-success">Submit</button>
        </form>

        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>
                      <div>
                        <FaRegTrashAlt
                          onClick={() => {
                            handleDelete(user);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

