import "./Sidebar.scss";

export default function Sidebar({ onSaveDesign }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar__heading">Create New Email</h2>

      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onSaveDesign}>
          Save Design
        </button>
        <button className="sidebar__button">Load Sample</button>
      </div>
    </div>
  );
}
