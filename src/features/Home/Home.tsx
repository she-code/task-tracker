import React, { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { format } from "date-fns";
import { fetchBoards } from "../Boards/boardActions";
import { fetchStatuses } from "../Status/statusAction";
import { Task, parseTaskDescription } from "../../types/taskTypes";
import HomeItem from "./HomeItem";
import { getTasks } from "../../utils/apiUtils";
import DoughnutChart from "../../components/Common/Chart/Doughnut";
import PriorityChart from "../../components/Common/Chart/PriorityChart";
import Loading from "../../components/Common/Loading/Loading";
import { getAuthToken } from "../../utils/storageUtils";
import { navigate } from "raviger";

export default function Home() {
  const user = useAppSelector((state: RootState) => state.users.user);
  const loading = useAppSelector((state: RootState) => state.users.loading);
  const boards = useAppSelector((state: RootState) => state.boards.boards);
  const status = useAppSelector((state: RootState) => state.statuses.statuses);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [boardTasks, setBoardTasks] = useState<Task[]>([]);

  const dispatch = useAppDispacth();

  useEffect(() => {
    if (getAuthToken() === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchStatuses());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (boards?.length > 0) {
      const fetchTasksForBoards = async () => {
        const response: Task[] = [];
        await Promise.all(
          boards.map(async (board) => {
            const tasks: { results: Task[] } = await getTasks(
              board.id as number
            );
            const boardTasks = tasks?.results?.filter(
              (task) => task.board === board.id
            );
            const updatedTasks = boardTasks?.map((task) => {
              if (task.description) {
                const parsedTaskDescription = parseTaskDescription(
                  task.description
                );
                return {
                  ...task,
                  due_date: parsedTaskDescription?.due_date || "",
                  is_completed: parsedTaskDescription?.is_completed || false,
                  priority: parsedTaskDescription?.priority || "low",
                };
              }
              return task;
            });
            response.push(...updatedTasks);
          })
        );
        setBoardTasks(response);
        console.log({ boardTasks: response });
      };

      fetchTasksForBoards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards, tasks]);

  return loading ? (
    <Loading />
  ) : (
    <div className=" w-10/12   mx-auto">
      <p className="text-xl  text-white mt-3">
        {format(new Date(), "EEEE, MMMM d")}
      </p>
      <h1 className="text-3xl font-bold mt-5 text-white">
        Welcome, {user?.name ? user.name : user?.username}
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1  gap-4 lg:grid-cols-3 my-6">
        <HomeItem title="Boards" count={boards?.length ?? 0} />
        <HomeItem title="Statuses" count={status?.length ?? 0} />
        <HomeItem title="Total Tasks" count={boardTasks.length ?? 0} />
      </div>
      <div className="grid  mt-10 w-full  md:grid-cols-2 sm:grid-cols-1 ">
        <DoughnutChart content={boardTasks} />
        <PriorityChart content={boardTasks} />
      </div>
    </div>
  );
}
