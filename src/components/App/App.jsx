import { useRef, useState } from "react";

import Sidebar from "../Sidebar/Sidebar.jsx";
import EmailComponent from "../Email/Email.jsx";
import HTMLViewer from "../HTMLViewer/HTMLViewer.jsx";
import "./App.scss";

function App() {
  const emailEditorRef = useRef(null);
  const [isOpenHTMLViewer, setIsOpenHTMLViewer] = useState(false);
  const [exportedHTML, setExportedHTML] = useState("");

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      setExportedHTML(html);
      setIsOpenHTMLViewer(true);
    });
  };

  return (
    <div className="App">
      <HTMLViewer isOpen={isOpenHTMLViewer} exportedHTML={exportedHTML} />
      <Sidebar onExportHtml={exportHtml} />
      <EmailComponent emailEditorRef={emailEditorRef} />
    </div>
  );
}

export default App;
