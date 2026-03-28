---
task: render-slides
order: 4
agent: ivan-instagram
phase: B
input: squads/gabriel-cazonato/output/instagram-content.md (seção carousel)
output: HTML slides para renderização via image-creator skill
---

# Task: Renderizar Slides HTML para Image-Creator

## Objetivo
Transformar o roteiro de carousel em templates HTML/CSS prontos para renderização pelo skill image-creator. Cada slide deve ser um arquivo HTML autossuficiente que produza uma imagem no formato 1080x1080px (quadrado para feed) com a identidade visual de Gabriel Cazonato.

---

## Process

### Passo 1 — Definir a identidade visual do ciclo
Antes de criar os templates, definir as variáveis de design do ciclo:

**Paleta de cores base de Gabriel:**
- Primária: #1A1A2E (azul escuro quase preto) — fundos principais
- Destaque: #E94560 (vermelho vibrante) — números, destaques, palavras-chave
- Texto principal: #FFFFFF (branco puro)
- Texto secundário: #AAAACC (cinza azulado)
- Acento: #16213E (azul navy escuro) — blocos de contraste

**Tipografia:**
- Headlines: Inter Black / Montserrat ExtraBold — bold, impacto
- Corpo: Inter Regular / Inter SemiBold — legível em mobile
- Tamanhos: headline 60-72px, subtexto 28-36px, rodapé 18-22px

**Elementos fixos de identidade:**
- Nome "@gabrielcazonatoo" em rodapé em todos os slides (exceto slide 1 que pode ter mais destaque)
- Numeração de slide opcional no canto (ex: "03/09")
- Ícone ou avatar de Gabriel em slides de Essência quando apropriado

### Passo 2 — Criar template base e variações
Criar um template HTML base com CSS que contemple:
- Canvas de 1080x1080px
- Sistema de grid para posicionamento consistente
- Variáveis CSS (custom properties) para fácil troca de conteúdo por slide
- Responsividade interna para textos longos

Criar os seguintes tipos de layout conforme necessidade dos slides:
- **Layout A — Headline grande:** usado no slide 1 (gancho) e slides de Ousadia
- **Layout B — Dado central:** usado em slides com número grande ou estatística
- **Layout C — Lista pontual:** usado em slides com 2-4 bullets
- **Layout D — Citação/Essência:** fundo diferenciado para momentos de vulnerabilidade
- **Layout E — CTA final:** fundo diferente + elemento de ação visual

### Passo 3 — Gerar HTML de cada slide e chamar image-creator
Para cada slide do carousel, gerar o HTML completo e invocar o skill image-creator para renderizar a imagem. Salvar cada imagem em `output/slides/slide-[N].png`.

Após renderizar todos os slides, gerar um índice resumo em `output/instagram-content.md` com preview de cada slide renderizado.

---

## Output Format

```html
<!-- Exemplo de estrutura base -->
<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --bg-primary: #1A1A2E;
    --accent: #E94560;
    --text-main: #FFFFFF;
    --text-secondary: #AAAACC;
    --width: 1080px;
    --height: 1080px;
  }
  body {
    width: var(--width);
    height: var(--height);
    /* ... */
  }
</style>
</head>
<body>
  <!-- conteúdo do slide -->
</body>
</html>
```

---

## Output Example

```html
<!-- SLIDE 1 — GANCHO: "R$10k em 30 dias no ML. A mentira que está te custando caro." -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1080px;
    background: #1A1A2E;
    font-family: 'Inter', 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 80px;
    position: relative;
    overflow: hidden;
  }
  .bg-accent {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .label {
    font-size: 22px;
    font-weight: 600;
    color: #E94560;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }
  .headline {
    font-size: 68px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1.1;
    margin-bottom: 40px;
    max-width: 880px;
  }
  .headline span {
    color: #E94560;
  }
  .subtitle {
    font-size: 30px;
    font-weight: 400;
    color: #AAAACC;
    line-height: 1.4;
    max-width: 800px;
  }
  .footer {
    position: absolute;
    bottom: 50px;
    left: 80px;
    right: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .handle {
    font-size: 22px;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1px;
  }
  .slide-num {
    font-size: 20px;
    color: rgba(255,255,255,0.3);
  }
  .alert-badge {
    display: inline-block;
    background: #E94560;
    color: white;
    font-size: 18px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 4px;
    margin-bottom: 24px;
    letter-spacing: 1px;
  }
</style>
</head>
<body>
  <div class="bg-accent"></div>
  <div class="alert-badge">CUIDADO</div>
  <div class="label">Mercado Livre</div>
  <h1 class="headline">
    <span>R$10k em 30 dias</span> no ML.<br>
    A mentira que está<br>
    te custando caro.
  </h1>
  <p class="subtitle">Esses 3 números que ninguém mostra mudam tudo.</p>
  <div class="footer">
    <span class="handle">@gabrielcazonatoo</span>
    <span class="slide-num">01 / 09</span>
  </div>
</body>
</html>
```

---

## Quality Criteria

1. **Legibilidade mobile**: todo texto deve ser legível em tela de smartphone 5" — testar mentalmente com zoom de 25% do canvas. Nenhuma fonte abaixo de 24px no canvas 1080px.
2. **Consistência visual**: todos os slides do mesmo carousel devem ter a mesma paleta, tipografia e posição de elementos fixos (handle, numeração). Um leitor deve reconhecer que é do mesmo carousel ao ver qualquer slide isolado.
3. **HTML autossuficiente**: cada arquivo HTML deve renderizar corretamente sem dependências externas — todas as fontes inline ou web-safe, todos os estilos no `<style>` interno.

---

## Veto Conditions

1. **Dependências externas quebradas**: HTML que depende de arquivo CSS externo ou fonte via @import que pode falhar é vetado — image-creator precisa de HTML standalone
2. **Canvas fora de proporção**: qualquer template que não respeite exatamente 1080x1080px é vetado — imagens fora de proporção são cortadas pelo Instagram
