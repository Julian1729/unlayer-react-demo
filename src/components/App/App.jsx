import { use, useEffect, useRef, useState } from "react";
import moment from "moment";

import Sidebar from "../Sidebar/Sidebar.jsx";
import EmailComponent from "../Email/Email.jsx";
import HTMLViewer from "../HTMLViewer/HTMLViewer.jsx";
import "./App.scss";

import useIsDarkMode from "../../hook/useIsDarkMode.js";
import { customModernDarkBlue, customModernLightBlue } from "../../themes.js";

function App() {
  const emailEditorRef = useRef(null);
  const [isOpenHTMLViewer, setIsOpenHTMLViewer] = useState(false);
  const [exportedHTML, setExportedHTML] = useState("");
  const [exportedJSON, setExportedJSON] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [designId, setDesignId] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const isDarkMode = useIsDarkMode();

  const closeHTMLViewer = () => {
    setIsOpenHTMLViewer(false);
  };

  const handleSaveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      setExportedJSON(design);
      setExportedHTML(html);
      setIsOpenHTMLViewer(true);
    });
  };

  const handleLoadSample = (jsonInput) => {
    const unlayer = emailEditorRef.current?.editor;

    // NOTE: loadDesign expects a JS object not a JSON string
    unlayer?.loadDesign(JSON.parse(jsonInput));
  };

  // Store JSON design to localStorage when the design is updated and update last saved timestamp
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

  // On app load: create a unique design ID to be used as localStorage key
  useEffect(() => {
    const newDesignId = `design-${Date.now()}`;
    setDesignId(newDesignId);
  }, []);

  // On editor ready: set up design updated event listener
  useEffect(() => {
    if (!isEditorReady) return;

    const unlayer = emailEditorRef.current?.editor;

    unlayer.addEventListener("design:updated", handleDesignUpdated);

    return () => {
      unlayer.removeEventListener("design:updated", handleDesignUpdated);
    };
  }, [isEditorReady]);

  // On editor ready: set theme based on user's theme preference and listen for changes
  useEffect(() => {
    // OPTIMIZE: avoid running on isEditorReady change
    if (!isEditorReady) return;

    const unlayer = emailEditorRef.current?.editor;

    if (isDarkMode) {
      // unlayer.setTheme("modern_dark");
      unlayer.setTheme(customModernDarkBlue);
    } else {
      // unlayer.setTheme("modern_light");
      unlayer.setTheme(customModernLightBlue);
    }
  }, [isEditorReady, isDarkMode]);

  return (
    <div className="App">
      <HTMLViewer
        isOpen={isOpenHTMLViewer}
        close={closeHTMLViewer}
        exportedHTML={exportedHTML}
        exportedJSON={exportedJSON}
      />
      <Sidebar
        onSaveDesign={handleSaveDesign}
        lastSavedAt={lastSavedAt}
        loadSample={handleLoadSample}
      />
      <EmailComponent
        emailEditorRef={emailEditorRef}
        editorIsReady={() => setIsEditorReady(true)}
      />
    </div>
  );
}

export default App;
