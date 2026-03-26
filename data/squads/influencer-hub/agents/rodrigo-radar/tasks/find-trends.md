---
task: find-trends
order: 1
agent: rodrigo-radar
input: squads/influencer-hub/pipeline/data/research-focus.md
output: raw_trends (internal, passed to rank-insights)
---

# Task: Buscar Tendências no Nicho ML/E-commerce

## Objetivo
Realizar pesquisa ativa na internet para identificar tópicos, discussões, formatos e narrativas que estão em alta no nicho de Mercado Livre e e-commerce brasileiro. O foco é encontrar o que está gerando engajamento agora — não o que era relevante há 3 meses.

---

## Process

### Passo 1 — Ler o brief de foco (research-focus.md)
Antes de qualquer pesquisa, ler o arquivo `research-focus.md` para entender o foco temático desta rodada. O brief pode especificar um tema geral (ex: "precificação no ML"), um formato preferido, ou um evento sazonal (ex: Black Friday, Dia das Mães). A pesquisa deve priorizar o foco informado.

### Passo 2 — Pesquisa em múltiplas fontes
Executar buscas nas seguintes fontes usando web_search e web_fetch:

**a) YouTube** — buscar vídeos recentes (últimos 14 dias) sobre Mercado Livre com mais de 10k views. Anotar título, canal, data e tema central.
  - Queries: "mercado livre 2025 como vender", "mercado livre mudança algoritmo", "como ganhar dinheiro mercado livre", "full mercado livre"

**b) Instagram/TikTok** — buscar Reels/TikToks virais com hashtags do nicho.
  - Hashtags: #mercadolivre, #vendernointernet, #ecommercebrasil, #vendasonline, #empreendedorismo

**c) Grupos e comunidades** — buscar discussões ativas em fóruns, grupos do Facebook (Vendedores Mercado Livre BR), Reddit (r/empreendedorismo) e comunidades no WhatsApp/Telegram que sejam públicas.
  - Queries: "mercado livre reclamação 2025", "nova taxa mercado livre", "problema reputação mercado livre"

**d) Notícias e blog posts** — buscar publicações recentes sobre mudanças no Mercado Livre, e-commerce brasileiro e comportamento do consumidor.
  - Queries: "mercado livre notícia", "ecommerce brasil 2025 tendência", "meli mudança"

**e) Concorrentes de Gabriel** — verificar o que perfis similares (mentores de Mercado Livre no Instagram/YouTube) estão postando com alto engajamento.
  - Perfis de referência do nicho: buscar "mentor mercado livre instagram", "consultor vendas mercado livre youtube"

### Passo 3 — Catalogar achados brutos
Para cada fonte pesquisada, catalogar:
- Tópico identificado
- Fonte e URL (quando disponível)
- Data da publicação/trending
- Volume de engajamento estimado
- Nível de confiança (alto = dado verificado, médio = estimado, baixo = inferido)
- Notas contextuais relevantes

---

## Output Format

```yaml
raw_trends:
  - topic: string
    source: string
    url: string (quando disponível)
    date: string
    engagement_signal: string
    confidence: alto | médio | baixo
    notes: string
```

---

## Output Example

```yaml
raw_trends:
  - topic: "Mudança na política de frete grátis do Mercado Livre para vendedores Clássico"
    source: "YouTube — canal Venda no ML"
    url: "https://youtube.com/watch?v=..."
    date: "2025-03-18"
    engagement_signal: "47k views em 6 dias, 890 comentários"
    confidence: alto
    notes: "Vendedores reclamando do impacto na margem. Muita dúvida sobre como precificar compensando o frete."

  - topic: "Vendedores migrando de Clássico para Full por pressão de competitividade"
    source: "Grupo Facebook — Vendedores Mercado Livre BR"
    url: null
    date: "2025-03-20"
    engagement_signal: "Post com 340 comentários, thread de 5 dias"
    confidence: médio
    notes: "Principal dúvida: custo do Full vs. vantagem do Buy Box. Muitos vendedores de 40-55 anos com medo de mudar."

  - topic: "Nova onda de 'dropshipping nacional' no ML usando fornecedores brasileiros"
    source: "TikTok + Instagram Reels"
    url: null
    date: "2025-03-15"
    engagement_signal: "Múltiplos Reels com 100k-500k views sobre o tema"
    confidence: alto
    notes: "Narrativa de 'dropshipping sem estoque'. Oportunidade de Gabriel contrariar com dados reais de margem."

  - topic: "Polêmica: consultores de ML prometendo R$10k/mês em 30 dias"
    source: "Twitter/X + comentários YouTube"
    url: null
    date: "2025-03-19"
    engagement_signal: "Thread com 1.2k RTs, comentários indignados"
    confidence: alto
    notes: "Ceticismo crescente com promessas irreais. Oportunidade de Ousadia para Gabriel posicionar autenticidade."

  - topic: "Precificação para vencer o Buy Box sem destruir margem"
    source: "YouTube evergreen + pesquisa Google (alto volume)"
    url: "múltiplas fontes"
    date: "evergreen, pico recente"
    engagement_signal: "Termo com buscas crescentes no Google Trends BR"
    confidence: médio
    notes: "Tema técnico evergreen com pico de interesse quando há mudanças de algoritmo. Perfeito para Generosidade."
```

---

## Quality Criteria

1. **Cobertura de fontes**: mínimo de 3 fontes distintas pesquisadas (YouTube, comunidade, notícia/blog)
2. **Recência**: ao menos 3 dos achados devem ser de conteúdo publicado nos últimos 14 dias
3. **Especificidade**: cada achado deve ter informação suficiente para Rodrigo ranquear no próximo passo — não aceitar achados vagos como "vender no ML está em alta"

---

## Veto Conditions

1. **Sem fonte verificável**: não incluir tendências baseadas em sensação ou memória — toda tendência deve ter ao menos uma referência rastreável
2. **Irrelevância para o público**: descartar tópicos que não têm conexão com vendedores brasileiros de 35-60 anos no Mercado Livre (ex: tendências de e-commerce B2B, mercados internacionais sem impacto local)
