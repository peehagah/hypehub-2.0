---
type: agent-step
step: "07"
agent: yuri-youtube
execution: subagent
model_tier: powerful
inputFile:
  - squads/gabriel-cazonato/output/angles.md
  - ângulo selecionado no checkpoint (step-05)
outputFile: squads/gabriel-cazonato/output/youtube-content.md
format: youtube-script
parallel: step-06-ivan-create.md
---

# Step 07: Yuri YouTube — Roteiro Completo

## Contexto

Yuri YouTube cria o roteiro completo para o canal @gabrielcazonato. Este step executa em paralelo com o Step 06 (Ivan Instagram), usando o mesmo ângulo selecionado por Pedro.

**Formato padrão de Gabriel no YouTube:**
- Tutorial técnico longo: 17-35 minutos — passo a passo de processo específico do ML
- Vlog de bastidores: 20-45 minutos — rotina, resultados, erros, Essência
- Híbrido (mais comum): tutorial com elementos de bastidores pessoais

**Público-alvo:** brasileiros de 35-60 anos que vendem ou querem vender no Mercado Livre. Escolheram deliberadamente assistir ao vídeo — querem aprender, não ser entretidos.

---

## Context Loading

Carregar antes de executar:
- `output/angles.md` — ângulos e ângulo selecionado
- `pipeline/data/tone-of-voice.md` — voz de Gabriel
- `pipeline/data/domain-framework.md` — conhecimento técnico do nicho ML
- `pipeline/data/output-examples.md` — exemplos de roteiro aprovado

---

## Instruções de Execução

Executar as tasks em ordem:

### Task 1: `tasks/create-script.md`
Criar o roteiro completo com:

**Metadados iniciais:**
- Título SEO provisório + conceito de thumbnail + promessa central

**ATO 1 — Abertura (0-10% do vídeo):**
- Cold open: começa no meio de uma cena ou revelação — sem introdução padrão
- Hook principal: por que assistir este vídeo agora
- Loop aberto #1: anunciar revelação para mais tarde

**ATO 2 — Desenvolvimento (10-85%):**
- Seções temáticas com marcações de tempo estimado
- Pattern interrupt a cada 4-6 minutos: [CÂMERA], [B-ROLL], [TELA], [IMPROVISO]
- Loop aberto #2 e #3 distribuídos ao longo do desenvolvimento
- Momento de Essência: Gabriel admite algo difícil ou vulnerável
- Blocos marcados com [ÂNCORA] onde Gabriel fala livremente sobre o tema

**ATO 3 — Fechamento (85-100%):**
- Resolução de todos os open loops
- CTA de engajamento (comentário específico)
- CTA de conversão (mentoria ou próximo vídeo)

### Task 2: `tasks/optimize-script.md`
Adicionar ao roteiro:
- Pesquisa de palavras-chave (web_search para verificar volume)
- 3 opções de título com recomendação e justificativa
- Descrição completa do YouTube (gancho + detalhamento + links)
- Chapters (timestamps) precisos baseados no roteiro
- Lista de tags (20-30 tags)
- Pinned comment com pergunta específica de engajamento

---

## Output Format

O arquivo `output/youtube-content.md` deve ter 2 seções:

```markdown
# YouTube Content — [tema] — [data]

---

## ROTEIRO — [Título Provisório]

### Metadados
- **Título provisório:** [título]
- **Duração estimada:** [X] minutos
- **Formato:** tutorial | vlog | híbrido
- **Thumbnail:** [descrição detalhada]
- **Promessa central:** [frase]

---

### ATO 1 — ABERTURA [0:00-X:XX]

#### Cold Open [0:00-0:30]
[roteiro com marcações]

#### Hook Principal [0:30-2:00]
[roteiro com marcações]

---

### ATO 2 — DESENVOLVIMENTO [X:XX-X:XX]

#### Seção 1: [nome] [X:XX-X:XX]
[roteiro]

[... demais seções ...]

---

### ATO 3 — FECHAMENTO [X:XX-fim]
[roteiro]

---

## METADADOS SEO

### Títulos — Opções
- **Opção A (SEO):** [título]
- **Opção B (Engajamento):** [título]
- **Opção C (Equilibrado):** [título]
- **Recomendação:** Opção [X] — [justificativa]

### Descrição Completa
[texto]

### Chapters (Timestamps)
0:00 — [nome]
[...]

### Tags
[lista]

### Pinned Comment
[texto]
```

---

## Output Example

*(Roteiro completo documentado em `tasks/create-script.md` e metadados SEO em `tasks/optimize-script.md`. Exemplos usam o tema de Buy Box no Mercado Livre — padrão de profundidade e estrutura esperados.)*

---

## Veto Conditions

1. **Introdução acima de 3 minutos:** cold open + hook principal devem caber em até 3 minutos — introduções longas destroem retenção para este nicho
2. **Menos de 3 open loops:** o roteiro deve ter no mínimo 3 loops abertos distribuídos e todos resolvidos no Ato 3
3. **Ausência de momento de Essência:** todo vídeo de Gabriel precisa de ao menos um momento de vulnerabilidade real — sem isso, o conteúdo é técnico mas não converte em confiança
4. **Roteiro sem marcações de tempo:** entregar roteiro sem timestamps e notações de produção é inaceitável — Gabriel e o editor precisam dessas referências
5. **Metadados SEO ausentes:** título sem verificação de keyword, descrição sem keywords, chapters ausentes = step incompleto

---

## Quality Criteria

- Roteiro completo com marcações de tempo, cenas [CÂMERA/TELA/B-ROLL/IMPROVISO]
- Cold open forte nos primeiros 30 segundos
- Mínimo de 3 open loops com resolução no Ato 3
- Pattern interrupt a cada 4-6 minutos nos vídeos acima de 20 minutos
- Momento de Essência explicitamente marcado no roteiro
- 3 opções de título com recomendação
- Descrição completa + chapters precisos + tags + pinned comment
