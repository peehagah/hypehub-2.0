---
type: agent-step
step: "06"
agent: ivan-instagram
execution: subagent
phase: B
model_tier: powerful
inputFile:
  - squads/influencer-hub/output/angles.md
  - ângulo selecionado no checkpoint (step-05)
outputFile: squads/influencer-hub/output/instagram-content.md
format: instagram-feed
---

# Step 06: Ivan Instagram (Fase B) — Criação Completa

## Contexto

Ivan Instagram entra na Fase B — criação completa. Com o ângulo aprovado por Pedro, Ivan produz todas as peças de Instagram do ciclo: carousel completo com 8-10 slides, script de Reel de 15-30 segundos, templates HTML para renderização pelo image-creator, e a legenda completa do post.

Este step executa em paralelo com o Step 07 (Yuri YouTube).

**Método EGO obrigatório em todas as peças:**
- E (Essência): momento de vulnerabilidade real de Gabriel
- G (Generosidade): informação técnica de alto valor gratuita
- O (Ousadia): posicionamento forte que divide opiniões

---

## Context Loading

Carregar antes de executar:
- `output/angles.md` — ângulos gerados e ângulo selecionado
- `pipeline/data/tone-of-voice.md` — guia de voz de Gabriel
- `pipeline/data/output-examples.md` — exemplos de output aprovados
- `pipeline/data/anti-patterns.md` — o que nunca fazer
- `pipeline/data/quality-criteria.md` — critérios de qualidade

---

## Instruções de Execução

Executar as tasks em ordem:

### Task 1: `tasks/create-carousel.md`
Criar o carousel completo com 8-10 slides seguindo o ângulo selecionado:
- **Slide 1 (Gancho):** usar o gancho exato definido no ângulo ou evoluí-lo
- **Slides 2-3 (Contexto):** aprofundar o problema/situação
- **Slides 4-7 (Desenvolvimento):** valor técnico — uma ideia por slide
- **Slides 8-9 (Virada):** momento EGO mais forte do carousel
- **Último slide (CTA):** ação específica e conectada ao conteúdo
- Escrever a legenda completa (até 2200 caracteres) com hashtags

### Task 2: `tasks/create-reel-script.md`
Criar o script de Reel de 15-30 segundos:
- Escolher o estilo: Talking Head, Tutorial rápido ou Provocação+gancho
- Estrutura 4 blocos: Gancho (3-5s), Desenvolvimento (8-12s), Virada (3-5s), CTA (3-5s)
- Incluir texto exato da fala de Gabriel em cada bloco
- Incluir texto na tela (caption), trilha sugerida e notas de produção

### Task 3: `tasks/render-slides.md`
Criar templates HTML/CSS para renderização:
- Canvas 1080x1080px para cada slide
- Paleta de cores de Gabriel: primária #1A1A2E, destaque #E94560, texto #FFFFFF
- Tipografia: Inter/Montserrat, headlines 60-72px, subtexto 28-36px
- Handle @gabrielcazonatoo em todos os slides
- Invocar o skill image-creator para renderizar cada slide
- Salvar em `output/slides/slide-[N].png`

---

## Output Format

O arquivo `output/instagram-content.md` deve ter 3 seções principais:

```markdown
# Instagram Content — [tema] — [data]

---

## CAROUSEL — [Título do Ângulo]

### Slide 1 — Gancho
**Headline:** [texto]
**Subtexto:** [texto]
**Visual:** [descrição]

[... slides 2-N ...]

### Legenda
[texto completo]
[hashtags]

---

## REEL SCRIPT — [Título do Ângulo]

**Duração estimada:** [X]s
**Estilo:** [tipo]
**Trilha sugerida:** [referência]

### [0:00-0:04] GANCHO
[texto na tela]: "[texto]"
[fala]: "[fala exata de Gabriel]"
[nota de produção]: [instrução]

[... blocos 2-4 ...]

---

## SLIDES RENDERIZADOS

| Slide | Arquivo | Status |
|---|---|---|
| 01 | output/slides/slide-01.png | renderizado |
[...]
```

---

## Output Example

*(Carousel completo e Reel script estão documentados nas tasks individuais. Ver `tasks/create-carousel.md` e `tasks/create-reel-script.md` para exemplos completos com o tema de consultores ML.)*

---

## Veto Conditions

1. **Carousel com menos de 8 slides:** não entregar carousel incompleto — refazer até ter 8-10 slides
2. **Reel com mais de 35 segundos:** cortar o desenvolvimento se o roteiro estourar
3. **Template HTML com dependências externas:** todo CSS/fonte deve ser inline — sem @import externo
4. **Ausência de Método EGO em qualquer peça:** verificar E, G e O antes de finalizar — se um pilar estiver ausente, inserir antes de entregar
5. **CTA genérico ("me siga", "curta o post"):** substituir por CTA específico conectado ao conteúdo

---

## Quality Criteria

- Carousel: 8-10 slides, gancho forte no slide 1, progressão narrativa, CTA específico
- Reel: 15-30 segundos, gancho nos primeiros 3s, uma ideia central, CTA conectado
- HTML: canvas 1080x1080px, HTML standalone, identidade visual de Gabriel consistente
- Método EGO presente nas 3 peças (E, G, O verificados)
- Legenda completa com hashtags relevantes ao nicho ML
- Slides renderizados e salvos em `output/slides/`
