---
type: agent-step
step: "02"
agent: rodrigo-radar
execution: subagent
model_tier: powerful
inputFile: squads/gabriel-cazonato/pipeline/data/research-focus.md
outputFile: squads/gabriel-cazonato/output/trends-brief.md
---

# Step 02: Rodrigo Radar — Pesquisa de Tendências

## Contexto

O Rodrigo Radar é o pesquisador de tendências do squad. Ele vasculha YouTube, Instagram, comunidades de vendedores do Mercado Livre, blogs de e-commerce e grupos de empreendedores para identificar o que está gerando engajamento agora no nicho.

**Cliente:** Gabriel Cazonato — consultor e mentor de Mercado Livre
**Público-alvo do conteúdo:** brasileiros de 35-60 anos que vendem ou querem vender no Mercado Livre
**Método de conteúdo:** Método EGO (Essência, Generosidade, Ousadia)

---

## Context Loading

Carregar antes de executar:
- `pipeline/data/research-focus.md` — foco temático desta rodada (definido no checkpoint anterior)
- `pipeline/data/domain-framework.md` — framework de domínio do nicho ML
- `pipeline/data/research-brief.md` — guia de pesquisa do squad

---

## Instruções de Execução

Executar as tasks em ordem:

### Task 1: `tasks/find-trends.md`
Realizar pesquisa ativa usando web_search e web_fetch nas seguintes fontes:
- YouTube: vídeos recentes sobre Mercado Livre (últimos 14 dias, >10k views)
- Instagram/TikTok: Reels virais com hashtags do nicho (#mercadolivre, #ecommercebrasil, etc.)
- Comunidades: grupos do Facebook de vendedores ML, fóruns, Reddit
- Notícias: mudanças recentes na plataforma, comportamento do consumidor
- Concorrentes de Gabriel: outros mentores de ML no Instagram/YouTube

Para cada achado, registrar: tópico, fonte, data, sinal de engajamento, nível de confiança, notas.

### Task 2: `tasks/rank-insights.md`
Com os achados brutos, filtrar duplicatas e irrelevâncias, avaliar cada insight em 3 dimensões (potencial de engajamento, alinhamento EGO, timing), calcular score final e formatar o briefing ranqueado com 5-10 insights.

---

## Output Format

O arquivo `output/trends-brief.md` deve conter:

```markdown
# Trends Brief — [data]

## Resumo Executivo
[3-5 linhas sobre o estado do nicho esta semana]

## Insights Ranqueados

### #1 — [Título]
- **Score:** [número]
- **Timing:** urgente | relevante | evergreen
- **Pilar EGO dominante:** E | G | O
- **Evidência:** [fonte + sinal de engajamento]
- **Confiança:** alto | médio | baixo
- **Ângulo de conteúdo sugerido:** [como Gabriel poderia abordar isso]
- **Nota de contexto:** [informação adicional]

[repetir para cada insight, mínimo 5, máximo 10]

## Oportunidades Descartadas
- [tema]: [motivo]
```

---

## Output Example

```markdown
# Trends Brief — 25/03/2025

## Resumo Executivo
Semana marcada por polêmicas sobre promessas irreais de renda no ML e mudanças no
frete grátis para vendedores Clássico. Público mais cético e ansioso simultaneamente —
terreno fértil para posicionamento autêntico. Dropshipping nacional em alta com
narrativas exageradas, criando oportunidade de Ousadia para Gabriel.

## Insights Ranqueados

### #1 — Polêmica com consultores prometendo R$10k/mês em 30 dias no ML
- **Score:** 13
- **Timing:** urgente
- **Pilar EGO dominante:** O + E
- **Evidência:** Thread Twitter com 1.2k RTs + 340 comentários YouTube em 5 dias
- **Confiança:** alto
- **Ângulo de conteúdo sugerido:** Gabriel expõe os 3 maiores mitos e apresenta o que é realista em 90 dias
- **Nota de contexto:** Público indignado mas esperançoso — precisa de âncora de autoridade honesta

### #2 — Impacto da mudança no frete grátis para vendedores Clássico
- **Score:** 11
- **Timing:** urgente
- **Pilar EGO dominante:** G
- **Evidência:** 47k views em 6 dias no YouTube + reclamações em grupos FB
- **Confiança:** alto
- **Ângulo de conteúdo sugerido:** Tutorial: como recalcular precificação após mudança de frete — passo a passo
- **Nota de contexto:** Vendedores com medo de perder margem. Tema mais urgente da semana.

## Oportunidades Descartadas
- Tendências de e-commerce B2B internacional: sem relevância para o público-alvo
- Polêmica de influencer sem relação com ML: sem substância para conteúdo educativo
```

---

## Veto Conditions

1. **Briefing com menos de 5 insights ranqueados:** relançar a pesquisa com queries alternativas antes de entregar
2. **Insight sem ângulo de conteúdo sugerido:** qualquer insight sem essa seção preenchida deve ser reescrito ou descartado
3. **Todos os insights do mesmo pilar EGO:** o briefing deve cobrir pelo menos E, G e O — se estiver desequilibrado, buscar ativamente insights para os pilares faltantes
4. **Dados sem fonte verificável:** nenhum insight pode ser incluído sem ao menos uma fonte rastreável

---

## Quality Criteria

- Mínimo de 5 insights com score calculado e ranking explícito
- Ao menos 2 insights com timing "urgente" (publicados nos últimos 14 dias)
- Cobertura dos 3 pilares EGO entre os 5 primeiros insights
- Cada insight com ângulo de conteúdo acionável para Ivan e Yuri
- Briefing legível em menos de 3 minutos
- Resumo executivo que captura o "estado de espírito" do nicho nesta semana
