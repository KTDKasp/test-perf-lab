import { ROUTES } from "@/shared/api/routes";
import { Button } from "@/shared/ui/kit/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <main className="w-full flex flex-col items-center justify-center flex-[1]">
      <div className="container px-4 flex flex-col justify-center items-center mx-auto">
        <img
          width="60px"
          className="mb-2"
          src="/png/emoji-1.png"
          alt="Sad emoji"
        />
        <h2 className="text-center w-fit h-fit text-5xl text-bold mb-5">
          This page does not exist. Please return to home page
        </h2>
        <Button onClick={handleClick}>Вернуться на главную</Button>
      </div>
    </main>
  );
}

export const Component = NotFound;
