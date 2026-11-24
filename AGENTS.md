# Coffee Delivery — guia para agentes

Esta é uma SPA acadêmica de cafeteria. O fluxo é **catálogo → carrinho/checkout → confirmação fictícia**. Não há backend próprio, autenticação, banco de dados nem pagamento real. A URL do repositório e os créditos da base importada estão no [README](README.md).

## Antes de mudar algo

1. Confira o status do Git e leia os arquivos que o pedido afeta. Preserve alterações locais que não são suas.
2. Use o [PRD](docs/PRD_SPEC.md) para requisitos e regras de negócio, o [TECH](docs/TECH_SPEC.md) para decisões técnicas e o [TASKS](docs/TASKS_SPEC.md) para etapas e validações. Os registros identificados como herdados não descrevem o trabalho feito neste repositório.
3. Para mudanças de requisito ou interface, consulte o [enunciado no Notion](https://app.notion.com/p/41bdfca74d8d8119a849e30ea492a6af) e, para o layout, o [Figma](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=2-1297). Se uma parte essencial estiver inacessível, peça a referência em vez de inventar critérios, medidas ou tokens.

## Onde trabalhar

| Área | Arquivos e padrões |
| --- | --- |
| Entrada e rotas | `src/main.tsx` monta os providers; `src/ThemedApp.tsx` aplica o tema e o `BrowserRouter`; `src/App.tsx` liga as páginas `/`, `/checkout`, `/success` e o fallback. Não concentre regras de negócio nesses arquivos. |
| Catálogo e carrinho | `src/data/coffees.ts` e `src/assets/coffees/` mantêm o catálogo; `src/reducers/cartReducer.ts` e `src/contexts/CartContext.tsx` usam `useReducer` e Context API; o consumo passa por `src/hooks/useCart.ts`. |
| Checkout | `src/pages/Checkout/`, `src/schemas/checkoutSchema.ts`, `src/hooks/useCepLookup.ts` e `src/utils/cep.ts`. Use React Hook Form, Zod e a consulta pública ao ViaCEP. |
| Confirmação | `src/utils/confirmedOrder.ts`, `src/contexts/OrderContext.tsx` e `src/components/OrderSuccess/` cuidam do snapshot, da sessão e da apresentação. |
| Interface | Componentes em `src/components/`, páginas em `src/pages/`, tokens em `src/styles/themes.ts`. Use styled-components e mantenha o CSS existente do Checkout e da Confirmação. Preserve a tipografia Baloo 2/Roboto, ícones Phosphor e os assets locais. |
| Qualidade | Testes em `src/tests/` com Vitest e React Testing Library. TypeScript e ESLint seguem as configurações da raiz. |

## Regras que não podem regredir

- O carrinho consolida cafés repetidos, soma **unidades** no cabeçalho e remove a linha se a quantidade cair de 1 para 0. Mantenha o reducer imutável e valide dados restaurados do `localStorage`.
- Calcule valores em centavos e formate em BRL. A taxa fictícia de R$ 3,50 só vale para carrinho não vazio e está centralizada em `src/utils/calculateCart.ts`.
- Número é obrigatório e manual; complemento é opcional. O ViaCEP preenche apenas os dados disponíveis. Preserve correções manuais e trate formato inválido, carregamento, CEP não encontrado e falha de rede. Não confirme durante a consulta ou com CEP inexistente; numa falha do serviço, permita endereço manual válido.
- Não confirme pedido com carrinho vazio, item inválido ou formulário inválido. Salve o snapshot do pedido antes de limpar o carrinho. A confirmação usa `sessionStorage`, não o carrinho atual, e mostra estado vazio quando não há pedido válido.
- Persista a escolha manual de tema em `localStorage`; sem escolha, respeite `prefers-color-scheme`. Mudanças visuais devem funcionar nos dois temas, por teclado e em telas estreitas, com foco e feedback legíveis.
- Preserve a marca Rota do Café e a origem das imagens. O SVG atual foi criado com assistência de IA; a proposta por gerador visual continua pendente. Não registre uma tentativa que falhou como entrega concluída.

## Fluxo de trabalho

- Prefira alterações pequenas, TypeScript tipado, componentes com uma responsabilidade clara e a stack já instalada. Não adicione bibliotecas, abstrações ou funções fora do escopo sem necessidade.
- No OpenCode, use **Build** para implementar, **Plan** para analisar antes de editar e **Revisão Coffee Delivery** para apontar problemas sem editar. Só delegue a outro agente quando solicitado. Os agentes nativos de apoio também seguem este guia.
- Use Node compatível com `package.json` (recomenda-se 24.15+ na linha 24 LTS). Instale com `npm ci`; execute com `npm run dev`.
- Para mudanças de código, rode as verificações pertinentes: `npm run lint`, `npm run build` (inclui TypeScript) e `npm run test`. Para mudanças visuais, confira as rotas afetadas no navegador; teste entre 320 e 1440 px conforme necessário. Use respostas simuladas do ViaCEP nos testes automatizados; uma consulta real pode complementar a checagem manual.
- Atualize o SPEC relevante quando mudar uma regra ou decisão. Registre no TASKS o que foi feito, o que foi testado e o que ficou pendente. Registre o uso de IA no [AI_USAGE](docs/AI_USAGE.md) sem reatribuir trabalho de terceiros. Diferencie evidência executada, herdada e ainda não verificada.
- Antes de um commit, confira `git status`, o diff e os arquivos preparados. Use commits semânticos e a identidade Git já configurada. Não faça push, deploy, mudanças de identidade ou reescrita de histórico sem autorização explícita.
