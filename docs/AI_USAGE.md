# Uso de IA — Coffee Delivery

## Registros do projeto-base

Os registros desta seção foram importados do projeto-base identificado no [README](../README.md). Não são interações do responsável por esta adaptação.

### Conferência do enunciado

- **Prompt:** “SEGUE ISSO DO NOTIOM TB”, acompanhado do PDF da atividade.
- **Objetivo:** conferir os critérios oficiais e ajustar o planejamento.
- **Resposta e decisão:** usar o PDF como referência de aceite e explicitar os frames do Figma, a exigência de geração visual do logo e as evidências de entrega. Não marcar critérios como concluídos sem validação.
- **Evidência:** alterações em `PRD_SPEC.md`, `TECH_SPEC.md` e `TASKS_SPEC.md`.

### Tentativa de geração visual da marca

- **Ferramenta:** gerador de imagens do OpenCode (`opencode/grok-imagine-image-2.0`).
- **Prompt para a versão clara:** “Original flat vector logo icon for a fictional Brazilian coffee delivery brand. A minimal stylized takeaway coffee cup with a small bean and a curved steam/delivery swoosh, cheerful and premium. Palette: warm coffee brown, golden yellow and purple. Solid deep purple circular badge background, centered composition, thick clean shapes, no gradients, no text, no letters, no words, no mockup, no photorealism. Square 1:1, designed to stay legible at 32px.”
- **Objetivo:** criar uma marca original legível em tamanho reduzido, com versões para fundos claros e escuros.
- **Resultado e decisão:** as duas tentativas falharam por credencial inválida. Os SVGs preparados pelo assistente são rascunhos; nenhum resultado de geração visual foi obtido.
- **Evidência:** retorno `Invalid credential` do gerador e ressalva registrada em `TASKS_SPEC.md`.

### Análise das referências visuais

- **Entrada fornecida na conversa:** exports `Coffee Delivery - Checkout Filled.svg` e `Coffee Delivery - Success.svg`, além da imagem do Checkout.
- **Objetivo:** transformar os exemplos do Figma em orientações verificáveis para os componentes.
- **Resposta e decisão:** conferida a divisão do Checkout em formulário e resumo e a composição da Confirmação com painel e ilustração. Manter campos interativos, dados dinâmicos e marca própria, sem usar os exports como telas prontas.
- **Evidência:** análise registrada em `TECH_SPEC.md` e `TASKS_SPEC.md`; o SVG da Confirmação foi renderizado localmente para conferência.

### Proposta de marca autoral em SVG

- **Ferramentas:** gerador visual do OpenCode (`opencode/grok-imagine-image-2.0`) e assistente OpenCode para desenhar o SVG como código.
- **Prompt visual:** “Design ONE original logo symbol for a Brazilian academic coffee delivery web app named Coffee Delivery. Just the symbol, absolutely no text, no numbers, no typography. A minimal flat vector-style mark that fuses a tilted porcelain coffee cup viewed from the side and a single coffee bean as the cup's visible interior, with a simple two-stroke steam curl bending forward like a small route. No rocket, no takeout tumbler, no wings, no location pin, no arrows, no imitation of existing coffee brands. Make it legible as a 16px favicon: thick shapes, clear negative space, no detail, no shadows, gradients, texture, thin strokes, or outlines. Put it in a flat deep violet softly rounded square tile (dark violet #4B2995) with shapes in cream (#FFF5E1) and golden amber (#F1BE58), visually centered and generously padded. Single square output, crisp edge, flat solid #FFFFFF outside the tile, no border or mockup. The contrast should work on both white and near-black pages.”
- **Objetivo:** criar uma marca distinta do foguete do protótipo, com um símbolo utilizável no cabeçalho e no favicon.
- **Resultado e decisão:** o gerador novamente retornou `Invalid credential`. Para avaliação local, o assistente desenhou uma proposta em SVG com xícara, grão e vapor. As formas foram criadas no próprio arquivo, sem reutilizar a arte do Figma; o texto fica no HTML e segue o tema. A proposta não comprova geração pela ferramenta visual exigida no enunciado.
- **Evidência:** [arquivo SVG](../src/assets/branding/marca-autoral.svg). O desenho foi integrado ao Header e ao favicon apenas durante a avaliação da proposta.

### Estampa do copo na ilustração da Home

- **Prompt da usuária:** “NAO ESSE LOGO DESSE COPO”, acompanhado de um recorte do banner.
- **Objetivo:** trocar a marca impressa no copo, não a marca no cabeçalho.
- **Decisão e ferramenta:** o assistente editou a imagem com Canvas, usando amostras da textura da faixa para limpar a estampa antiga. Aplicou um grão com traços de movimento e manteve o nome em duas linhas e a inclinação da estampa original. A ilustração de referência foi preservada separadamente.
- **Decisão nessa etapa:** esse primeiro teste de estampa não entrou na aplicação.

### Seleção da proposta para o cabeçalho

- **Prompt da usuária:** “NAO AQUELE Q PEDI P VC FAZER IGUAL AO DO PROFESSOR”.
- **Decisão:** recuperar a versão desenhada pelo assistente com copo roxo, grão claro e traços de movimento. Após aprovação, aplicar a mesma marca no Header, no favicon e no copo do banner, com uma paleta clara para a faixa escura. O gerador visual para essa versão retornou `Invalid credential`; a adaptação do banner foi feita com Canvas.
- **Evidência:** [SVG escolhido](../src/assets/branding/marca-copo.svg) e [banner editado](../src/assets/home/hero-marca-copo.png). A comparação de pixels confirmou que a edição ficou restrita à região da estampa.

## Registros deste repositório

### Importação: revisão do Notion e nova tentativa de branding

- **Prompt do responsável:** “Implementar o projeto Coffee Delivery seguindo fielmente a referência do Notion [...] copie desse”, com a pasta da implementação-base.
- **Objetivo:** conferir o escopo, aproveitar a aplicação e preservar a atribuição.
- **Decisão:** consultar o enunciado e os frames do Figma, manter os assets fornecidos e registrar a origem em vez de apresentar a implementação importada como inédita.
- **Evidência:** [registro da importação](TASKS_SPEC.md#8-registro-de-execução).
- **Ferramenta visual:** gerador de imagens do OpenCode (`opencode/grok-imagine-image-2.0`).
- **Prompt visual:** “Crie uma única proposta de símbolo original para a cafeteria acadêmica brasileira Coffee Delivery. Ícone quadrado minimalista, estilo vetorial plano, construído com formas grossas de alto contraste: copo de café para viagem levemente inclinado, grão de café dourado claro na frente do copo e dois curtos traços horizontais de entrega. Use fundo roxo escuro sólido em um quadrado de cantos suavemente arredondados, copo creme, grão âmbar. O quadrado deve preencher quase todo o quadro, com margem externa neutra pequena, e ficar legível a 16px. Sem texto, letras, números, foguetes, marcas existentes, sombras, texturas, gradientes, mockup ou cenário. Apenas um ícone centralizado. Preserve a linguagem visual roxa e dourada de uma cafeteria, não copie nenhum logotipo real.”
- **Resultado:** a tentativa retornou `Invalid credential`; nenhuma imagem foi gerada. O SVG existente foi preservado e a comprovação exigida pelo RF-16 continua pendente.

### Substituição da marca: Rota do Café

- **Prompt do responsável:** “crie uma e substitua”.
- **Objetivo:** trocar a marca nos pontos de contato da aplicação sem modificar a composição das telas.
- **Prompt visual:** “Create one original icon for the Brazilian café brand Coffee Delivery, to replace its existing logo. Visually distinctive concept: a rounded violet map pin with the silhouette of a porcelain espresso cup in its upper half, with a single warm golden coffee-bean oval accent. Use flat solid deep violet #4B2995, light lavender #F4EDFF and muted golden #F1BE58. Thick simple geometric shapes, consistent clear silhouette and clean negative space, centered composition for a 16px favicon. Square canvas, plain white background outside the mark, no text, no numbers, no gradients, no shadows, no outlines, no extra objects. It should look like a simple vector brand mark, not a mockup.”
- **Resultado e decisão:** o gerador visual do OpenCode retornou `Invalid credential`. O assistente criou uma proposta original em SVG com xícara, grão e pin, desenhando os vetores sem reutilizar a geometria da logo anterior. O contorno lavanda ajuda a destacar a marca no tema escuro. A edição das duas ilustrações foi feita com Canvas, sem alterar as artes de origem. Isso não substitui a proposta produzida por gerador visual exigida pelo RF-16.
- **Evidências:** [SVG](../src/assets/branding/marca-rota.svg), [Home](evidences/home-desktop.jpg) e [Confirmação](evidences/confirmacao-desktop.jpg).

### Revisão dos agentes

- **Prompt do responsável:** “Quero que você revise todos os Agents utilizados ou configurados neste projeto.”
- **Objetivo:** adaptar as instruções à estrutura atual da SPA, mantendo a procedência do código e das decisões anteriores.
- **Decisão:** concentrar as regras em `AGENTS.md`, preservar os prompts nativos de Build e Plan e adicionar um perfil de revisão com acesso de leitura e comandos Git restritos.
- **Evidência:** [configuração local](../opencode.json) e [guia do projeto](../AGENTS.md), validados com a listagem de perfis do OpenCode.
