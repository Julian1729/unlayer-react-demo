import { useEffect, useRef, useState } from "react";

import Sidebar from "../Sidebar/Sidebar.jsx";
import EmailComponent from "../Email/Email.jsx";
import HTMLViewer from "../HTMLViewer/HTMLViewer.jsx";
import "./App.scss";

function App() {
  const emailEditorRef = useRef(null);
  const [isOpenHTMLViewer, setIsOpenHTMLViewer] = useState(false);
  const [exportedHTML, setExportedHTML] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const closeHTMLViewer = () => {
    setIsOpenHTMLViewer(false);
  };

  const handleSaveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      setExportedHTML(html);
      setIsOpenHTMLViewer(true);
    });
  };

  const handleDesignUpdated = (data) => {
    // Design is updated by the user
    var type = data.type; // body, row, content
    var item = data.item;
    var changes = data.changes;
    console.log("design:updated", type, item, changes);
  };

  useEffect(() => {
    if (!isEditorReady) return;

    const unlayer = emailEditorRef.current?.editor;

    unlayer.addEventListener("design:updated", handleDesignUpdated);

    return () => {
      unlayer.removeEventListener("design:updated", handleDesignUpdated);
    };
  }, [isEditorReady]);

  return (
    <div className="App">
      <HTMLViewer
        isOpen={isOpenHTMLViewer}
        close={closeHTMLViewer}
        exportedHTML={exportedHTML}
      />
      <Sidebar onSaveDesign={handleSaveDesign} />
      <EmailComponent
        emailEditorRef={emailEditorRef}
        editorIsReady={() => setIsEditorReady(true)}
      />
    </div>
  );
}

export default App;
