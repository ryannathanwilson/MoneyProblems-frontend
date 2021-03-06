import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const FormBox = styled(Box)`
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

export default FormBox;
