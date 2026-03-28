---
type: agent-step
step: "09"
agent: vera-veredito
execution: inline
inputFile:
  - squads/gabriel-cazonato/output/instagram-content.md
  - squads/gabriel-cazonato/output/youtube-script.md
outputFile: squads/gabriel-cazonato/output/quality-report.md
---

# Step 09: Vera Veredito — Revisão de Qualidade

## Contexto

Vera Veredito faz a revisão completa de todo o conteúdo produzido neste ciclo: carousel Instagram, script de Reel e roteiro YouTube. Ela avalia cada peça contra os critérios de qualidade, o Método EGO e a voz do Gabriel — e emite um veredito final com score e feedback acionável.

Esta etapa roda **inline** — Vera apresenta o relatório diretamente a Pedro antes do checkpoint final.

---

## Context Loading

Carregar antes de executar:
- `output/instagram-content.md` — carousel e script de Reel criados por Ivan
- `output/youtube-script.md` — roteiro YouTube criado por Yuri
- `pipeline/data/quality-criteria.md` — critérios de avaliação
- `pipeline/data/client-brief-gabriel.md` — perfil do cliente
- `pipeline/data/anti-patterns.md` — padrões a evitar
- `pipeline/data/tone-of-voice.md` — referência de voz

---

## Instruções de Execução

Executar as tasks em sequência:

### 1. `tasks/score-content.md`
Avaliar cada peça em 4 dimensões (0–10):
- **Método EGO**: presença e qualidade dos pilares E, G, O
- **Voz de Gabriel**: autenticidade, consistência, "soaria natural vindo do Gabriel"
- **Potencial de engajamento**: gancho, progressão, CTA, retenção estimada
- **Qualidade técnica**: estrutura, formato, completude

### 2. `tasks/generate-feedback.md`
Para cada item com score < 8:
- Identificar exatamente o que está abaixo do esperado
- Fornecer sugestão concreta de correção (não vaga)
- Indicar prioridade: CRÍTICO (bloqueia aprovação) | RECOMENDADO | OPCIONAL

---

## Output Format

### `output/quality-report.md`

```markdown
# Relatório de Qualidade — [data]

## Resumo Executivo
- Carousel: [score médio]/10 — [APPROVE / REJECT / APPROVE_WITH_NOTES]
- Reel Script: [score médio]/10 — [veredito]
- YouTube: [score médio]/10 — [veredito]
- **Veredito Final:** [APPROVE ALL / REJECT + itens]

---

## Carousel: [Título]

### Scores
| Dimensão | Score | Observação |
|---|---|---|
| Método EGO | X/10 | [nota] |
| Voz de Gabriel | X/10 | [nota] |
| Potencial de engajamento | X/10 | [nota] |
| Qualidade técnica | X/10 | [nota] |
| **MÉDIA** | **X/10** | |

### Veredito: APPROVE / REJECT / APPROVE_WITH_NOTES

### Feedback
**[CRÍTICO / RECOMENDADO / OPCIONAL]** [slide/elemento específico]: [o que está errado] → [como corrigir]

---

## Reel Script: [Título]

[mesmo formato]

---

## YouTube: [Título]

[mesmo formato]

---

## Resumo de Ações
- [ ] [ação crítica 1]
- [ ] [ação crítica 2]
- [ ] [ação recomendada 1]
```

---

## Veto Conditions

1. **Score médio < 6 sem feedback acionável:** todo REJECT deve ter correção específica
2. **Veredito sem scores:** obrigatório incluir scores numéricos por dimensão
3. **Feedback vago ("melhorar o tom"):** proibido — feedback deve ter ação concreta

---

## Quality Criteria

- Todos os scores documentados por dimensão
- Cada ponto negativo acompanhado de sugestão concreta
- Veredito final claro (APPROVE / REJECT / APPROVE_WITH_NOTES)
- Ações críticas destacadas para Pedro decidir no checkpoint final
