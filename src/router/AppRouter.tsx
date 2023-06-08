import { useRoutes } from "raviger";
import Home from "../features/Home/Home";
import Login from "../features/User/Login";
import AppContainer from "../components/AppContainer";
import BoardList from "../features/Boards/BoardView";
import Board from "../features/Boards/Board";
import Todos from "../features/Tasks/Tasks";
import SignUp from "../features/User/SignUp";
import NotFound from "../components/Common/NotFound/NotFound";

export default function AppRouter(props: {
  collapsed: boolean;
  toggleCollapsedCB: () => void;
}) {
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
  const { collapsed, toggleCollapsedCB } = props;
  return (
    <AppContainer collapsed={collapsed} toggleSidebar={toggleCollapsedCB}>
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
