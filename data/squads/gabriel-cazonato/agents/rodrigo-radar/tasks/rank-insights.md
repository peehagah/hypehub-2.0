---
task: rank-insights
order: 2
agent: rodrigo-radar
input: raw_trends (output de find-trends)
output: squads/gabriel-cazonato/output/trends-brief.md
---

# Task: Ranquear e Empacotar Insights

## Objetivo
Transformar os achados brutos da pesquisa em um briefing estratégico ranqueado, pronto para consumo pelo time criativo. Cada insight deve ter um ângulo de conteúdo sugerido alinhado ao Método EGO e uma estimativa de potencial para o perfil de Gabriel Cazonato.

---

## Process

### Passo 1 — Filtrar e consolidar achados brutos
Revisar todos os `raw_trends` coletados na task anterior. Eliminar:
- Duplicatas (mesmo tema com nome diferente)
- Achados com confiança "baixo" sem nenhuma evidência de suporte adicional
- Tópicos que Gabriel já cobriu amplamente nos últimos 30 dias (verificar brief de foco)
- Tópicos sem relevância clara para o público de 35-60 anos no Mercado Livre

Consolidar achados relacionados em um único insight quando fizer sentido narrativo.

### Passo 2 — Avaliar e ranquear cada insight
Para cada insight que passou o filtro, avaliar em 3 dimensões:

**a) Potencial de engajamento (1-5):** Com base nos sinais de engajamento observados, qual a probabilidade de esse tema gerar saves, comentários e compartilhamentos no perfil de Gabriel?

**b) Alinhamento com Método EGO (E/G/O):** Qual pilar do EGO esse tema ativa mais naturalmente? Um tema pode ter mais de um pilar, mas identificar o dominante ajuda Ivan a escolher o ângulo.

**c) Timing (urgente / relevante / evergreen):** O tema é urgente (precisa sair nos próximos 3 dias), relevante (tem janela de 2 semanas) ou evergreen (pode ser usado a qualquer momento)?

Calcular score final = (potencial × 2) + (timing urgente=3/relevante=2/evergreen=1).

### Passo 3 — Formatar o briefing final
Organizar os insights ranqueados (do maior para menor score) no formato de saída padrão. Incluir:
- Resumo executivo (3-5 linhas sobre o estado geral do nicho nesta semana)
- Lista ranqueada de 5-10 insights com todos os campos preenchidos
- Seção de oportunidades perdidas (temas que ficaram de fora e por quê)

---

## Output Format

```markdown
# Trends Brief — [data]

## Resumo Executivo
[3-5 linhas sobre o estado do nicho esta semana]

## Insights Ranqueados

### #1 — [Título do Insight]
- **Score:** [número]
- **Timing:** urgente | relevante | evergreen
- **Pilar EGO dominante:** E | G | O
- **Evidência:** [fonte + sinal de engajamento]
- **Confiança:** alto | médio | baixo
- **Ângulo de conteúdo sugerido:** [como Gabriel poderia abordar isso]
- **Nota de contexto:** [informação adicional relevante]

[repetir para cada insight]

## Oportunidades Descartadas
- [tema]: [motivo do descarte]
```

---

## Output Example

```markdown
# Trends Brief — 25/03/2025

## Resumo Executivo
Semana marcada por polêmicas sobre promessas irreais de consultores de ML e mudanças no
frete grátis para vendedores Clássico. O público está mais cético e mais ansioso ao mesmo
tempo — ótimo terreno para posicionamento autêntico e técnico. Dropshipping nacional
continua em alta com narrativas exageradas, abrindo espaço para content de Ousadia.

## Insights Ranqueados

### #1 — Polêmica com consultores de ML prometendo resultados irreais
- **Score:** 13
- **Timing:** urgente
- **Pilar EGO dominante:** O (Ousadia) + E (Essência)
- **Evidência:** Thread Twitter com 1.2k RTs + 340 comentários YouTube nos últimos 5 dias
- **Confiança:** alto
- **Ângulo de conteúdo sugerido:** Gabriel expõe os 3 maiores mitos vendidos por consultores e mostra o que é realista esperando em 90 dias no ML
- **Nota de contexto:** Público está indignado mas também esperançoso — precisa de âncora realista com autoridade

### #2 — Impacto da mudança no frete grátis para vendedores Clássico
- **Score:** 11
- **Timing:** urgente
- **Pilar EGO dominante:** G (Generosidade)
- **Evidência:** 47k views em 6 dias no YouTube + reclamações nos grupos FB
- **Confiança:** alto
- **Ângulo de conteúdo sugerido:** Tutorial técnico: como recalcular sua precificação após a mudança de frete — passo a passo com planilha
- **Nota de contexto:** Vendedores com medo de perder margem. Esse é o tema mais urgente da semana.

### #3 — Migração de Clássico para Full: quando vale a pena
- **Score:** 9
- **Timing:** relevante
- **Pilar EGO dominante:** G (Generosidade)
- **Evidência:** Thread FB com 340 comentários, misto de dúvida e medo
- **Confiança:** médio
- **Ângulo de conteúdo sugerido:** Gabriel mostra sua própria experiência de migrar uma operação para Full — o que deu certo e o que errou
- **Nota de contexto:** Pilar de Essência pode entrar com a admissão de erro no processo de migração

### #4 — Dropshipping nacional no ML: verdade vs. hype
- **Score:** 9
- **Timing:** relevante
- **Pilar EGO dominante:** O (Ousadia)
- **Evidência:** Múltiplos Reels com 100k-500k views
- **Confiança:** alto
- **Ângulo de conteúdo sugerido:** Gabriel desmonta o hype com números reais de margem e mostra por que 80% dos "dropshippers nacionais" quebram em 6 meses
- **Nota de contexto:** Posicionamento contra-corrente que gera debates e shares

### #5 — Precificação para vencer o Buy Box sem destruir margem
- **Score:** 7
- **Timing:** evergreen
- **Pilar EGO dominante:** G (Generosidade)
- **Evidência:** Alto volume de busca no Google Trends BR, tema recorrente em fóruns
- **Confiança:** médio
- **Ângulo de conteúdo sugerido:** Carousel técnico com a fórmula de precificação que Gabriel usa na prática, com números reais
- **Nota de contexto:** Excelente para novos seguidores descobrirem o perfil via busca

## Oportunidades Descartadas
- Tendências internacionais de e-commerce B2B: sem relevância para o público-alvo
- Meme de vendedor de ML viralizado: sem profundidade estratégica para criar conteúdo educativo
```

---

## Quality Criteria

1. **Ranqueamento consistente**: o score deve refletir os critérios definidos — não ranquear por preferência pessoal
2. **Ângulos acionáveis**: cada ângulo sugerido deve ser específico o suficiente para Ivan começar a criar sem pesquisar novamente
3. **Cobertura dos pilares EGO**: o briefing como um todo deve ter ao menos 1 insight por pilar (E, G e O) para dar opções ao time criativo

---

## Veto Conditions

1. **Briefing com menos de 5 insights**: se a pesquisa retornou menos de 5 achados sólidos, Rodrigo deve relançar a busca com queries alternativas antes de entregar o briefing
2. **Ausência de ângulo EGO**: qualquer insight sem ângulo de conteúdo sugerido é vetado — o ângulo é o que torna o briefing útil para Ivan e Yuri
