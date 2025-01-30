import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import MultilineTextFields from "./AddJob";
import CandidatePage from "../pages/candidate/CandidatePage";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 1,
  p: 1,
};

interface ResumePopupProps {
  resumeUrl: string;
}

const ResumePopup = () => {
  const [open, setOpen] = React.useState(false);
  const [currentResumeUrl, setCurrentResumeUrl] = React.useState<string | null>(
    null
  );

  const handleOpen = async (url: string) => {
    return new Promise<void>((resolve) => {
      setCurrentResumeUrl(url);
      setOpen(true);
      setTimeout(() => resolve(), 0);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentResumeUrl(null);
  };

  const DialogComponent: React.FC<ResumePopupProps> = ({ resumeUrl }) => (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="resume-modal"
      aria-describedby="resume-display"
    >
      <Box sx={style}>
        {/* <p>{resumeUrl}</p> */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button onClick={handleClose}>
            <ClearIcon />
          </Button>
        </Box>
        {resumeUrl === "addJob" ? (
          <MultilineTextFields />
        ) : resumeUrl === "CandidatePage" ? (
          <CandidatePage />
        ) : (
          <Box sx={{ height: "calc(100% - 40px)", width: "100%" }}>
            <iframe
              src={`${resumeUrl}#toolbar=0`}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );

  return {
    ResumePop: () => <DialogComponent resumeUrl={currentResumeUrl || ""} />,
    showResumePop: handleOpen,
  };
};

export default ResumePopup;
