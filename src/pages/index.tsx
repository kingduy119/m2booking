import { useAppDispatch, useAppSelector } from "@/redux";
import { todosActions } from "@/redux/slices/todos";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  if (todos.status === "idle") {
    dispatch(todosActions.getEntities());
  }

  return (
    <div>
      <h2>HOMEPAGE</h2>
      <p>{JSON.stringify(todos.status)}</p>
      <p>{JSON.stringify(todos.entities)}</p>
      <p>{JSON.stringify(todos.error)}</p>
    </div>
  );
};

export default HomePage;
