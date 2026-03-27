---
task: generate-feedback
order: 2
agent: vera-veredito
input: scores internos (output de score-content) + conteúdo completo
output: squads/influencer-hub/output/review-report.md
---

# Task: Gerar Relatório de Feedback Estruturado

## Objetivo
Com base no scorecard produzido na task anterior, gerar o relatório de revisão final com vereditos claros (APPROVE / REJECT / APPROVE_WITH_NOTES) para cada peça, ações corretivas específicas e priorizadas, e um veredito geral do ciclo de conteúdo.

---

## Process

### Passo 1 — Determinar veredito por peça
Com base nos scores e nas verificações binárias de score-content, determinar o veredito de cada peça:

**APPROVE:** Score ≥ 7.5/10 E todas as verificações binárias passaram
**APPROVE_WITH_NOTES:** Score entre 6.0-7.4/10 OU score ≥ 7.5 mas com 1-2 verificações binárias de atenção (não bloqueantes)
**REJECT:** Score < 6.0/10 OU qualquer verificação binária bloqueante falhou

Verificações binárias bloqueantes (REJECT automático se falhar):
- Informação técnica incorreta sobre Mercado Livre
- Voz de Gabriel completamente artificial (score Voz < 5.0)
- Ausência total de Método EGO
- Conteúdo off-brief (completamente diferente do ângulo selecionado)

Verificações binárias de atenção (APPROVE_WITH_NOTES se falhar):
- Slide 1 com gancho fraco (mas não ausente)
- Open loops sem resolução explícita no YouTube
- CTA genérico (mas presente)

### Passo 2 — Priorizar e estruturar ações corretivas
Para cada item de atenção ou rejeição identificado, criar uma ação corretiva com:
- **Prioridade:** BLOCKER (impede publicação) | MAJOR (impacta performance) | MINOR (melhoria incremental)
- **Localização:** onde exatamente está o problema (ex: "carousel slide 7, subtexto")
- **Problema:** o que está errado e por quê
- **Ação:** o que deve ser feito especificamente para corrigir

Ordenar os itens por prioridade: BLOCKER → MAJOR → MINOR.

### Passo 3 — Escrever o veredito geral do ciclo
Após analisar todas as peças individualmente, emitir um veredito geral:
- **CYCLE_APPROVE:** todas as peças aprovadas (com ou sem notas)
- **CYCLE_REJECT:** ao menos uma peça com REJECT — ciclo volta para criação (step-06/07)

Se CYCLE_REJECT, especificar claramente:
- Qual(is) peça(s) precisa(m) ser refeita(s)
- Qual é o problema central que gerou a rejeição
- O que deve ser preservado (não refazer o que está bom)

---

## Output Format

```markdown
# Review Report — [data]

## Veredito Geral: CYCLE_APPROVE | CYCLE_REJECT

[1-2 linhas de contexto sobre o ciclo]

---

## Carousel — [título]
**Veredito:** APPROVE | APPROVE_WITH_NOTES | REJECT
**Score:** X/10

### Pontos Positivos
- [ponto]

### Ações Corretivas
| Prioridade | Localização | Problema | Ação |
|---|---|---|---|
| BLOCKER/MAJOR/MINOR | [onde] | [o quê] | [como corrigir] |

---

## Reel — [título]
[mesma estrutura]

---

## YouTube — [título]
[mesma estrutura]

---

## Instruções para Retrabalho (se CYCLE_REJECT)
[instruções específicas para Ivan e/ou Yuri]
```

---

## Output Example

```markdown
# Review Report — 25/03/2025

## Veredito Geral: CYCLE_APPROVE

Ciclo de alta qualidade. Três peças aprovadas com notas menores que não bloqueiam publicação.
O Método EGO está presente em todas as peças com autenticidade. Ações de MAJOR devem ser
implementadas antes da publicação; ações MINOR ficam a critério de Pedro.

---

## Carousel — "Os 3 números que todo guru de ML esconde de você"
**Veredito:** APPROVE_WITH_NOTES
**Score:** 8.7/10

### Pontos Positivos
- Dado de 73% de desistência no slide 4 é o ponto alto — concreto, impactante, verificável
- Progressão narrativa excelente: cada slide cria micro-curiosidade para o próximo
- CTA duplo no slide 9 (save + DM) é estratégico e conectado ao conteúdo
- Pilar G (Generosidade) excepcional — os 3 números entregam valor técnico real

### Ações Corretivas
| Prioridade | Localização | Problema | Ação |
|---|---|---|---|
| MAJOR | Slide 7 — subtexto | "No início da minha carreira" é vago — o público não consegue calibrar quando foi e se ainda é relevante | Substituir por referência temporal específica: "Em 2020, quando comecei a aceitar alunos..." ou "Antes de 2022, quando não tinha dados suficientes de resultados reais" |
| MINOR | Slide 3 — subtexto | "Informação incompleta" é vago como causa — pode soar passivo | Adicionar dado: "8 em cada 10 consultores omitem pelo menos um desses números em seus materiais de venda" (estimativa, não precisa ser exata — Gabriel pode ajustar) |
| MINOR | Legenda | Hashtags são adequadas mas podem incluir #compraronline para alcance mais amplo | Adicionar #compraronline e #lojavirtual à lista de hashtags |

---

## Reel — "Os 3 números que todo guru de ML esconde de você"
**Veredito:** APPROVE
**Score:** 8.4/10

### Pontos Positivos
- Gancho nos primeiros 4 segundos é excelente — funciona com e sem som
- Ritmo cadenciado dos dados (bloco 2) é perfeito para o público que processa informação auditiva
- CTA de "salva e manda pra quem precisa" é generoso e expande alcance orgânico
- Duração de 27 segundos está no ponto ideal para Reel de dado técnico

### Ações Corretivas
| Prioridade | Localização | Problema | Ação |
|---|---|---|---|
| MINOR | Bloco 3 — nota de produção | "Tom muda de alerta para sereno/confiante" pode confundir Gabriel na gravação | Tornar mais concreto: "Diminuir velocidade da fala, fazer pausa de 1 segundo antes de 'não do jeito que te contaram', leve sorriso no canto da boca" |

---

## YouTube — "Como Vencer o Buy Box no Mercado Livre Sem Destruir Sua Margem"
**Veredito:** APPROVE_WITH_NOTES
**Score:** 8.3/10

### Pontos Positivos
- Estrutura de 3 atos exemplar: cold open forte, desenvolvimento denso, fechamento emocional
- Momento de Essência (erro R$8.400) é autêntico e específico — exatamente o nível de vulnerabilidade que o público de Gabriel valoriza
- 3 open loops bem distribuídos e todos resolvidos no Ato 3
- Planilha ao vivo na Seção 3 é excelente âncora de Generosidade — vai gerar saves massivos

### Ações Corretivas
| Prioridade | Localização | Problema | Ação |
|---|---|---|---|
| MAJOR | Seção 2 (7:00-14:00) — Fator 4 | Seção tem 7 minutos contínuos sem pattern interrupt explícito marcado | Inserir um pattern interrupt entre o Fator 2 e o Fator 3: uma pergunta direta para câmera ("Você já verificou esse indicador no seu painel?") ou um B-ROLL de tela mostrando onde encontrar a métrica |
| MAJOR | Timestamps/Chapters | Seção 3 está marcada como "14:00-21:00" mas dentro do roteiro há uma sub-seção de exemplo real que merece chapter próprio | Adicionar chapter "21:00 — Exemplo Real: Minha Operação 2024" para facilitar navegação por espectadores que voltam ao vídeo |
| MINOR | Pinned Comment | Pergunta de engajamento ("marca o produto na categoria") pode ser confusa — pede duas informações ao mesmo tempo | Simplificar: "Me conta nos comentários: você já perdeu o Buy Box? Em qual categoria?" — uma pergunta direta gera mais respostas |

---

## Instruções para Retrabalho
N/A — veredito CYCLE_APPROVE. Implementar ações MAJOR antes de publicar.
Ações MINOR ficam a critério de Pedro/Gabriel.
```

---

## Quality Criteria

1. **Ação corretiva específica e executável**: cada ação corretiva deve ser específica o suficiente para ser executada sem dúvida — "melhorar o gancho" não é ação; "substituir o headline do slide 1 por um número específico do ML, como '73% dos vendedores fazem isso errado'" é ação
2. **Separação clara de prioridade**: BLOCKER, MAJOR e MINOR devem ser tratados diferentemente — BLOCKER impede publicação, MAJOR deve ser corrigido antes de publicar, MINOR é opcional
3. **Veredito geral coerente com os individuais**: se todas as peças são APPROVE ou APPROVE_WITH_NOTES, o veredito geral deve ser CYCLE_APPROVE — inconsistência entre individuais e geral é erro de revisão

---

## Veto Conditions

1. **APPROVE sem pontos positivos**: qualquer peça aprovada deve ter pelo menos 2 pontos positivos documentados — aprovação sem reconhecimento do que funcionou não é feedback completo
2. **CYCLE_REJECT sem instrução de retrabalho**: se o veredito geral é REJECT, a seção de instruções para retrabalho é obrigatória — sem ela, Ivan e Yuri não sabem o que refazer
