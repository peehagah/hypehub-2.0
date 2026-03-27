---
task: create-campaign-structure
order: 1
agent: tiago-trafego
input: squads/influencer-hub/output/review-report.md + squads/influencer-hub/output/instagram-content.md
output: squads/influencer-hub/output/traffic-plan.md (seção estrutura de campanha)
---

# Task: Criar Estrutura Completa de Campanha Meta Ads

## Objetivo
Criar a estrutura completa de campanha Meta Ads para promover o conteúdo aprovado do ciclo. A campanha deve contemplar os 3 estágios do funil (Topo, Meio, Fundo) com objetivos, audiências, configurações e orçamentos específicos para o contexto de Gabriel Cazonato — mentor de Mercado Livre com ticket de R$10-12k/ano.

---

## Process

### Passo 1 — Analisar o conteúdo aprovado
Ler o `review-report.md` para confirmar quais peças foram aprovadas e o `instagram-content.md` para entender o criativo disponível. Identificar:
- Qual peça tem maior potencial para Topo de funil (awareness/alcance)?
- Qual peça tem maior potencial para Meio de funil (consideração/engajamento)?
- Qual mensagem melhor suporta o Fundo de funil (conversão para lead de mentoria)?

### Passo 2 — Estruturar campanha por fase de funil

**TOFU — Topo de Funil (Awareness + Alcance):**
- Objetivo Meta: Alcance ou Reconhecimento de Marca
- Criativo: Reel aprovado (maior potencial de alcance orgânico impulsionado)
- Audiência: fria, baseada em interesses
- Orçamento: 50% do budget total
- KPI: CPM, Alcance, Frequência ≤ 2.5 em 7 dias

**MOFU — Meio de Funil (Engajamento + Consideração):**
- Objetivo Meta: Engajamento ou Visualizações de Vídeo
- Criativo: Carousel aprovado
- Audiência: retargeting de quem interagiu com o perfil nos últimos 60 dias + lookalike de engajamento
- Orçamento: 30% do budget total
- KPI: Taxa de Engajamento, Custo por Engajamento, Saves

**BOFU — Fundo de Funil (Conversão):**
- Objetivo Meta: Tráfego ou Geração de Leads
- Criativo: versão adaptada do carousel com CTA explícito para mentoria
- Audiência: retargeting quente (visitantes de página de mentoria + engajamento alto dos últimos 30 dias)
- Orçamento: 20% do budget total
- KPI: CPL (Custo por Lead), CTR, CPC

### Passo 3 — Definir naming convention e estrutura técnica
Nomear cada campanha, conjunto de anúncios e anúncio seguindo a convenção:
- Campanha: `[TOFU/MOFU/BOFU]-[tema]-[data]`
- Conjunto de anúncios: `[audiência]-[objetivo]`
- Anúncio: `[formato]-[versão]`

Definir para cada conjunto de anúncios:
- Localização: Brasil, segmentação geográfica relevante
- Faixa etária: 30-65 anos (abrange público-alvo 35-60 com margem)
- Gênero: todos (não segmentar por gênero sem dado histórico)
- Dispositivos: mobile prioritário (Instagram)
- Posicionamentos: Instagram Feed + Reels + Stories (não expandir para Facebook sem teste)

---

## Output Format

```markdown
## Estrutura de Campanha — [tema] — [data]

### Resumo do Plano
- **Budget total diário recomendado:** R$ [valor]
- **Duração inicial:** [X] dias (fase de aprendizado)
- **Objetivo principal:** [qual conversão mede sucesso]

---

### TOFU — [nome da campanha]
**Objetivo Meta:** [objetivo]
**Orçamento diário:** R$ [valor] ([%] do total)
**Criativo:** [qual peça]

#### Conjunto de Anúncios: [nome]
- **Audiência:** [descrição detalhada]
- **Faixa etária:** [range]
- **Localização:** [geo]
- **Posicionamentos:** [lista]
- **KPI de sucesso:** [métrica = valor]
- **Threshold de corte:** [critério para pausar]

[repetir para MOFU e BOFU]
```

---

## Output Example

```markdown
## Estrutura de Campanha — Consultores ML + Números Reais — 25/03/2025

### Resumo do Plano
- **Budget total diário recomendado — Conservador:** R$ 80/dia
- **Budget total diário recomendado — Agressivo:** R$ 200/dia
- **Duração inicial:** 14 dias (fase de aprendizado + otimização)
- **Objetivo principal:** Geração de leads qualificados para aplicação de mentoria (BOFU)
- **Benchmark de referência:** CPL esperado R$120-280 (nicho de alta-ticket Brasil, ticket R$10k+)

---

### TOFU — TOFU-consultores-ml-0325
**Objetivo Meta:** Alcance (maximizar pessoas únicas alcançadas)
**Orçamento diário:** R$ 40 (50% do budget conservador)
**Criativo:** Reel "Os 3 números que todo guru de ML esconde de você" (27s)

#### Conjunto de Anúncios: TOFU-interesses-empreendedores-ml
- **Audiência:**
  - Interesses: Mercado Livre, Empreendedorismo, E-commerce, Vendas online, Lojas virtuais
  - Comportamentos: Pequenas empresas (proprietários), Compras online frequentes
  - Exclusões: pessoas que já visitaram a página de mentoria (não desperdiçar TOFU em BOFU)
- **Faixa etária:** 30-65 anos
- **Localização:** Brasil — todas as regiões (sem geo-filtro inicial)
- **Dispositivos:** Mobile only
- **Posicionamentos:** Instagram Reels, Instagram Stories
- **KPI de sucesso:** CPM ≤ R$18, Frequência ≤ 2.5 em 7 dias
- **Threshold de corte:** Pausar se CPM > R$35 após 3 dias ou Frequência > 3.0 em 5 dias

---

### MOFU — MOFU-consultores-ml-0325
**Objetivo Meta:** Engajamento (maximizar interações com o post)
**Orçamento diário:** R$ 24 (30% do budget conservador)
**Criativo:** Carousel "Os 3 números que todo guru de ML esconde de você" (9 slides)

#### Conjunto de Anúncios: MOFU-retargeting-engajamento-60d
- **Audiência:**
  - Retargeting: pessoas que interagiram com o perfil @gabrielcazonatoo nos últimos 60 dias (curtidas, comentários, visualizações de vídeo >50%, visitas ao perfil)
  - Exclusões: leads já capturados (lista de e-mails da mentoria)
- **Faixa etária:** 30-65 anos
- **Localização:** Brasil
- **Dispositivos:** Mobile prioritário + Desktop habilitado
- **Posicionamentos:** Instagram Feed, Instagram Stories
- **KPI de sucesso:** Custo por Engajamento ≤ R$0.80, Taxa de Salvamento ≥ 3%
- **Threshold de corte:** Pausar se Custo por Engajamento > R$2.50 após 5 dias

#### Conjunto de Anúncios: MOFU-lookalike-1pct-engajamento
- **Audiência:**
  - Lookalike 1% baseado na lista de engajadores top (salves + comentários últimos 90 dias)
  - Brasil
- **Faixa etária:** 32-62 anos
- **Posicionamentos:** Instagram Feed, Reels
- **KPI de sucesso:** CPM ≤ R$22, CTR ≥ 1.5%
- **Threshold de corte:** Pausar se CTR < 0.8% após 7 dias

---

### BOFU — BOFU-consultores-ml-0325
**Objetivo Meta:** Tráfego (link clicks para página de aplicação de mentoria)
**Orçamento diário:** R$ 16 (20% do budget conservador)
**Criativo:** Versão adaptada do carousel com último slide modificado para CTA "Quero conhecer a mentoria →"

#### Conjunto de Anúncios: BOFU-retargeting-quente-30d
- **Audiência:**
  - Retargeting: visitantes da página de mentoria nos últimos 30 dias que não converteram
  - + pessoas que assistiram ≥75% de qualquer vídeo de Gabriel nos últimos 30 dias
  - + engajadores de alto valor (comentou ou salvou ≥2 posts nos últimos 14 dias)
- **Faixa etária:** 30-65 anos
- **Localização:** Brasil
- **Posicionamentos:** Instagram Feed, Stories
- **KPI de sucesso:** CPL ≤ R$220, CTR ≥ 2.5%
- **Threshold de corte:** Pausar se CPL > R$450 após 7 dias ou CTR < 1.0% após 3 dias

---

### Versão Budget Agressivo (R$200/dia)
- TOFU: R$100/dia (adicionar 2º conjunto de anúncios com interesses ampliados)
- MOFU: R$60/dia (adicionar lookalike 2% e 3%)
- BOFU: R$40/dia (adicionar 2º conjunto com lookalike de compradores)
```

---

## Quality Criteria

1. **Cobertura das 3 fases do funil**: toda estrutura deve ter TOFU, MOFU e BOFU — campanhas de fase única sem contexto de funil são rejeitadas
2. **Threshold de corte obrigatório**: todo conjunto de anúncios deve ter critério explícito para pausa — campanhas sem threshold sangram budget sem controle
3. **Orçamento proporcional ao ticket**: R$80-200/dia é razoável para ticket de R$10-12k/ano — recomendar orçamentos fora dessa faixa sem justificativa é erro de estratégia

---

## Veto Conditions

1. **Campanha sem audiência de exclusão**: não incluir exclusões básicas (leads já convertidos, visitantes de conversão) é desperdício técnico — toda campanha deve ter exclusões explícitas
2. **Criativo BOFU igual ao TOFU**: usar exatamente o mesmo criativo em todas as fases sem adaptação do CTA é vetado — a mensagem deve ser calibrada para a temperatura da audiência
