import Image from "next/image";
import logo from "../../assets/images/logo.png";
import { Button } from "../form/buttons/Button";
import { scrollTo } from "../../utils/helpers/scroll.helpers";

export const LogoSection = () => {
  return (
    <section className="landing-section">
      <Image className="h-64 sm:h-96 w-auto" src={logo} alt="логотип" />

      <div className="card text-center">
        <h1>Никаких сложностей!</h1>
        <h3>Найди талантливого исполнителя прямо сейчас</h3>

        <Button
          width="75"
          className="my-6 animate-pulse"
          onClick={() => scrollTo("MENU")}
        >
          Поехали!
        </Button>
      </div>
    </section>
  );
};
