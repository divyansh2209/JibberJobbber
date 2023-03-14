import React from "react";
import { useState } from "react";
import "../Register/register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate, Link } from "react-router-dom";
import photo from "../../assests/Validation.png";
import { IoIosAttach } from "react-icons/io";

const Register = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  const handleSumbi = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = `${e.target[1].value}`;
    const password = `${e.target[2].value}`;
    console.log(typeof email, typeof password);
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userchats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="forms">
      <div className="formContainer">
        <h2>Jibber Jobber</h2>
        <div className="formWrapper">
          <span className="logo">Welcome !</span>
          <form onSubmit={handleSumbi}>
            <p>Display name</p>
            <input type="text" placeholder="display name" />
            <p>Email</p>
            <input type="email" placeholder="email" />
            <p>Password</p>
            <input type="password" placeholder="password" />
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <div className="input-avatar">
                <p>
                  <IoIosAttach />
                </p>
                <p>Add an avatar</p>
              </div>
            </label>
            <button>Register</button>

            {err && <span className="error">Something went wrong</span>}
          </form>
        </div>
      <p className="register-link">You do have an account?  <Link to="/login">Login</Link></p>

      </div>
      <div className="form-right">
        <img className="login-photo" src={photo} alt="" />
      </div>
    </div>
  );
};

export default Register;
