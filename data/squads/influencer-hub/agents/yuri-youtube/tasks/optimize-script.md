---
task: optimize-script
order: 2
agent: yuri-youtube
input: squads/influencer-hub/output/youtube-content.md (roteiro principal)
output: squads/influencer-hub/output/youtube-content.md (seção de metadados SEO)
---

# Task: Otimizar Roteiro para SEO e Plataforma YouTube

## Objetivo
Adicionar ao roteiro completo todos os metadados necessários para performance no YouTube: título final otimizado com pesquisa de palavras-chave, descrição do vídeo, chapters (timestamps), tags e instruções de pinned comment. Esta task é executada após o roteiro principal estar aprovado.

---

## Process

### Passo 1 — Pesquisa de palavras-chave
Usar web_search para verificar volume e competitividade de palavras-chave relacionadas ao tema do vídeo:

**Queries para pesquisar:**
- "[tema principal] mercado livre" — volume de busca
- "[tema principal] como fazer" — intenção de busca
- "[tema principal] 2025" — tendência temporal
- Variações long-tail: "[tema + público]" ex: "buy box mercado livre como vencer"

Identificar:
- Palavra-chave principal (deve estar no título)
- 2-3 palavras-chave secundárias (para título alternativo e descrição)
- Palavras-chave de cauda longa para as tags

### Passo 2 — Otimizar título final
Com base na pesquisa, criar 3 opções de título:
- **Opção A (SEO máximo):** prioriza palavra-chave, mesmo que menos "emocional"
- **Opção B (Engajamento máximo):** prioriza o gancho emocional, keyword em posição secundária
- **Opção C (Equilibrado):** combina keyword forte + elemento emocional/curioso

Recomendar a melhor opção para o momento (se o vídeo é para novo público, SEO importa mais; se é para audiência fiel, engajamento importa mais).

### Passo 3 — Escrever descrição completa
Criar descrição YouTube de 3 partes:

**Parte 1 — Gancho (primeiras 2 linhas):** aparece antes do "ver mais". Deve reforçar a promessa do título e conter a keyword principal.

**Parte 2 — Detalhamento do conteúdo:** resumo do que o espectador vai aprender, em tópicos. Inclui keywords secundárias naturalmente.

**Parte 3 — Links e informações:** links para materiais mencionados, link da mentoria, redes sociais, disclaimer se necessário.

### Passo 4 — Gerar chapters (timestamps)
Com base no roteiro criado na task anterior, criar timestamps precisos para cada seção:
- Cada chapter deve ter um título curto e descritivo (máx. 30 caracteres)
- O primeiro chapter deve ser 0:00 com o nome do vídeo ou "Introdução"
- Chapters devem refletir a estrutura real do roteiro

### Passo 5 — Criar lista de tags e pinned comment
**Tags (20-30 tags):** mistura de palavras-chave exatas, variações e tags de canal/marca.

**Pinned comment:** comentário fixado que Gabriel deve postar imediatamente após publicação, com:
- Resumo do conteúdo principal em 2-3 linhas
- Link para recurso mencionado no vídeo
- Pergunta para engajamento

---

## Output Format

```markdown
## Metadados SEO — [título do vídeo]

### Pesquisa de Palavras-Chave
- **Keyword principal:** [palavra]
- **Keywords secundárias:** [lista]
- **Long-tail selecionadas:** [lista]

### Títulos — Opções
- **Opção A (SEO):** [título]
- **Opção B (Engajamento):** [título]
- **Opção C (Equilibrado):** [título]
- **Recomendação:** Opção [X] — [justificativa]

### Descrição Completa
[texto completo da descrição]

### Chapters (Timestamps)
0:00 — [nome]
X:XX — [nome]
[...]

### Tags
[lista de tags separadas por vírgula]

### Pinned Comment
[texto do comentário fixado]
```

---

## Output Example

```markdown
## Metadados SEO — Como Vencer o Buy Box no Mercado Livre Sem Destruir Sua Margem

### Pesquisa de Palavras-Chave
- **Keyword principal:** "buy box mercado livre"
- **Keywords secundárias:** "como vencer buy box ml", "precificação mercado livre", "algoritmo mercado livre"
- **Long-tail selecionadas:** "buy box mercado livre como funciona 2025", "como não perder o buy box mercado livre"

### Títulos — Opções
- **Opção A (SEO):** Buy Box Mercado Livre: Como Vencer Sem Ser o Mais Barato
- **Opção B (Engajamento):** O Segredo do Buy Box que Derrubou Meu Faturamento em R$312 em 24h
- **Opção C (Equilibrado):** Como Vencer o Buy Box no Mercado Livre Sem Destruir Sua Margem
- **Recomendação:** Opção A — o canal está em fase de crescimento orgânico, SEO tem mais impacto que engajamento de audiência já fidelizada

### Descrição Completa
Você sabe como funciona o Buy Box do Mercado Livre — e por que perder ele pode destruir seu faturamento em horas?

Nesse vídeo eu explico o algoritmo completo por trás do Buy Box, os 5 fatores que o ML considera (incluindo um que a maioria dos vendedores ignora), e a estratégia de precificação que uso com os meus alunos de mentoria para vencer o Buy Box sem operar no prejuízo.

📌 O que você vai aprender:
• Como o algoritmo do Buy Box realmente funciona em 2025
• Os 5 fatores de ranqueamento (e qual a maioria ignora)
• Como precificar competitivamente sem destruir sua margem
• O erro que me custou R$8.400 em um mês — e como evitar
• A planilha de precificação que uso na minha operação

📥 Planilha de precificação grátis: [link]
🎯 Mentoria Individual Gabriel Cazonato: [link]

📱 Instagram: @gabrielcazonatoo
▶️ Mais vídeos sobre Mercado Livre: [link playlist]

---
Este vídeo é para fins educacionais. Resultados individuais variam conforme produto, capital, dedicação e contexto de mercado.

### Chapters (Timestamps)
0:00 — Intro: Perdi R$312 em 24h por causa do Buy Box
0:45 — O que esse vídeo vai cobrir
2:30 — O que é o Buy Box e por que importa
7:00 — Os 5 fatores do algoritmo
14:00 — Estratégia de precificação (planilha ao vivo)
21:00 — Exemplo real: minha operação 2024
24:00 — O erro de R$8.400 (resolução)
26:30 — CTAs e próximos passos

### Tags
buy box mercado livre, como vencer buy box, precificação mercado livre, algoritmo mercado livre, mercado livre 2025, como vender no mercado livre, buy box ml, mercado livre full, gabriel cazonato, mentoria mercado livre, vender no ml, ecommerce brasil, mercado livre para iniciantes, como ganhar dinheiro mercado livre, reputação mercado livre, mercado livre clássico, mercado livre anuncio, frete grátis mercado livre, lucro mercado livre, operação mercado livre

### Pinned Comment
📌 RECURSOS DESTE VÍDEO:

Planilha de precificação para Buy Box (grátis): [link]

Se você perdeu o Buy Box recentemente, me conta aqui nos comentários em qual categoria aconteceu — estou mapeando os padrões mais comuns em 2025.

🎯 Quer mentoria individual? Processo seletivo: [link]
```

---

## Quality Criteria

1. **Keyword no título**: a keyword principal identificada deve aparecer no título recomendado — não apenas na descrição
2. **Chapters precisos**: os timestamps devem refletir o roteiro real — não podem ser genéricos ou desalinhados com a estrutura do vídeo
3. **Pinned comment com pergunta específica**: o comentário fixado deve ter uma pergunta que gere respostas específicas (não "o que acharam?") — comentários específicos aumentam engajamento da seção

---

## Veto Conditions

1. **Keyword stuffing na descrição**: descrição com repetição forçada de keywords é vetada — o YouTube penaliza spam de keywords e o público abandona leituras artificiais
2. **Chapters sem nome descritivo**: timestamps com nomes vagos ("parte 1", "continuação") são vetados — chapters devem funcionar como índice navegável do vídeo
