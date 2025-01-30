import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';


type Status = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';


interface StatusChangeProps {
  initialStatus: Status;
  allStatuses: Status[];  
  allowedStatusChanges: Status[];
  onStatusChange?: (newStatus: Status) => void;
}

export default function StatusChange({
  initialStatus,
  allStatuses,
  allowedStatusChanges,
  onStatusChange
}: StatusChangeProps) {
  const [status, setStatus] = React.useState<Status>(initialStatus);

  // בדיקה האם השינוי מותר
  const isChangeAllowed = allowedStatusChanges.includes(status);

  const handleChange = (event: SelectChangeEvent<Status>) => {
    const newStatus = event.target.value as Status;
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select<Status>
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Status"
          onChange={handleChange}
          disabled={!isChangeAllowed}
        >
          {allStatuses.map((statusOption) => (
            <MenuItem 
              key={statusOption} 
              value={statusOption}
              disabled={!allowedStatusChanges.includes(statusOption)}
            >
              {statusOption.replace('_', ' ')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}