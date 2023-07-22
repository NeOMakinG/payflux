import { Button } from "@mui/material"

type SubmitButtonProps = {
  onClick: () => void;
}

export const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
      onClick={onClick}
    >
      Submit
    </Button>
  )
}