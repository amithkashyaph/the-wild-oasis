import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // 2. Show a spinner while loading
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 3. If there is no user redirect to login page
  if (!isAuthenticated) {
    return navigate("/login");
  }

  // 4. If there is a user then render the app
  return children;
};

export default ProtectedRoute;
