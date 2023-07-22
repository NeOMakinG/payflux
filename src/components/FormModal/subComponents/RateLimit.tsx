import { Box, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SubmitButton } from "./SubmitButton"

export const RateLimit = () => {
  const [number, setNumber] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums === '') {
      setNumber(null);
    } else {
      setNumber(parseInt(onlyNums));
    }
  }
  
  return (
		<Box 
			component="form"
			noValidate
      autoComplete="off"
			sx={{
        width: "100%",
				display: "flex",
				flexDirection: "column",
        alignItems: "center",
        gap: "10px",
			}}
		>
			<Box sx={{
        width: "100%",
				display: "flex",
				flexDirection: "rows",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
			}}>
				<Typography variant="h6">Rate Limit :</Typography>
				<TextField
          label="Rate Limit"
          placeholder="Txs per day per address"
          value={number ?? ""}
          onChange={handleChange}
          sx={{
            width: "50%",
          }}
        />
			</Box>
      <SubmitButton onClick={() => {}} />
		</Box>
	)
}
