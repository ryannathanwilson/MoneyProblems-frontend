import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Container = styled(Box)`
  box-sizing: border-box;
  text-align: center;
  width: 25rem;
  margin: 3rem auto 6rem;
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

export default Container;
