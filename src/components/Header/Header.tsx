import { MapPin } from "@phosphor-icons/react";
import brandMark from "../../assets/branding/marca-copo.svg";
import { CartBadge } from "../CartBadge/CartBadge";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { BrandLink, BrandName, Controls, HeaderContainer, Location, Logo } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <div className="container">
        <BrandLink to="/">
          <Logo src={brandMark} alt="" width="40" height="40" />
          <BrandName>
            <strong>Coffee</strong>{" "}
            <span>Delivery</span>
          </BrandName>
        </BrandLink>
        <Controls>
          <ThemeToggle />
          <Location title="Localização ilustrativa: Porto Alegre, RS">
            <MapPin size={20} weight="fill" aria-hidden="true" />
            <span>Porto Alegre, RS</span>
          </Location>
          <CartBadge />
        </Controls>
      </div>
    </HeaderContainer>
  );
}
