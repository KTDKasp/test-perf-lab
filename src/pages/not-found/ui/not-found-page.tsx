import { ROUTES } from "@/shared/api/routes";
import { Button } from "@/shared/ui/kit/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <main className="flex flex-col items-center flex-[1] justify-center">
      <h2 className="text-5xl text-bold mb-7">
        This page does not exist. Please return to home page
      </h2>
      <Button onClick={handleClick}>Вернуться на главную</Button>
    </main>
  );
}

export const Component = NotFound;
