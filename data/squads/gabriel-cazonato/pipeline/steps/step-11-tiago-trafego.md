---
type: agent-step
step: "11"
agent: tiago-trafego
execution: subagent
inputFile:
  - squads/influencer-hub/output/instagram-content.md
  - squads/influencer-hub/output/quality-report.md
outputFile: squads/influencer-hub/output/traffic-plan.md
---

# Step 11: Tiago Tráfego — Plano de Tráfego Pago

## Contexto

Tiago Tráfego fecha o ciclo criando a estrutura completa de campanha Meta Ads para o conteúdo aprovado. Ele transforma o melhor conteúdo do ciclo em campanhas prontas para execução — com audiências, orçamentos, configurações e KPIs definidos.

Esta etapa roda como **subagent** (background) após a aprovação final de Pedro.

---

## Context Loading

Carregar antes de executar:
- `output/instagram-content.md` — conteúdo aprovado (carousel + Reel)
- `output/quality-report.md` — scores e vereditos de Vera
- `pipeline/data/client-brief-gabriel.md` — perfil do cliente e audiência
- `pipeline/data/research-brief.md` — contexto de mercado e concorrência

---

## Instruções de Execução

Executar as tasks em sequência:

### 1. `tasks/create-campaign-structure.md`
Criar estrutura completa de campanha Meta Ads:
- **Campanha Topo de Funil (ToFu):** impulsionamento do Reel aprovado para audiência fria
- **Campanha Meio de Funil (MoFu):** retargeting de engajamento (quem assistiu 50%+ do Reel)
- **Campanha Fundo de Funil (BoFu):** conversão para lead/aplicação de mentoria (quem visitou perfil 2x+)

Para cada campanha:
- Objetivo do Meta Ads
- Audiência detalhada (interesses, comportamentos, lookalike)
- Orçamento diário recomendado
- Formato de criativo recomendado
- Copy do anúncio (headline + texto primário + CTA)
- KPIs esperados e threshold de corte em 7 dias

### 2. `tasks/optimize-targeting.md`
Recomendar:
- Segmentações de exclusão (quem NÃO deve ver o anúncio)
- Lookalike audiences baseadas em engajamento histórico
- Configurações de pixel e eventos de conversão
- Estratégia de teste A/B para 2-3 variações de copy/criativo

---

## Output Format

### `output/traffic-plan.md`

```markdown
# Plano de Tráfego — [conteúdo do ciclo] — [data]

## Resumo Executivo
- Budget total recomendado: R$ [valor]/semana
- Distribuição: ToFu R$[X] / MoFu R$[Y] / BoFu R$[Z]
- CPL esperado: R$[valor] (lead qualificado para mentoria)
- Janela de avaliação: 7 dias

---

## Campanha 1 — Topo de Funil (Awareness)

**Criativo:** [Reel/Carousel — título]
**Objetivo Meta Ads:** Alcance / Visualizações de Vídeo / Engajamento
**Orçamento diário:** R$[valor]

### Conjunto de Anúncios
**Audiência:**
- Localização: Brasil
- Idade: 35-60 anos
- Interesses: [lista detalhada]
- Comportamentos: [lista]
- Exclusões: [lista]

**Copy do Anúncio:**
- Headline: [texto]
- Texto primário: [texto completo]
- CTA: [botão]

**KPIs e Thresholds:**
- CPM esperado: R$[X]
- CTR mínimo: [X]%
- Threshold de corte (7d): [condição de pausa]

---

## Campanha 2 — Meio de Funil (Retargeting)

[mesmo formato]

---

## Campanha 3 — Fundo de Funil (Conversão)

[mesmo formato]

---

## Testes A/B Recomendados

### Variação A
[copy/criativo A]

### Variação B
[copy/criativo B]

**Critério de vencedor:** [métrica e threshold]

---

## Configurações Técnicas
- Pixel: configurar evento [nome] para [ação]
- UTMs: [estrutura recomendada]
- Janela de atribuição: [configuração]
```

---

## Veto Conditions

1. **Campanha sem audiência detalhada:** interesses vagos não são aceitos — listar termos exatos do Gerenciador
2. **Copy sem texto real:** "texto persuasivo aqui" não é output — headline e texto primário devem ser texto final
3. **KPIs sem threshold de corte:** toda campanha deve ter critério claro de pausa

---

## Quality Criteria

- 3 campanhas por fase de funil com configurações completas
- Copy real e finalizado para cada variação
- Orçamento distribuído com justificativa
- KPIs e critérios de corte definidos
- Estrutura executável por um assistente de mídia sem explicações adicionais
