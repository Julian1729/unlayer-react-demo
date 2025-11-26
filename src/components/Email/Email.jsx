import EmailEditor from "react-email-editor";

const EmailComponent = ({ emailEditorRef, editorIsReady }) => {
  return (
    <EmailEditor
      ref={emailEditorRef}
      onReady={editorIsReady}
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
