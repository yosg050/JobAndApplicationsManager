import React, { useEffect, useId, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Badge,
  Grid,
  Tooltip,
  IconButton,
  createTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import DescriptionIcon from "@mui/icons-material/Description";
import GetPopup from "./GetPopup";
import ResumePopup from "./ResumeUrlPopup";
import ActionButtons from "./ActionButtonsAdmin";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CreateIcon from "@mui/icons-material/Create";
import Chip from "@mui/joy/Chip";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ThemeProvider } from "@emotion/react";

interface Inquiries {
  id: number;
  applicantName: string;
  sex: "man" | "women";
  dateOfBirth: string;
  appliedDate: string;
  Hometown: string;
  phone: string;
  mail: string;
  matchEmployerStatus: "awaiting" | "interview" | "accepted" | "rejected";
  matchKivunStatus: "pending" | "approved" | "rejected";
  cvUrl: string;
  // additionalLetter: string;
}

interface Job {
  idJob: number;
  company: string;
  title: string;
  jobDetails: string;
  DatePublished: string;
  employerStatus:
    | "open"
    | "closed"
    | "interviewing "
    | "paused"
    | "filled"
    | "canceled";
  kivunStatus: "pending" | "approved" | "rejected";
  match: Inquiries[];
}

interface TitleJobs {
  [title: string]: Job[];
}

const ApplicationsForJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  // @ts-ignore
  const [titleJobs, setTitleJobs] = useState<TitleJobs>({});
  // @ts-ignore
  const [applicationCounts, setApplicationCounts] = useState<
    Record<string, number>
  >({});
  const { Popup, showPopup } = GetPopup();
  const { ResumePop, showResumePop } = ResumePopup();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/jobs.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const data = JSON.parse(text);
        // console.log(text);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const grouped = jobs.reduce((acc, job) => {
      if (!acc[job.title]) {
        acc[job.title] = [];
      }
      acc[job.title].push(job);
      return acc;
    }, {} as TitleJobs);

    setTitleJobs(grouped);

    const counts: Record<string, number> = {};
    jobs.forEach((job) => {
      counts[job.idJob] = job.match.length;
    });
    setApplicationCounts(counts);
  }, [jobs]);

  const handleStatusChange = (jobId: number, newStatus: string) => {
    if (newStatus === "approved") {
      showPopup({
        message: "נשלח!",
        severity: "success",
        duration: 500,
        variant: "filled",
      });
    }
    if (newStatus === "rejected") {
      showPopup({
        message: "נדחה!",
        severity: "error",
        duration: 500,
        variant: "filled",
      });
    }
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.idJob === jobId ? { ...job, status: newStatus } : job
      )
    );
  };
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("he-IL");
  };
  const calculateAge = (birthDate: string): number => {
    const tody = new Date();
    const birthDateObj = new Date(birthDate);
    let age = tody.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = tody.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && tody.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };
  // @ts-ignore
  const handleShowResume = async (
    url: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await showResumePop(url);
  };
  const handleMoreOptions = () => {
    console.log("More options clicked");
  };

  // const PopupEditing = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
  //   console.log("Popup");
  // };

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: "center",
          },
        },
      },
    },
  });

  return (
    <>
      <Grid sx={{ mt: 9 }}>
        <Grid>
          {jobs.map((job) => (
            <Accordion key={job.idJob} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`job${job.idJob}-content`}
                id={`job${job.idJob}-header`}
              >
                <Grid>
                  <Badge badgeContent={job.match.length} color="primary">
                    <ContactPageIcon color="action" />
                  </Badge>
                </Grid>
                <Grid
                // container
                // direction="column"
                // justifyContent="center"
                // alignItems="center"
                >
                  <Grid
                  // container
                  // direction="row"
                  // justifyContent="center"
                  // alignItems="center"
                  >
                    <Tooltip title={job.jobDetails}>
                      <Button>
                        <Typography
                        // sx={{
                        //   fontSize: "1rem",
                        //   fontWeight: "bold",
                        //   color: "primary.main",
                        //   textTransform: "uppercase",
                        //   margin: "0px",
                        // }}
                        >
                          {job.title} / {job.company}
                        </Typography>
                      </Button>
                    </Tooltip>
                  </Grid>

                  <Box
                  // sx={{
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   gap: 1,
                  //   alignItems: "center",
                  //   color: "black",
                  // }}
                  ></Box>
                </Grid>
                <Grid>
                  <Tooltip title="ערוך פרטי משרה">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(event) => handleShowResume("addJob", event)}
                    >
                      <CreateIcon />
                    </IconButton>
                  </Tooltip>

                  <Chip sx={{ color: "black", margin: "2px" }}>
                    {job.employerStatus} :סטטוס מעסיק
                  </Chip>
                  <Chip sx={{ color: "black", margin: "2px" }}>
                    {job.kivunStatus} :סטטוס כיוון
                  </Chip>
                  <Chip sx={{ color: "black", margin: "2px" }}>
                    {formatDate(job.DatePublished)} :תאריך פרסום משרה
                  </Chip>
                  <Tooltip title="הוסף פניה חדשה עבור המשרה">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(event) =>
                        handleShowResume("CandidatePage", event)
                      }
                    >
                      <ControlPointIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </AccordionSummary>

              <AccordionDetails
                style={{
                  padding: "0px",
                }}
              >
                <ThemeProvider theme={theme}>
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              backgroundColor: "white",
                            }}
                            style={{ fontWeight: "bold", width: "180px" }}
                          >
                            פעולות
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "5px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            קורות חיים
                          </TableCell>

                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "50px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            תאריך הגשה
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "50px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            סטטוס כיון למועמדות
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "50px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            סטטוס מעסיק למועמדות
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", width: "100px" }}
                          >
                            מייל
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", width: "100px" }}
                          >
                            טלפון
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "20px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            עיר מגורים
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", width: "10px" }}
                          >
                            מין
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", width: "5px" }}
                          >
                            גיל
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "80px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            שם מועמד
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              width: "20px",
                              lineHeight: 1,
                              whiteSpace: "pre-line",
                            }}
                          >
                            מס' פניה
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {job.match &&
                          job.match.map((inquiry) => (
                            <TableRow key={inquiry.id}>
                              <TableCell
                                sx={{
                                  backgroundColor: "white",
                                }}
                              >
                                <ActionButtons
                                  jobId={inquiry.id}
                                  onStatusChange={handleStatusChange}
                                  onMoreOptions={handleMoreOptions}
                                />
                              </TableCell>
                              <TableCell>
                                <Tooltip sx={{}} title='הצג קו"ח'>
                                  <IconButton
                                    color="primary"
                                    onClick={() => showResumePop(inquiry.cvUrl)}
                                  >
                                    <DescriptionIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>

                              <TableCell>
                                {formatDate(inquiry.appliedDate)}
                              </TableCell>
                              <TableCell>{inquiry.matchKivunStatus}</TableCell>
                              <TableCell>
                                {inquiry.matchEmployerStatus}
                              </TableCell>
                              <TableCell>{inquiry.mail}</TableCell>
                              <TableCell>{inquiry.phone}</TableCell>
                              <TableCell>{inquiry.Hometown}</TableCell>
                              <TableCell>{inquiry.sex}</TableCell>
                              <TableCell>
                                {calculateAge(inquiry.dateOfBirth)}
                              </TableCell>
                              <TableCell>{inquiry.applicantName}</TableCell>
                              <TableCell>{inquiry.id}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ThemeProvider>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
      <Popup />
      <ResumePop />
    </>
  );
};

export default ApplicationsForJobs;
