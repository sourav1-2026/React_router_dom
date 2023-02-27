import { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Form, useNavigate, redirect, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { profile, ...data } = Object.fromEntries(formData);

  const newStudent = new FormData();
  newStudent.append("data", JSON.stringify(data));
  if (profile.size !== 0) newStudent.append("files.profile", profile);
  await axios.post("/api/teachers", newStudent);
  return redirect("..");
};

const CreateTeacher = () => {
  const [profileName, setProfileName] = useState(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isCreating = navigation.state !== "idle";
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog
      component={Form}
      replace
      method="post"
      encType="multipart/form-data"
      sx={{ backdropFilter: "blur(15px)" }}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">Create Teacher Profile</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="first name"
          placeholder="Enter Your First Name"
          name="firstName"
          margin="dense"
          fullWidth
        />
        <TextField
          label="last name"
          placeholder="Enter Your Last Name"
          name="lastName"
          margin="dense"
          fullWidth
        />
        <TextField
          label="E-mail"
          placeholder="Enter Your E-mail Address"
          name="email"
          margin="dense"
          fullWidth
        />
        <TextField
          label="subject"
          placeholder="Enter Your Subject Name"
          name="subject"
          margin="dense"
          fullWidth
        />
        <TextField
          label="address"
          placeholder="Enter Your Full Address"
          name="Address"
          margin="dense"
          fullWidth
        />
        <TextField
          label="phone"
          placeholder="Enter Your Phone Number"
          name="Phone"
          margin="dense"
          fullWidth
        />

        <Stack spacing={1}>
          <Button
            disabled={isCreating}
            variant="outlined"
            fullWidth
            size="large"
            component="label"
          >
            upload your profile picture
            <input
              onChange={(e) => setProfileName(e.target.files[0].name)}
              name="profile"
              hidden
              accept="image/*"
              type="file"
            />
          </Button>
          {profileName && (
            <Chip
              color="success"
              size="large"
              variant="outlined"
              label={profileName}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
      <Button color="inherit" onClick={handleClose}>Close</Button>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeacher;
