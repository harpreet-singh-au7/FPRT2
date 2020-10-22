import React, { useState } from "react";
import { useStateValue } from "../../Redux/StateProvider";
import "./userProfile.css";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import FormData from "form-data";
import {TodoEdit} from '../../StyledComponents'
import { InputBase, Typography } from '@material-ui/core'


function UserProfile() {
  const [{ user },dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [open, setOpen] = useState(false)


  const history = useHistory();



  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const imageupload = async (e) => {
    e.preventDefault();

    if (image) {
      const imgForm = new FormData();
      imgForm.append("file", image, filename);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      try {
        const res = axios
          .post("/user/upload/image", imgForm, config)
          .then((response) => {
            console.log(response.file);

            const imgdata = response.data.filename;

            console.log("IMG DATAAAA =>>>>", imgdata);
            setImageUrl(imgdata);
            setTimeout(() => {
              alert("image Uploaded")
            }, 1500);
            
          }).then(() => {
            setLoading1(true)
          })
          setLoading1(false)
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      alert("Please select an image to continue");
    }
  };

  let fdata = {
    username: name,
    password: password,
    email:user?.email,
    image: imageURL,
    // category: categoryt?.item,
  };

  const createProduct = (event) => {
    event.preventDefault();

    async function fetchUserData() {
      const res = await axios
        .post("/user/updateprofile", fdata,  {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            }})
        .then((res) => {
          console.log("MONGOOOO" + res.data);
          setTimeout(() => {
            history.push("/login");
          }, 1500);
        }).then(() => setLoading(true))
        .catch((error) => {
          console.log(error.response);
        });
    }

    fetchUserData();

    history.push("/login");
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();

  //   const imgForm = new FormData();
  //   imgForm.append("file", image, image.name);
  // };

  // const imgChange = (e) => {
  //   console.log("file to upload:", e.target.files[0]);
  //   let file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reaer.onload = _handleReaderLoaded();
  //     reader.readAsBinaryString(file);
  //   }
  // };
  // _handleReaderLoaded = (readerEvt) => {
  //   let binaryString = readerEvt.target.value;
  //   setImage({ base64TextString: btoa(binaryString) });
  // };

  return (
    <div className="addItems">
     
     {!user ? (
        history.push("/login")
      ) : (
        <>

          <div className="addItems_header">
            <h1>Hey,{user?.username}</h1>
            <h3>
             Here you can update your profile.Upload your profile photo to be displayed
            </h3>
          </div>
          
          <img className="user_image" src={`https://todos-ba.herokuapp.com/user/retrive/image/single?name=${user.image}`} alt="" />
          <div className="user_detail">
          <p ><h2>Personal Details</h2></p>
          <p className="em"><h4>email</h4><span> {user?.email}</span></p>
          </div>
          <div className="form_container">
              
         
        <form>
              <label for="title">
                <h5>Name</h5>
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                name="Name"
                placeholder="Enter the product name here"
                type="text"
              />
              <br />
             
              <label for="id">
                <h5>Password</h5>
              </label>

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="id"
                placeholder="Enter the product password here"
                type="password"
              />
                 
              <br />

              <div className="imageupload">
                <label for="image">Upload the product image</label>
                <div>
                  <Input
                    type="file"
                    onChange={handleChange}
                    accept=".jpeg,.jpg,.png,.img"
                  />
                  <button
                    type="submit"
                    className="imageupload__button"
                    // onChange={handleChange}
                    onClick={imageupload}
                  >
                    {loading1 ? <p>Uploading ... </p> : "Upload"}
                  </button>
                </div>
              </div>
              <br />

              <button
                onClick={createProduct}
                type="submit"
                className="additems_submit"
              >
                {loading ? <p>Loading ... </p> : "Update Profile"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
