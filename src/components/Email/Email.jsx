import EmailEditor from "react-email-editor";

import { customModernDarkBlue, customModernLightBlue } from "../../themes";
import useIsDarkMode from "../../hook/useIsDarkMode";

const EmailComponent = ({ emailEditorRef, editorIsReady }) => {
  const isDarkMode = useIsDarkMode();

  return (
    <EmailEditor
      ref={emailEditorRef}
      onReady={editorIsReady}
      minHeight={"100vh"}
      options={{
        projectId: 281601,
        displayMode: "email",
        version: "latest",
        appearance: {
          // set initial theme based on system preference
          theme: isDarkMode ? customModernDarkBlue : customModernLightBlue,
        },
        customCSS: [
          `
          div[data-theme-name="custom_modern_light_blue"] .toolbar-button {
            color: #fff !important;
          }
          `,
          `
          .gIjflh > .nav-tabs .nav-item .nav-link:not(.active):hover {
            color: #1e52aa;
          }
        `,
        ],
      }}
    />
  );
};

export default EmailComponent;
