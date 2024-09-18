import AddIcon from "@mui/icons-material/Add";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useMaliciousFormat } from "./MaliciousListHook";
import { MaliciousFormat } from "../types/appTypes";

type AddNewFormatProps = {
  handleCreateApiCall: (
    newMaliciousFormat: Omit<MaliciousFormat, "id">
  ) => Promise<void>;
};

const AddNewFormat: React.FC<AddNewFormatProps> = ({ handleCreateApiCall }) => {
  const [newMaliciousFormat, setNewMaliciousFormat] = useState({
    sourceEmail: "",
    sourcePhone: "",
    subject: "",
    message: "",
  });

  const handleAddNewFormat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMaliciousFormat.message === "") {
      alert("please add message");
      return;
    }
    handleCreateApiCall({ ...newMaliciousFormat }); //dummy id
    setNewMaliciousFormat({
      sourceEmail: "",
      sourcePhone: "",
      message: "",
      subject: "",
    }); // Clear the form after adding
  };
  const handleNewItemChange = (field: string, value: string) => {
    setNewMaliciousFormat((prevFields) => ({ ...prevFields, [field]: value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "2",
        gap: 2,
        mt: 4,
        paddingRight: "40px",
      }}
    >
      <Typography variant="h6">Add New format</Typography>
      <form onSubmit={handleAddNewFormat}>
        <TextField
          label="sourceEmail"
          value={newMaliciousFormat.sourceEmail}
          onChange={(e) => handleNewItemChange("sourceEmail", e.target.value)}
          fullWidth
        />
        <TextField
          label="sourcePhone"
          value={newMaliciousFormat.sourcePhone}
          onChange={(e) => handleNewItemChange("sourcePhone", e.target.value)}
          fullWidth
        />
        <TextField
          label="subject"
          value={newMaliciousFormat.subject}
          onChange={(e) => handleNewItemChange("subject", e.target.value)}
          fullWidth
        />
        <TextField
          label="message"
          value={newMaliciousFormat.message}
          onChange={(e) => handleNewItemChange("message", e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          type="submit"
          disabled={!newMaliciousFormat.message || !newMaliciousFormat.subject} // Disable button if inputs are empty
        >
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddNewFormat;
