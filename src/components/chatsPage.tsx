import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "axios";

// Modal component
const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  return (
    <div
      className="modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
      >
        <span
          className="close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            cursor: "pointer",
            color: "red",
            fontSize: "20px",
          }}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

// DocumentSubmissionForm component
const DocumentSubmissionForm: React.FC<{
  option: string;
  onSubmit: (file: File) => void;
}> = ({ option, onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".txt, .pdf, .doc, .docx"
        style={{ marginBottom: "10px" }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          outline: "none",
        }}
      >
        Submit
      </button>
    </form>
  );
};

const ChatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalOptions, setModalOptions] = useState<string[]>([
    "Summarise Document",
    "Generate Reply",
    "Read Summary",
  ]);
  const [summaryOrReply, setSummaryOrReply] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading delay
  const [typedText, setTypedText] = useState(""); // State for typed text

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const secret = sessionStorage.getItem("secret");
    if (!username || !secret) {
      console.error("Username or secret not found in sessionStorage");
      navigate("/authPage");
    } else {
      // Simulate a 3-second loading delay
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    return () => {};
  }, [navigate]);

  const handleBack = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("secret");
    navigate("/authPage");
  };

  const handleDropdownItemClick = (item: string) => {
    if (item === "+ AI Features") {
      return;
    }
    setSelectedOption(item);
    setShowModal(modalOptions.includes(item));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFileSubmit = async (file: File) => {
    try {
      // Implement file processing logic here
      console.log("File submitted:", file);
      // Simulated response
      const summary = "This is a summary of the document.";
      setSummaryOrReply(summary);
      setShowModal(true);
    } catch (error) {
      console.error("Error occurred while processing file:", error);
    }
  };

  const handleReadSummary = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/tts",
        { text: summaryOrReply },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error occurred while converting text to speech:", error);
    }
  };

  const defaultProjectId = "eb2c19bc-78f3-44fa-b829-14b962eb42fc";

  return (
    <div style={{ height: "100vh", width: "100vw", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            padding: "4px 10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            outline: "none",
          }}
        >
          Back
        </button>
        <div>
          {/* Dropdown menu */}
          <select
            onChange={(e) => handleDropdownItemClick(e.target.value)}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "linear-gradient(135deg, yellow, orange)",
              color: "#333",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              outline: "none",
              transition: "border-color 0.3s",
            }}
          >
            <option
              value=""
              style={{
                background: "linear-gradient(135deg, #ffffb3, #ffcc80)",
              }}
            >
              + AI Features
            </option>
            <option
              value="Summarise Document"
              style={{
                background: "linear-gradient(135deg, #ffff99, #ffb366)",
              }}
            >
              Summarise Document
            </option>
            <option
              value="Generate Reply"
              style={{
                background: "linear-gradient(135deg, #ffff66, #ffa64d)",
              }}
            >
              Generate Reply
            </option>
            <option
              value="Read Summary"
              style={{
                background: "linear-gradient(135deg, #ffff33, #ff9933)",
              }}
            >
              Read Summary
            </option>
          </select>
        </div>
      </div>
      {/* Loading indicator */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 50px)", // Adjust height to center vertically
          }}
        >
          <div
            style={{
              border: "5px solid #f3f3f3" /* Light grey */,
              borderTop: "5px solid #3498db" /* Blue */,
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 2s linear infinite",
            }}
          ></div>
        </div>
      )}
      {/* PrettyChatWindow component */}
      {!loading && (
        <PrettyChatWindow
          projectId={
            process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID || defaultProjectId
          }
          username={sessionStorage.getItem("username") || ""}
          secret={sessionStorage.getItem("secret") || ""}
          style={{ height: "calc(100vh - 50px)" }}
        />
      )}
      {/* Modal for file submission */}
      {showModal && (
        <Modal onClose={handleModalClose}>
          <div style={{ textAlign: "center" }}>
            <h2>{selectedOption}</h2>
            {selectedOption === "Summarise Document" && (
              <DocumentSubmissionForm
                option={selectedOption}
                onSubmit={(file) => handleFileSubmit(file)}
              />
            )}
            {selectedOption === "Read Summary" && (
              <>
                <input
                  type="text"
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  placeholder="Type text here..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                />
                <p>{summaryOrReply}</p>
                <button onClick={handleReadSummary}>
                  <span
                    role="img"
                    aria-label="Speaker"
                    style={{ marginRight: "5px" }}
                  >
                    🔊
                  </span>
                  Play Summary
                </button>
              </>
            )}
            <span
              className="close"
              onClick={handleModalClose}
              style={{
                position: "absolute",
                top: "5px",
                right: "10px",
                cursor: "pointer",
                color: "red",
                fontSize: "20px",
              }}
            >
              &times;
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ChatsPage;
