import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PaginationComponent({ page, setPage }) {
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={100}
        // page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
