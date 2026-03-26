---
task: optimize-targeting
order: 2
agent: tiago-trafego
input: squads/influencer-hub/output/traffic-plan.md (estrutura inicial) + dados históricos quando disponíveis
output: squads/influencer-hub/output/traffic-plan.md (seção targeting + KPI thresholds)
---

# Task: Otimizar Targeting e Definir KPI Thresholds

## Objetivo
Aprofundar as recomendações de audiência da estrutura de campanha, definir os KPI thresholds detalhados por fase de funil, e criar um cronograma de otimização com pontos de revisão específicos para Pedro executar ao longo dos 14 dias de aprendizado.

---

## Process

### Passo 1 — Construir mapa de audiências detalhado
Para o nicho de Gabriel Cazonato (vendedores/aspirantes a vendedores de ML, 35-60 anos, Brasil), construir um mapa detalhado de audiências por temperatura:

**Audiências Frias (TOFU):**
Listar interesses específicos disponíveis no Meta Ads para este nicho, em 3 camadas:
- Camada 1 (core): interesses diretamente relacionados (Mercado Livre, e-commerce, vendas online)
- Camada 2 (adjacente): interesses de segunda ordem (empreendedorismo, renda extra, lojas virtuais, dropshipping)
- Camada 3 (comportamental): comportamentos de compra e uso (compradores online frequentes, PME owners)

**Audiências Morno (MOFU):**
- Retargeting de engajamento por janela (7d, 30d, 60d, 90d) — qual janela usar em cada fase
- Visualizadores de vídeo por percentual (25%, 50%, 75%, 95%) — qual percentual segmentar
- Visitantes de perfil — janela recomendada

**Audiências Quentes (BOFU):**
- Visitantes de página de mentoria por janela
- Lista de e-mails de leads anteriores (se disponível)
- Lookalike de compradores/alunos convertidos (se disponível)

### Passo 2 — Definir KPI thresholds completos
Para cada métrica relevante por fase, definir 3 valores:
- **Verde (otimizar):** campanha performando bem, escalar gradualmente (+20% budget/semana)
- **Amarelo (monitorar):** campanha abaixo do ideal mas não crítico, ajustar audiência ou criativo
- **Vermelho (pausar/refazer):** campanha fora de controle, pausar e diagnósticar antes de retomar

### Passo 3 — Criar cronograma de otimização de 14 dias
Definir exatamente o que Pedro deve verificar e fazer em cada ponto de revisão:
- **Dia 1-2:** validação técnica (pixels disparando, eventos corretos, sem rejeições de anúncio)
- **Dia 3:** primeira revisão de dados (descartar ou ajustar audiências com CPM muito alto)
- **Dia 7:** revisão de meio prazo (score de relevância, distribuição de frequência, primeiros CPLs)
- **Dia 14:** revisão de ciclo completo (decisão de escalar, pausar ou reformular por fase)

---

## Output Format

```markdown
## Mapa de Audiências — [nicho]

### Audiências Frias (TOFU)
**Camada 1 — Core:**
- [interesse]: [justificativa]

[...]

### KPI Thresholds por Fase

| Métrica | Verde | Amarelo | Vermelho |
|---|---|---|---|
| CPM (TOFU) | ≤ R$15 | R$15-30 | > R$30 |
[...]

### Cronograma de Otimização — 14 dias
**Dia 1-2 (Validação Técnica)**
- [ ] [ação]

[...]
```

---

## Output Example

```markdown
## Mapa de Audiências — Vendedores Mercado Livre BR

### Audiências Frias (TOFU)

**Camada 1 — Core (interesses diretos):**
- Mercado Livre: disponível como interesse no Meta — audiência grande, relevância alta
- E-commerce: amplamente disponível — cobrir com exclusão de interesses muito genéricos
- Vendas online / Vendas pela internet: interesse de segunda tela, combinar com camada 1
- Lojas virtuais: audiência menor, mais qualificada — usar em MOFU como teste

**Camada 2 — Adjacente (segunda ordem):**
- Empreendedorismo: audiência ampla, combinar sempre com Camada 1 para qualificar
- Renda extra: captura aspiracionais, bom para TOFU de descoberta
- Dropshipping: muito específico — bom para campanhas que abordam esse tema diretamente
- Gestão de estoque: audiência pequena mas altamente qualificada para vendedores ativos
- Pequenas empresas: comportamento disponível no Meta, cruza com dono de negócio

**Camada 3 — Comportamental:**
- Proprietários de pequenas e médias empresas (comportamento Meta)
- Compradores online frequentes (comportamento Meta)
- Usuários de Android (proxy para classe B/C que vende no ML via app)
- Renda estimada R$3k-8k/mês: segmentação disponível em algumas regiões do Brasil

**Recomendação de combinação TOFU:**
Conjunto A: (Mercado Livre OU Vendas online) + (Empreendedorismo OU Renda extra)
Conjunto B: Lookalike 2-5% baseado em engajadores do perfil (mais rápido de escalar)

---

### Audiências Mornas (MOFU)

**Retargeting por janela — qual usar quando:**
- 7 dias: audiência menor, maior intenção — usar em BOFU, não MOFU
- 30 dias: equilíbrio ideal para MOFU — pessoas que se lembraram de Gabriel recentemente
- 60 dias: maior volume, menor temperatura — bom para MOFU quando audiência de 30d é pequena
- 90 dias: usar apenas se o perfil tem <10k seguidores (audiência de retargeting muito pequena)

**Visualizadores de vídeo — thresholds:**
- 95% de visualização (últimos 30 dias): público quente, usar em BOFU
- 75% de visualização (últimos 60 dias): público morno qualificado, ideal MOFU
- 50% de visualização (últimos 90 dias): volume maior, qualidade mediana — MOFU com criativo mais informativo
- 25% de visualização: muito frio, usar apenas se audiências maiores estiverem esgotadas

---

### Audiências Quentes (BOFU)

**Prioridade 1:** Visitantes da página de mentoria nos últimos 30 dias (mais quente possível)
**Prioridade 2:** Pessoas que enviaram DM ou clicaram em link da bio nos últimos 14 dias
**Prioridade 3:** Top engajadores (salvaram ou comentaram ≥2 posts nos últimos 30 dias)
**Prioridade 4:** Lookalike 1% de alunos convertidos (quando lista estiver disponível com ≥100 pessoas)

**Notas de exclusão obrigatória para BOFU:**
- Excluir lista de alunos já matriculados (não re-vender para clientes ativos)
- Excluir pessoas que se inscreveram no processo seletivo e foram recusadas nos últimos 60 dias

---

### KPI Thresholds por Fase

| Métrica | Fase | Verde | Amarelo | Vermelho |
|---|---|---|---|---|
| CPM | TOFU | ≤ R$18 | R$18-30 | > R$30 |
| Frequência (7d) | TOFU | ≤ 2.0 | 2.0-3.0 | > 3.0 |
| Custo/Engajamento | MOFU | ≤ R$0.60 | R$0.60-1.50 | > R$1.50 |
| CTR (link) | MOFU | ≥ 2.0% | 1.0-2.0% | < 1.0% |
| CPL | BOFU | ≤ R$180 | R$180-320 | > R$320 |
| CTR (link) | BOFU | ≥ 2.5% | 1.5-2.5% | < 1.5% |
| CPC | BOFU | ≤ R$8 | R$8-18 | > R$18 |

*Referência: ticket médio de mentoria R$11k. CPL de R$320 = ROAS de 34x se 1% dos leads converte.
Com taxa de conversão de 5% de lead → aluno, CPL máximo sustentável = R$550.*

---

### Cronograma de Otimização — 14 Dias

**Dia 1-2 (Validação Técnica)**
- [ ] Verificar se o Pixel Meta está disparando corretamente na página de mentoria
- [ ] Confirmar evento de "Lead" configurado e sendo reportado no Gerenciador
- [ ] Verificar se todos os anúncios passaram na revisão do Meta (sem rejeições)
- [ ] Confirmar CPM inicial — se acima de R$40 nas primeiras 24h, revisar segmentação

**Dia 3 (Primeira Revisão)**
- [ ] Comparar CPM entre conjuntos de anúncios TOFU: descartar o que estiver acima de R$35
- [ ] Verificar se algum anúncio tem CTR < 0.5% (criativo fraco — pausar e trocar)
- [ ] Checar frequência: se já acima de 1.5 em 3 dias, reduzir orçamento TOFU ou ampliar audiência

**Dia 7 (Revisão de Meio Período)**
- [ ] TOFU: manter os 2 conjuntos com melhor CPM, pausar os demais
- [ ] MOFU: avaliar custo por engajamento — se > R$2.00, testar variação de criativo (texto da legenda)
- [ ] BOFU: primeiros CPLs disponíveis — se > R$400, revisar landing page e audiência quente
- [ ] Decidir se dobra orçamento BOFU se CPL < R$200 (sinal de performance)

**Dia 14 (Revisão de Ciclo Completo)**
- [ ] TOFU: calcular CPM médio do período e alcance único total
- [ ] MOFU: calcular taxa de salvamento e custo por engajamento médio
- [ ] BOFU: calcular CPL médio e total de leads gerados no ciclo
- [ ] Decisão: escalar campanha vencedora por mais 14 dias OU criar novo ciclo de criativo
- [ ] Documentar learnings no Pedro/Pedro arquivo de performance histórica

---

### Regras de Escalabilidade
- Aumentar budget em no máximo 20% a cada 3-4 dias para preservar fase de aprendizado do algoritmo
- Nunca duplicar budget de uma vez — o Meta reinicia o aprendizado e os resultados pioram nos primeiros dias
- Se uma campanha for pausada por mais de 7 dias, tratar como nova campanha ao reativar (reaprendizado)
```

---

## Quality Criteria

1. **Thresholds com valores reais**: todo threshold deve ter valor numérico específico (não "alto" ou "baixo") — CPL de R$180-320 é um threshold, "CPL alto" não é
2. **Cronograma acionável**: cada dia do cronograma deve ter ações específicas que Pedro possa executar sem interpretação adicional
3. **Contexto de ticket médio**: todas as recomendações de CPL e CPC devem ser contextualizadas pelo ticket de R$10-12k — o que parece caro em ticket baixo pode ser extremamente eficiente aqui

---

## Veto Conditions

1. **Thresholds genéricos de benchmarks americanos**: usar CPL de "$50" ou ROAS de "4x" sem conversão para contexto brasileiro e de alta-ticket é vetado — benchmarks de mercados incomparáveis desorientam a tomada de decisão
2. **Cronograma sem ações específicas**: cronograma que diz apenas "verificar resultados no dia 7" sem especificar o que verificar, qual valor é bom/ruim e o que fazer em cada cenário é vetado
