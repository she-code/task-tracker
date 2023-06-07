import { useRoutes } from "raviger";
import Home from "../components/Home";
import Login from "../features/User/Login";
import NotFound from "../components/NotFound";
import AppContainer from "../components/AppContainer";
import BoardList from "../features/Boards/BoardView";
import Board from "../features/Boards/Board";
import Todos from "../features/Tasks/Tasks";
import SignUp from "../features/User/SignUp";

export default function AppRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
    "/signup": () => <SignUp />,
    "/boards": () => <BoardList />,
    // "/createBoard": () => <CreateBoard />,
    "/boards/:boardId": ({ boardId }: { boardId: string }) => (
      <Board id={Number(boardId)} />
    ),
    "/tasks": () => <Todos />,
    "*": () => <NotFound />,
  };
  let routeResult = useRoutes(routes);

  return (
    <AppContainer>
      {routeResult}
      {/* <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
    </AppContainer>
  );
}
