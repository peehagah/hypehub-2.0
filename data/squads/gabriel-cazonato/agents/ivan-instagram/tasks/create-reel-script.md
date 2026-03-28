---
task: create-reel-script
order: 3
agent: ivan-instagram
phase: B
input: squads/gabriel-cazonato/output/angles.md + ângulo selecionado
output: squads/gabriel-cazonato/output/instagram-content.md (seção reel)
---

# Task: Criar Script de Reel

## Objetivo
Criar o roteiro completo de um Reel para Instagram com duração de 15 a 30 segundos, seguindo o mesmo ângulo do carousel mas com abordagem nativa de vídeo — gancho imediato, uma ideia central, ritmo rápido e CTA oral.

---

## Process

### Passo 1 — Definir o formato do Reel
Identificar qual dos três estilos se encaixa melhor no ângulo selecionado:

**Estilo A — Talking Head (direto ao ponto):** Gabriel na câmera, sem cortes elaborados, fala direta. Melhor para ângulos de Essência ou Ousadia onde a energia pessoal é o diferencial.

**Estilo B — Tutorial rápido (screen + voz):** Gabriel mostrando algo na tela (planilha, plataforma ML, dados). Melhor para ângulos de Generosidade com dado técnico visual.

**Estilo C — Provocação + gancho de carrossel:** Reel que funciona como trailer do carousel — ativa curiosidade e direciona para "ver mais" ou "veja o carousel nos destaques". Bom para maximizar alcance cruzado.

### Passo 2 — Criar o roteiro segundo a estrutura 3-3-3-3
Dividir os 15-30 segundos em 4 blocos de 3-8 segundos cada:

- **Bloco 1 — Gancho (3-5s):** primeira frase que impede o usuário de passar. Deve funcionar sem som (texto na tela) E com som (fala impactante). Números, contradições ou perguntas diretas.
- **Bloco 2 — Desenvolvimento (8-12s):** a substância. Um único ponto técnico, um dado surpreendente ou um momento de vulnerabilidade. Não tentar dizer tudo — dizer uma coisa muito bem.
- **Bloco 3 — Virada (3-5s):** o insight ou posicionamento que diferencia Gabriel. O momento "ah, entendi" ou "isso me pegou".
- **Bloco 4 — CTA (3-5s):** ação específica. Pode ser "salva esse vídeo", "me conta nos comentários", "link na bio" ou "desliza para ver o carousel completo".

### Passo 3 — Escrever as instruções de produção
Além do roteiro de fala, incluir:
- Sugestão de trilha sonora (nome + referência de mood)
- Orientações de texto na tela (quando aparece, o quê diz)
- Sugestão de cortes ou transições se relevante
- Notas de performance para Gabriel (energia, ritmo, onde pausar)

---

## Output Format

```markdown
## Reel Script — [Título do Ângulo]

**Duração estimada:** [X] segundos
**Estilo:** Talking Head | Tutorial rápido | Provocação + gancho
**Trilha sugerida:** [nome/referência]

### Roteiro

**[0:00-0:04] GANCHO**
[texto na tela]: "[texto]"
[fala]: "[texto exato da fala de Gabriel]"
[nota de produção]: [orientação]

**[0:04-0:17] DESENVOLVIMENTO**
[texto na tela]: "[texto se houver]"
[fala]: "[texto exato]"
[nota de produção]: [orientação]

**[0:17-0:24] VIRADA**
[texto na tela]: "[texto]"
[fala]: "[texto exato]"
[nota de produção]: [orientação]

**[0:24-0:30] CTA**
[texto na tela]: "[texto]"
[fala]: "[texto exato]"
[nota de produção]: [orientação]
```

---

## Output Example

```markdown
## Reel Script — "Os 3 números que todo guru de ML esconde de você"

**Duração estimada:** 27 segundos
**Estilo:** Talking Head
**Trilha sugerida:** trap/hip-hop instrumental leve, sem letra, ritmo moderado (tipo "lo-fi beats" corporativo)

### Roteiro

**[0:00-0:04] GANCHO**
[texto na tela]: "R$10K em 30 DIAS NO ML 🚨"
[fala]: "Sabe aquela promessa de dez mil reais em trinta dias no Mercado Livre? Eu vou te contar o que ninguém fala."
[nota de produção]: Falar rápido, olhar direto na câmera, expressão séria — não sorrir aqui

**[0:04-0:16] DESENVOLVIMENTO**
[texto na tela]: "73% desistem em 6 meses" → "Capital mínimo real: R$8k-15k" → "Lucro real: 45-90 dias"
[fala]: "Setenta e três por cento dos vendedores novos abandonam antes de seis meses. Capital mínimo real é de oito a quinze mil — não quinhentos reais. E o primeiro lucro vem em quarenta e cinco a noventa dias, não trinta."
[nota de produção]: Cada número aparece na tela enquanto é falado. Ritmo cadenciado, pausar levemente após cada dado.

**[0:16-0:22] VIRADA**
[texto na tela]: "O ML funciona. Mas não assim."
[fala]: "O Mercado Livre funciona pra caramba. Mas não do jeito que te contaram."
[nota de produção]: Tom muda — de alerta para sereno/confiante. Pequena pausa antes de "não do jeito que te contaram".

**[0:22-0:27] CTA**
[texto na tela]: "Salva e manda pra quem precisa ver isso 👇"
[fala]: "Salva esse vídeo e manda pra quem você conhece que está pensando em entrar no ML. Pode ser que você salve alguém de um erro caro."
[nota de produção]: Levantar tom ligeiramente, gesto natural com a mão apontando para a câmera
```

---

## Quality Criteria

1. **Gancho nos primeiros 3 segundos**: o Reel deve ser testado com a pergunta "se eu visse isso no feed e tivesse 3 segundos para decidir, continuaria assistindo?" — se a resposta for não, reescrever o bloco 1
2. **Uma ideia central**: o Reel inteiro deve girar em torno de uma única ideia forte — não tentar resumir o carousel inteiro em 30 segundos
3. **CTA conectado**: o CTA deve ser específico e conectado ao conteúdo do Reel — nunca um CTA genérico de "me segue"

---

## Veto Conditions

1. **Reel com mais de 35 segundos**: Reels acima de 35 segundos para este nicho perdem audiência rapidamente — se o roteiro estourar, cortar desenvolvimento
2. **Sem instruções de produção**: roteiro sem notas de tom, ritmo e texto na tela não serve de insumo para Gabriel gravar — a produção não deve depender de adivinhar o que foi pensado
