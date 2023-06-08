import React, { useEffect, useState } from "react";
import { useAppDispacth, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { format } from "date-fns";
import { fetchBoards } from "../Boards/boardActions";
import { fetchStatuses } from "../Status/statusAction";
import { fetchTasks } from "../Tasks/taskActions";
import { Task } from "../../types/taskTypes";
import HomeItem from "./HomeItem";
import { getTasks } from "../../utils/apiUtils";

export default function Home() {
  const user = useAppSelector((state: RootState) => state.users.user);
  const boards = useAppSelector((state: RootState) => state.boards.boards);
  const status = useAppSelector((state: RootState) => state.statuses.statuses);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const [boardTasks, setBoardTasks] = useState<Task[]>([]);

  const dispatch = useAppDispacth();
  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchStatuses());
    // if (boards?.length > 0) {
    //   boards.forEach((board) => {
    //     dispatch(fetchTasks(board?.id as number));
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (boards?.length > 0) {
  //     const fetchTasksForBoards = async () => {
  //       const response: Task[] = [];
  //       for (const board of boards) {
  //         dispatch(fetchTasks(board.id as number));
  //         tasks.forEach((task) => {
  //           if (task.board === board.id) {
  //             response.push(task);
  //           }
  //         });
  //         // response.push(...tasks);
  //       }
  //       setBoardTasks(response);
  //       console.log({ boardTasks, response });
  //     };

  //     fetchTasksForBoards();
  //   }
  // }, []);
  useEffect(() => {
    if (boards?.length > 0) {
      const fetchTasksForBoards = async () => {
        const response: Task[] = [];
        await Promise.all(
          boards.map(async (board) => {
            // await dispatch(fetchTasks(board.id as number));
            const tasks: { results: Task[] } = await getTasks(
              board.id as number
            );
            console.log({ tasks });
            const boardTasks = tasks?.results?.filter(
              (task) => task.board === board.id
            );
            response.push(...boardTasks);
          })
        );
        setBoardTasks(response);
        console.log({ boardTasks, response });
      };

      fetchTasksForBoards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  // Rest of your component code
  // ...

  return (
    <div className=" w-10/12   mx-auto">
      <p className="text-xl  text-white mt-3">
        {format(new Date(), "EEEE, MMMM d")}
      </p>
      <h1 className="text-3xl font-bold mt-5 text-white">
        Welcome, {user?.name ? user.name : user?.username}
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1  gap-4 lg:grid-cols-3 mt-6">
        <HomeItem title="Boards" count={boards?.length ?? 0} />
        <HomeItem title="Statuses" count={status?.length ?? 0} />
        <HomeItem title="Total Tasks" count={boardTasks.length ?? 0} />
        <HomeItem title="Incomplete Tasks" count={7 ?? 0} />
        <HomeItem title="Complete Tasks" count={7 ?? 0} />
        <HomeItem title="High Priority Tasks" count={9 ?? 0} />
      </div>
    </div>
  );
}
