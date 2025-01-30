import React, { useState } from "react";
import { Button, ButtonGroup, Menu, MenuItem } from "@mui/material";
interface ActionButtonsProps {
  jobId: number;
  onStatusChange: (
    jobId: number,
    status: "approved" | "rejected" | "pending"
  ) => void;
  onMoreOptions: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  jobId,
  onStatusChange,
  onMoreOptions,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button
          onClick={handleClick}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          עוד
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              onMoreOptions();
            }}
          ></MenuItem>
          <MenuItem onClick={handleClose}>ערוך קו"ח</MenuItem>
          <MenuItem onClick={handleClose}>שמור לבדיקה</MenuItem>
          <MenuItem onClick={handleClose}>החזר תשובה לפונה</MenuItem>
        </Menu>
        <Button color="error" onClick={() => onStatusChange(jobId, "rejected")}>
          דחה
        </Button>
        <Button
          color="success"
          onClick={() => onStatusChange(jobId, "approved")}
        >
          אשר
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ActionButtons;
