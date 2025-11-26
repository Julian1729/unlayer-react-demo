import EmailEditor from "react-email-editor";

const EmailComponent = ({ emailEditorRef }) => {
  const onReady = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  return (
    <EmailEditor
      ref={emailEditorRef}
      onReady={onReady}
      minHeight={"100vh"}
      options={{
        projectId: 281601,
        displayMode: "email",
        version: "latest",
      }}
    />
  );
};

export default EmailComponent;
