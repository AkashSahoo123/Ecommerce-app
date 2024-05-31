import React from "react";
import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="john" />
        </div>
        <div className="newUserItem">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="John Smith" />
        </div>
        <div className="newUserItem">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label htmlFor="active">Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
