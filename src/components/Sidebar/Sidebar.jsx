import { useState } from "react";
import moment from "moment";

import "./Sidebar.scss";

export default function Sidebar({ onSaveDesign, lastSavedAt, loadSample }) {
  const [jsonInput, setJsonInput] = useState("");

  const handleLoadSample = () => {
    loadSample(jsonInput);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar__heading">Create New Email</h2>

      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onSaveDesign}>
          Save Design
        </button>

        <p className="sidebar__or">or</p>

        <textarea
          className="sidebar__textarea"
          placeholder="Paste design JSON here to load"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        ></textarea>

        <button className="sidebar__button" onClick={handleLoadSample}>
          Load Sample
        </button>
      </div>

      <p className="sidebar__save-indicator">
        Last saved at {lastSavedAt ? moment(lastSavedAt).format("LT") : "Never"}
      </p>
    </div>
  );
}
