import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import AddIcon from "@mui/icons-material/Add";
import "../styles/MaliciousList.css"; // Import the CSS
import { MaliciousFormat } from "../types/appTypes";

type MaliciousListProps = {
  maliciousFormats: MaliciousFormat[];
  handleEditApiCall: (
    newMaliciousFormat: MaliciousFormat,
    maliciousFormatId: string
  ) => Promise<void>;
  handleDeleteApiCall: (maliciousFormatId: string) => Promise<void>;
  loading: boolean;
  choosenFormatId: string | null;
  setChoosenFormatId: React.Dispatch<React.SetStateAction<string | null>>;
};

const MaliciousList: React.FC<MaliciousListProps> = ({
  maliciousFormats,
  handleEditApiCall,
  handleDeleteApiCall,
  loading,
  choosenFormatId,
  setChoosenFormatId,
}) => {
  const [formatBeingEdit, setFormatBeingEdit] = useState<string | null>(null);
  const [maliciousFormatsEditingFields, setMaliciousFormatsEditingFields] =
    useState({
      sourceEmail: "",
      sourcePhone: "",
      message: "",
      subject: "",
    });

  useEffect(() => {
    console.log("Malicious formats updated:", maliciousFormats);
  }, [maliciousFormats]);
  ///לא עובד!!
  const handleDelete = (id: string) => {
    handleDeleteApiCall(id);
  };

  const handleEditClick = (maliciousFormat: MaliciousFormat) => {
    setFormatBeingEdit(maliciousFormat.id);
    setMaliciousFormatsEditingFields({
      sourceEmail: maliciousFormat.sourceEmail,
      sourcePhone: maliciousFormat.sourcePhone,
      message: maliciousFormat.message,
      subject: maliciousFormat.subject,
    });
  };

  const handleEditSave = (id: string) => {
    if (maliciousFormatsEditingFields === undefined) {
      return;
    }

    handleEditApiCall(
      {
        sourceEmail: maliciousFormatsEditingFields.sourceEmail,
        sourcePhone: maliciousFormatsEditingFields.sourcePhone,
        message: maliciousFormatsEditingFields.message,
        subject: maliciousFormatsEditingFields.subject,
        id: id,
      },
      id
    );
    setFormatBeingEdit(null);
  };

  const handleFieldChange = (field: string, value: string) => {
    setMaliciousFormatsEditingFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  return (
<div className="malicious-history-list">
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-start", // Aligns the text to the left
      mb: -1, // Optional: margin-bottom for spacing between title and list
    }}
  >
    <h2>Choose a format or create a new one:</h2>
  </Box>
  <List>
    {maliciousFormats.map((maliciousFormat: MaliciousFormat) => (
      <ListItem key={maliciousFormat.id} disablePadding>
        <Accordion sx={{ flexGrow: 1, flex: 7 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={maliciousFormat.id === choosenFormatId}
                  onChange={() => {
                    setChoosenFormatId(maliciousFormat.id);
                    console.log("Selected Format ID: ", maliciousFormat.id);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label=""
              onClick={(event) => event.stopPropagation()}
            />
            {maliciousFormat.id === formatBeingEdit ? (
              <>
                <TextField
                  label="Source Email"
                  value={maliciousFormatsEditingFields.sourceEmail}
                  onChange={(e) =>
                    handleFieldChange("sourceEmail", e.target.value)
                  }
                  onClick={(event) => event.stopPropagation()}
                  fullWidth
                  sx={{ verticalAlign: "middle" }}
                />
                <TextField
                  label="Source Phone"
                  value={maliciousFormatsEditingFields.sourcePhone}
                  onChange={(e) =>
                    handleFieldChange("sourcePhone", e.target.value)
                  }
                  onClick={(event) => event.stopPropagation()}
                  fullWidth
                  sx={{ verticalAlign: "middle" }}
                />
                <TextField
                  label="Subject"
                  value={maliciousFormatsEditingFields.subject}
                  onChange={(e) =>
                    handleFieldChange("subject", e.target.value)
                  }
                  onClick={(event) => event.stopPropagation()}
                  fullWidth
                  sx={{ verticalAlign: "middle" }}
                />
                <TextField
                  label="Message"
                  value={maliciousFormatsEditingFields.message}
                  onChange={(e) =>
                    handleFieldChange("message", e.target.value)
                  }
                  onClick={(event) => event.stopPropagation()}
                  fullWidth
                  sx={{ verticalAlign: "middle" }}
                />
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="body1">
                  Email: {maliciousFormat.sourceEmail}
                </Typography>
                <Typography>Phone: {maliciousFormat.sourcePhone}</Typography>
                <Typography>Subject: {maliciousFormat.subject}</Typography>
              </Box>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Message: {maliciousFormat.message}</Typography>
          </AccordionDetails>
        </Accordion>
        <ListItemButton sx={{ flex: 1 }}>
          <Box>
            {maliciousFormat.id === formatBeingEdit ? (
              <IconButton
                disabled={loading}
                onClick={() => handleEditSave(maliciousFormat.id)}
              >
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton
                disabled={loading}
                onClick={() => handleEditClick(maliciousFormat)}
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton
              disabled={loading}
              onClick={() => handleDelete(maliciousFormat.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItemButton>
      </ListItem>
    ))}
  </List>
</div>

  );
};

export default MaliciousList;
