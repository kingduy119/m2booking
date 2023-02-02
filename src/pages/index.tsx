import { useAppDispatch, useAppSelector } from "@/redux";
import { todosActions } from "@/redux/slices/todos";
import { NextPage } from "next";

const HomePage: NextPage = () => {

  return (
    <div>
      <h2>HOMEPAGE</h2>
      <div>Pro</div>
    </div>
  );
};

export default HomePage;
