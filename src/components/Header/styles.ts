import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem 0;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  > .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: min(100% - 2rem, 1120px);
    margin: 0 auto;
  }
`;

export const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

export const BrandName = styled.span`
  display: grid;
  font-family: ${({ theme }) => theme.titleFont};
  line-height: 1;

  strong {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.035em;
  }

  span {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Location = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 40px;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.locationText};
  background: ${({ theme }) => theme.locationSurface};
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;

  @media (max-width: 399px) {
    padding: 0 0.375rem;
    font-size: 0.75rem;
  }

  @media (max-width: 374px) {
    > span {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }
  }
`;

export const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.cartText};
  background: ${({ theme }) => theme.cartSurface};
  border: 1px solid transparent;
  border-radius: 6px;

  &:hover {
    border-color: currentColor;
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  display: grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 4px;
  color: #171412;
  background: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.background};
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
`;
