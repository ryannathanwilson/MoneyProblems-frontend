import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const FormBox = styled(Box)`
  box-sizing: border-box;
  text-align: center;
  width: 25rem;
  margin: 2rem auto 8rem;
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  @media (max-width: 600px) {
    margin: 2rem 0 8rem;
    width: 100%;
    padding: 0.5rem;
  }
`;

export default FormBox;
