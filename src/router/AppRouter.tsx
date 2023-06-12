import { useRoutes } from "raviger";
import Home from "../features/Home/Home";
import Login from "../features/User/Login";
import AppContainer from "../components/AppContainer";
import BoardList from "../features/Boards/BoardView";
import Board from "../features/Boards/Board";
import Todos from "../features/Tasks/Tasks";
import SignUp from "../features/User/SignUp";
import NotFound from "../components/Common/NotFound/NotFound";
import { Suspense } from "react";
import Loading from "../components/Common/Loading/Loading";

export default function AppRouter(props: {
  collapsed: boolean;
  toggleCollapsedCB: () => void;
}) {
  const routes = {
    "/": () => (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
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
  // useAuthentication();
  const { collapsed, toggleCollapsedCB } = props;
  return (
    <AppContainer collapsed={collapsed} toggleSidebar={toggleCollapsedCB}>
      {routeResult}
    </AppContainer>
  );
}
