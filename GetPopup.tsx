import { useCallback, useMemo, useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface PopupOptions {
  message: string;
  severity: AlertColor;
  duration?: number;
  variant: string;
}

const GetPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({
    message: "",
    severity: "info",
    duration: 500,
    variant: "filled",
  });

  const showPopup = (options: PopupOptions) => {
    setPopupOptions(options);
    setIsPopupOpen(true);
  };

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const Popup = useMemo(() => {
    return () => (
      <Snackbar
        open={isPopupOpen}
        autoHideDuration={popupOptions.duration}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          width: "40%",
          "& .MuiSnackbar-root": {
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <Alert
          onClose={handleClosePopup}
          severity={popupOptions.severity}
          variant={popupOptions.variant}
          sx={{ width: "100%" }}
        >
          {popupOptions.message}
        </Alert>
      </Snackbar>
    );
  }, [isPopupOpen, popupOptions, handleClosePopup]);

  return {
    Popup,
    showPopup,
  };
};

export default GetPopup;
