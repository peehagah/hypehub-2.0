---
task: score-content
order: 1
agent: vera-veredito
input: squads/gabriel-cazonato/output/instagram-content.md + squads/gabriel-cazonato/output/youtube-content.md
output: scores internos (passados para generate-feedback)
---

# Task: Pontuar Todo o Conteúdo Produzido

## Objetivo
Avaliar e pontuar objetivamente cada peça de conteúdo (carousel, script de Reel e roteiro YouTube) contra os critérios definidos em quality-criteria.md e os pilares do Método EGO. Produzir um scorecard estruturado que fundamente o veredito final.

---

## Process

### Passo 1 — Ler todo o conteúdo produzido
Ler o `instagram-content.md` completo (carousel + Reel) e o `youtube-content.md` (roteiro + metadados SEO) sem emitir julgamento ainda. Primeira leitura é para absorver o conteúdo como um espectador/leitor do nicho.

Na primeira leitura, anotar apenas:
- Momentos que fizeram "parar e prestar atenção"
- Momentos que pareceram forçados, genéricos ou artificiais
- Qualquer inconsistência de voz, fato ou tom

### Passo 2 — Avaliar cada peça nas 5 dimensões
Para cada peça (carousel, Reel, YouTube), pontuar de 0 a 10 nas seguintes dimensões:

**Dimensão 1 — Método EGO (peso 3x)**
- E presente e autêntico? (0-10)
- G presente e de alto valor? (0-10)
- O presente e corajoso, não só polêmico? (0-10)
- Score EGO = média(E, G, O) × 3

**Dimensão 2 — Voz de Gabriel (peso 2x)**
- Soaria natural vindo de Gabriel, sem soar escrito por IA? (0-10)
- Linguagem adequada ao público de 35-60 anos, Mercado Livre? (0-10)
- Score Voz = média × 2

**Dimensão 3 — Qualidade Técnica (peso 1x)**
- Informações técnicas corretas e específicas? (0-10)
- Progressão narrativa fluida? (0-10)
- Score Técnica = média × 1

**Dimensão 4 — Potencial de Engajamento (peso 1x)**
- Gancho forte no início? (0-10)
- CTA específico e conectado ao conteúdo? (0-10)
- Score Engajamento = média × 1

**Dimensão 5 — Conformidade com o Brief (peso 2x)**
- Alinhado com o ângulo selecionado no checkpoint? (0-10)
- Alinhado com o tema identificado por Rodrigo? (0-10)
- Score Brief = média × 2

**Score Final por peça = soma ponderada / 9 (normalizado 0-10)**

### Passo 3 — Verificações binárias (bloqueantes)
Além das dimensões pontuadas, verificar itens binários que, se falhos, resultam em REJECT automático:
- [ ] Carousel tem 8-10 slides?
- [ ] Slide 1 tem gancho real (não genérico)?
- [ ] Reel tem duração estimada ≤35 segundos?
- [ ] YouTube tem open loops (mínimo 3)?
- [ ] Momento de Essência presente no YouTube?
- [ ] Nenhuma informação técnica incorreta sobre o Mercado Livre?
- [ ] Voz de Gabriel coerente em todas as peças (sem "escorregadas" de linguagem IA)?

---

## Output Format

```markdown
## Scorecard — [data]

### Carousel
| Dimensão | Score Bruto | Peso | Score Ponderado |
|---|---|---|---|
| Método EGO | X/10 | 3x | X |
| Voz de Gabriel | X/10 | 2x | X |
| Qualidade Técnica | X/10 | 1x | X |
| Potencial de Engajamento | X/10 | 1x | X |
| Conformidade com Brief | X/10 | 2x | X |
| **TOTAL** | | | **/90** |
| **Score Final** | | | **X/10** |

**Verificações Binárias:**
- [ ok / FALHOU ] [item]

### Reel
[mesma estrutura]

### YouTube
[mesma estrutura]

### Scores Consolidados
| Peça | Score | Status Preliminar |
|---|---|---|
| Carousel | X/10 | ≥7 = OK / <7 = ATENÇÃO / <5 = REJECT |
| Reel | X/10 | ... |
| YouTube | X/10 | ... |
| **Média Geral** | **X/10** | |
```

---

## Output Example

```markdown
## Scorecard — 25/03/2025

### Carousel — "Os 3 números que todo guru de ML esconde de você"

| Dimensão | Score Bruto | Peso | Score Ponderado |
|---|---|---|---|
| Método EGO | 8.7/10 | 3x | 26.1 |
| Voz de Gabriel | 9.0/10 | 2x | 18.0 |
| Qualidade Técnica | 8.5/10 | 1x | 8.5 |
| Potencial de Engajamento | 9.0/10 | 1x | 9.0 |
| Conformidade com Brief | 8.5/10 | 2x | 17.0 |
| **TOTAL** | | | **78.6/90** |
| **Score Final** | | | **8.7/10** |

**Verificações Binárias:**
- [ok] Carousel tem 9 slides (dentro do range 8-10)
- [ok] Slide 1 tem gancho forte: "R$10k em 30 dias no ML. A mentira que está te custando caro."
- [ok] Nenhuma informação técnica incorreta verificada
- [ok] Voz de Gabriel coerente — linguagem soa autêntica
- [ATENÇÃO] Slide 7 (Essência) poderia ser mais específico sobre quando Gabriel cometeu o erro

**Pontos de destaque:**
- Slide 4 com dado de "73% desistência" é excelente — concreto, verificável, gera impacto
- Progressão slide a slide é fluida, cada slide cria micro-curiosidade
- CTA duplo no slide 9 é estratégico (save + DM)

**Pontos de atenção:**
- Slide 7 (Essência): "No início da minha carreira" é vago — Gabriel deve especificar o ano ou contexto
- Subtexto do slide 3 poderia ter dado mais específico (% dos vendedores)

---

### Reel — "Os 3 números que todo guru de ML esconde de você"

| Dimensão | Score Bruto | Peso | Score Ponderado |
|---|---|---|---|
| Método EGO | 8.0/10 | 3x | 24.0 |
| Voz de Gabriel | 8.5/10 | 2x | 17.0 |
| Qualidade Técnica | 8.0/10 | 1x | 8.0 |
| Potencial de Engajamento | 9.0/10 | 1x | 9.0 |
| Conformidade com Brief | 9.0/10 | 2x | 18.0 |
| **TOTAL** | | | **76.0/90** |
| **Score Final** | | | **8.4/10** |

**Verificações Binárias:**
- [ok] Duração estimada: 27 segundos (dentro do range)
- [ok] Gancho nos primeiros 4 segundos é forte
- [ok] Uma ideia central (os 3 números) — não sobrecarregado
- [ok] CTA conectado ao conteúdo ("salva e manda pra quem precisa")

---

### YouTube — "Como Vencer o Buy Box no Mercado Livre Sem Destruir Sua Margem"

| Dimensão | Score Bruto | Peso | Score Ponderado |
|---|---|---|---|
| Método EGO | 8.5/10 | 3x | 25.5 |
| Voz de Gabriel | 8.0/10 | 2x | 16.0 |
| Qualidade Técnica | 9.0/10 | 1x | 9.0 |
| Potencial de Engajamento | 8.5/10 | 1x | 8.5 |
| Conformidade com Brief | 8.0/10 | 2x | 16.0 |
| **TOTAL** | | | **75.0/90** |
| **Score Final** | | | **8.3/10** |

**Verificações Binárias:**
- [ok] 3 open loops identificados e resolvidos
- [ok] Momento de Essência presente (erro de R$8.400)
- [ok] Introdução ≤3 min (abertura em 2:30)
- [ATENÇÃO] Seção 2 tem 7 minutos — pode ser longa demais sem pattern interrupt adicional

---

### Scores Consolidados

| Peça | Score | Status Preliminar |
|---|---|---|
| Carousel | 8.7/10 | OK |
| Reel | 8.4/10 | OK |
| YouTube | 8.3/10 | OK |
| **Média Geral** | **8.5/10** | |
```

---

## Quality Criteria

1. **Scorecard completo**: todas as 3 peças devem ter scorecard preenchido — não aceitar análise parcial
2. **Verificações binárias explícitas**: todos os itens binárias devem ser verificados e marcados — não podem ser pulados
3. **Pontos de destaque e atenção separados**: misturar pontos positivos e negativos no mesmo campo confunde o feedback — manter separados por seção

---

## Veto Conditions

1. **Score sem achados específicos**: um score de 6/10 sem explicar especificamente o que gerou a nota baixa é vetado — o score deve ser rastreável a trechos concretos do conteúdo
2. **Verificação binária ignorada**: pular qualquer item da verificação binária é vetado — esses itens são bloqueantes por definição
