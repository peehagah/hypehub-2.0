---
type: agent-step
step: "04"
agent: ivan-instagram
execution: inline
phase: A
inputFile:
  - squads/gabriel-cazonato/output/trends-brief.md
  - tema selecionado no checkpoint (step-03)
outputFile: squads/gabriel-cazonato/output/angles.md
---

# Step 04: Ivan Instagram (Fase A) — Geração de Ângulos

## Contexto

Ivan Instagram entra na Fase A — geração de ângulos. A partir do tema selecionado por Pedro no checkpoint anterior, Ivan cria 5 ângulos emocionais e narrativos distintos para o ciclo de conteúdo.

**O que são os ângulos:** direções criativas diferentes para abordar o mesmo tema, cada uma com uma emoção dominante, pilar EGO diferente e gancho específico. Pedro escolhe um ângulo no checkpoint seguinte, e Ivan entra na Fase B para criar o conteúdo completo.

**Método EGO:** todo ângulo deve ser ancorado em pelo menos um pilar:
- **E (Essência):** autenticidade radical, falhas reais de Gabriel
- **G (Generosidade):** conhecimento técnico de alto valor gratuito
- **O (Ousadia):** posicionamentos fortes, afirmações que dividem, números impressionantes

---

## Context Loading

Carregar antes de executar:
- `output/trends-brief.md` — briefing de tendências do Rodrigo
- Tema e direcionamentos selecionados no checkpoint step-03
- `pipeline/data/tone-of-voice.md` — guia de voz de Gabriel
- `pipeline/data/client-brief-gabriel.md` — contexto do cliente

---

## Instruções de Execução

Executar a task `tasks/generate-angles.md`:

1. Absorver o tema selecionado e identificar: emoção do público, pilar EGO natural, objeção a quebrar, transformação possível
2. Gerar 5 ângulos distintos com:
   - Título-gancho memorável (texto real do slide 1 ou primeiros 3 segundos)
   - Pilar EGO dominante
   - Estrutura narrativa (começo → desenvolvimento → fim)
   - Formato preferencial (tipo de carousel, estilo de Reel, formato YouTube)
   - Potencial de engajamento estimado
3. Ranquear os 5 ângulos e incluir recomendação de Ivan com justificativa

Os ângulos devem cobrir os 3 pilares EGO — não usar o mesmo pilar dominante em mais de 2 ângulos.

---

## Output Format

```markdown
# Ângulos — [tema] — [data]

## Tema Central
[1-2 linhas]

## Recomendação de Ivan
Ângulo #[N] — [justificativa em 1 linha]

## Ângulos

### Ângulo 1 — [Título Gancho]
- **Pilar EGO:** [E/G/O]
- **Emoção dominante:** [emoção]
- **Gancho:** "[texto exato]"
- **Estrutura narrativa:** [começa... → desenvolve... → termina...]
- **Formato preferencial:** [carousel tipo + reel tipo + youtube tipo]
- **Potencial de engajamento:** ALTO | MÉDIO | BAIXO
- **Por quê funciona:** [1-2 linhas]

[repetir para ângulos 2-5]
```

---

## Output Example

```markdown
# Ângulos — Polêmica com consultores prometendo R$10k/mês no ML — 25/03/2025

## Tema Central
Indignação crescente com promessas irreais de renda no ML. Oportunidade de posicionamento
de Gabriel como única voz honesta e técnica no nicho.

## Recomendação de Ivan
Ângulo #1 — Maior potencial de share orgânico e posiciona Gabriel como referência de autenticidade.

## Ângulos

### Ângulo 1 — "Eu também já vendi uma mentira sobre ML (sem querer)"
- **Pilar EGO:** E + O
- **Emoção dominante:** Vulnerabilidade → Confiança
- **Gancho:** "Eu errei. E preciso te contar isso."
- **Estrutura narrativa:** Gabriel admite promessa otimista do passado → mostra como aprendeu com isso → apresenta os números reais que alunos sérios atingem
- **Formato preferencial:** carousel confessional 8 slides + reel câmera na mão + youtube vlog 25 min
- **Potencial de engajamento:** ALTO
- **Por quê funciona:** Vulnerabilidade real é rara no nicho — gera identificação profunda

### Ângulo 2 — "Os 3 números que todo guru de ML esconde de você"
- **Pilar EGO:** O + G
- **Emoção dominante:** Indignação → Empoderamento
- **Gancho:** "R$10k em 30 dias. Bonito. Agora vou te mostrar o que não contam."
- **Estrutura narrativa:** Abre com a promessa falsa → expõe 3 métricas omitidas → fecha com caminho real e honesto
- **Formato preferencial:** carousel de dados 10 slides + reel direto 30s + youtube tutorial 35 min
- **Potencial de engajamento:** ALTO
- **Por quê funciona:** Dados concretos em formato de denúncia geram salvamentos e compartilhamentos massivos

### Ângulo 3 — "O que é possível de verdade no ML em 90 dias"
- **Pilar EGO:** G
- **Emoção dominante:** Esperança realista
- **Gancho:** "Sem promessa. Com planilha."
- **Estrutura narrativa:** Contextualiza ceticismo → benchmark real de alunos → plano de 90 dias com metas por fase
- **Formato preferencial:** carousel tutorial 10 slides + reel explicando marco-chave + youtube longo com plano completo
- **Potencial de engajamento:** MÉDIO-ALTO
- **Por quê funciona:** Público em avaliação precisa de âncora realista — converte em leads de mentoria

### Ângulo 4 — "Eu recusei um aluno. Aqui está o motivo."
- **Pilar EGO:** E + O
- **Emoção dominante:** Curiosidade → Respeito
- **Gancho:** "Recusei R$12.000. E não me arrependo."
- **Estrutura narrativa:** Caso real de recusa → critérios que Gabriel usa → perfil ideal de quem tem chance no ML
- **Formato preferencial:** carousel narrativo 8 slides + reel storytelling 28s + youtube vlog 20 min
- **Potencial de engajamento:** ALTO
- **Por quê funciona:** Inversão de expectativa cria curiosidade extrema. Sinaliza que Gabriel é seletivo, não desesperado por venda.

### Ângulo 5 — "Fiz as contas: quanto custa acreditar num guru de ML"
- **Pilar EGO:** G + O
- **Emoção dominante:** Raiva saudável → Alívio
- **Gancho:** "Quanto você já gastou seguindo conselho errado?"
- **Estrutura narrativa:** Cálculo do custo real de estratégia errada por 6 meses → componentes de perda → checklist para avaliar consultores
- **Formato preferencial:** carousel calculadora 9 slides + reel provocativo 20s + youtube comparativo 30 min
- **Potencial de engajamento:** MÉDIO
- **Por quê funciona:** Faz o público calcular sua própria dor — gera comentários de identificação
```

---

## Veto Conditions

1. **Menos de 5 ângulos entregues:** refazer até completar os 5
2. **Ângulos sem gancho concreto (texto real):** o gancho deve ser a frase exata, não uma descrição — "será impactante" não é gancho
3. **Todos os ângulos com o mesmo pilar EGO dominante:** obrigatório ter E, G e O cobertos ao longo dos 5 ângulos

---

## Quality Criteria

- 5 ângulos com ganchos concretos e distintos entre si
- Cobertura dos 3 pilares EGO (E, G, O presentes ao longo dos 5 ângulos)
- Recomendação de Ivan com justificativa específica
- Nenhum ângulo genérico — todos ancorados no nicho ML e na voz de Gabriel
- Formato preferencial específico por ângulo (não genérico)
