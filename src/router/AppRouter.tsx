import { useRoutes } from "raviger";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import NotFound from "../components/NotFound";
import AppContainer from "../components/AppContainer";
import BoardList from "../features/Boards/BoardView";
import CreateBoard from "../features/Boards/CreateBoard";
import Board from "../features/Boards/Board";

export default function AppRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
    "/boards": () => <BoardList />,
    "/createBoard": () => <CreateBoard />,
    "/boards/:boardId": ({ boardId }: { boardId: string }) => (
      <Board id={Number(boardId)} />
    ),
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
