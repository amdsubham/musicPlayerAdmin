import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveWebsite, getWebsite, updateWebsite } from "../firebase/api";
import _toString from 'lodash/toString'
import _lowerCase from 'lodash/lowerCase';
import { useParams, useNavigate } from "react-router-dom";
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const initialState = {
  url: "",
  name: "",
  rating: "",
  genre: "",
  thumbnail: "",
};
export const WebsiteForm = (props) => {
  const [website, setWebsite] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) => {
    console.log('name', name)
    if (name === 'thumbnail' || name === 'url') {
      setWebsite({ ...website, [name]: value });
    }
    else {
      setWebsite({ ...website, [name]: _lowerCase(_toString(value)) });
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await saveWebsite(website);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateWebsite(params.id, website);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setWebsite(initialState);
    navigate("/");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getWebsite(id);
      setWebsite({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <img style={{ padding: '2rem' }} src={website.thumbnail}></img>

        <label htmlFor="url">Music Link</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
            <i className="material-icons">insert_link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="https://someurl.xyz"
            value={website.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="url">Thumbnail</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
            <i className="material-icons">insert_link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="https://someurl.xyz"
            value={website.thumbnail}
            name="thumbnail"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="name">Genre</label>
        <div className="input-group">
          <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div>
          <select name="genre" id="genre" value={[website.genre]} onChange={handleInputChange} >
            <option value="romatic">Romatic</option>
            <option value="sad">Sad</option>
            <option value="devotional">Devotional</option>
            <option value="rock">Rock</option>
          </select>
        </div>
        <label htmlFor="name">Music Name:</label>
        <div className="input-group">
          <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div>
          <input
            type="text"
            value={website.name}
            name="name"
            placeholder="Music Name"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="rating">Rating</label>
        <input
          rows="3"
          className="form-control mb-3"
          placeholder="Give rating"
          name="rating"
          value={website.rating}
          onChange={(value) => handleInputChange(_toString(value))}
        ></input>
        {/* <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload Music</Button>
        </Upload> */}
        <button
          className="btn btn-primary btn-block"
          disabled={!website.url || !website.name}
        >
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
