// import React from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";

// import SEPractices from "../dummydata/SEPractices";

// const optionItems = SEPractices.map((SEPractice) => (
//   <MenuItem key={SEPractice.practice} value={SEPractice.practice}>
//     {SEPractice.practice}
//   </MenuItem>
// ));

// const loginForm = () => {
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <FormControl fullWidth sx={{ m: 1, width: '65ch' }}>
//           <InputLabel id="loginName">Name:</InputLabel>
//           <Select
//             labelId="loginName"
//             id="loginName-select"
//             label="Name"
//             defaultValue=""
//             onChange={(e) => setValue("sepractice", e.target.value)}
//             {...register("sepractice", { required: true })}
//           >
//             {optionItems}
//           </Select>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             label="Email"
//             {...register("Email", { required: true })}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             label="LoginName"
//             {...register("Name", { required: true })}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             label="Password"
//             {...register("Password", { required: true })}
//           />
//           <Button
//             type="submit"
//             margin="normal"
//             variant="contained"
//             color="primary"
//           >
//             Login
//           </Button>
//         </FormControl>
//       </Box>
//     </form>
//   );
// };

// export default loginForm;
