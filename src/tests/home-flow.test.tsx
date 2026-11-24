import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CartProvider } from "../contexts/CartContext";
import { OrderProvider } from "../contexts/OrderContext";
import { ThemeProvider, THEME_STORAGE_KEY } from "../contexts/ThemeContext";
import { ThemedApp } from "../ThemedApp";

function openApp() {
  return render(
    <ThemeProvider>
      <CartProvider>
        <OrderProvider>
          <ThemedApp />
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => vi.unstubAllGlobals());

it("acumula cafés iguais, atualiza o badge e restaura o carrinho no checkout", async () => {
  const user = userEvent.setup();
  const app = openApp();
  expect(screen.getByRole("link", { name: "Coffee Delivery" })).toHaveAttribute("href", "/");
  const addLatte = screen.getByRole("button", { name: "Adicionar Latte ao carrinho" });
  expect(screen.getByRole("button", { name: "Diminuir quantidade de Latte" })).toBeDisabled();

  await user.click(screen.getByRole("button", { name: "Aumentar quantidade de Latte" }));
  await user.click(addLatte);
  await user.click(addLatte);
  await user.click(screen.getByRole("link", { name: "Carrinho com 3 itens" }));
  expect(window.location.pathname).toBe("/checkout");
  expect(screen.getAllByRole("heading", { name: "Latte" })).toHaveLength(1);

  app.unmount();
  openApp();
  expect(screen.getByRole("link", { name: "Carrinho com 3 itens" })).toBeVisible();
  expect(screen.getByText("R$ 33,20")).toBeVisible();
});

it("usa o tema do sistema até que uma preferência explícita seja salva", async () => {
  let prefersDark = true;
  vi.stubGlobal("matchMedia", vi.fn(() => Object.assign(new EventTarget(), { matches: prefersDark })));
  const user = userEvent.setup();
  const firstVisit = openApp();
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? "null")).toBeNull();
  firstVisit.unmount();

  prefersDark = false;
  const secondVisit = openApp();
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  await user.click(screen.getByRole("button", { name: "Ativar tema escuro" }));
  secondVisit.unmount();

  openApp();
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
});
