import { useEffect, useRef } from "react";
import "./HtmlViewer.scss";

const HTMLViewer = ({ isOpen, close, exportedHTML }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [isOpen]);

  return (
    <div className={`htmlv ${isOpen ? "htmlv--open" : ""}`}>
      <div className="htmlv__inner">
        {/* Close button */}
        <button className="htmlv__close-button" onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
            <path
              d="M3 0v5c.004.527.219 1.035.594 1.406L10.188 13l-6.594 6.594c-.375.37-.59.879-.594 1.406v5h4v-4.188l6-6 6 6V26h4v-5a2.004 2.004 0 0 0-.594-1.406L15.813 13l6.593-6.594c.375-.37.59-.879.594-1.406V0h-4v4.188l-6 6-6-6V0Z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                fill: "#fff",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform="matrix(.77 0 0 .77 1.99 1.99)"
            />
          </svg>
        </button>

        {/* Code Preview */}
        <textarea
          ref={textareaRef}
          className="htmlv__textarea"
          readOnly
          value={exportedHTML || "Nothing to see here yet..."}
        ></textarea>

        {/* Copy Button */}
        <button
          className="htmlv__copy-button"
          onClick={() => navigator.clipboard.writeText(exportedHTML)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
            <path
              d="M15 0c-1.645 0-3 1.355-3 3H8C6.346 3 5 4.346 5 6v17c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3h-4c0-1.645-1.355-3-3-3zm0 2c.564 0 1 .436 1 1 0 .564-.436 1-1 1-.564 0-1-.436-1-1 0-.564.436-1 1-1zM8 5h4v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V5h4c.551 0 1 .449 1 1v17c0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1V6c0-.551.449-1 1-1zm4 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-16 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm16 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-16 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm16 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-16 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                fill: "#000",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform="matrix(.67 0 0 .67 .61 1.95)"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HTMLViewer;
