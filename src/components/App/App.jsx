import { use, useEffect, useRef, useState } from "react";
import moment from "moment";

import Sidebar from "../Sidebar/Sidebar.jsx";
import EmailComponent from "../Email/Email.jsx";
import HTMLViewer from "../HTMLViewer/HTMLViewer.jsx";
import "./App.scss";

function App() {
  const emailEditorRef = useRef(null);
  const [isOpenHTMLViewer, setIsOpenHTMLViewer] = useState(false);
  const [exportedHTML, setExportedHTML] = useState("");
  const [exportedJSON, setExportedJSON] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [designId, setDesignId] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const closeHTMLViewer = () => {
    setIsOpenHTMLViewer(false);
  };

  const handleSaveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      console.log(typeof design);

      setExportedJSON(design);
      setExportedHTML(html);
      setIsOpenHTMLViewer(true);
    });
  };

  const handleDesignUpdated = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design } = data;

      // save the updated design to localStorage
      localStorage.setItem(designId, JSON.stringify(design));

      // set the last saved timestamp
      setLastSavedAt(moment());
    });
  };

  useEffect(() => {
    // create a unique design ID (for localStorage key) when the app loads
    const newDesignId = `design-${Date.now()}`;
    setDesignId(newDesignId);
  }, []);

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
        exportedJSON={exportedJSON}
      />
      <Sidebar onSaveDesign={handleSaveDesign} lastSavedAt={lastSavedAt} />
      <EmailComponent
        emailEditorRef={emailEditorRef}
        editorIsReady={() => setIsEditorReady(true)}
      />
    </div>
  );
}

export default App;
