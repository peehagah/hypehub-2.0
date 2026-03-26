---
task: create-carousel
order: 2
agent: ivan-instagram
phase: B
input: squads/influencer-hub/output/angles.md + ângulo selecionado no checkpoint
output: squads/influencer-hub/output/instagram-content.md (seção carousel)
---

# Task: Criar Carousel Completo

## Objetivo
Criar o roteiro completo de um carousel para Instagram com 8-10 slides, seguindo o ângulo selecionado, a voz de Gabriel Cazonato e os três pilares do Método EGO. O carousel deve ser pronto para passagem ao template HTML (task render-slides).

---

## Process

### Passo 1 — Internalizar o ângulo selecionado
Ler o ângulo escolhido no checkpoint com atenção especial ao:
- Gancho exato definido no ângulo (usar ou evoluir a partir dele no slide 1)
- Pilar EGO dominante (determina a emoção central)
- Estrutura narrativa (começo → meio → fim)
- Público específico que esse ângulo ativa

Antes de criar, definir internamente: "qual é a UMA ideia que o leitor deve sair tendo entendido?" Toda a progressão deve servir essa ideia central.

### Passo 2 — Criar slide por slide
Criar cada slide com:
- **Headline** (máx. 8 palavras): o texto principal, grande, que o algoritmo mostra na visualização
- **Subtexto** (máx. 20 palavras): detalhamento ou prova do headline
- **Visual sugerido**: descrição do que deve aparecer visualmente no slide (ícone, dado, gráfico, foto)
- **Intenção narrativa**: por que este slide existe na progressão

Estrutura obrigatória:
- **Slide 1 (Gancho):** parar o scroll. Usar contradição, número chocante, pergunta ou afirmação ousada.
- **Slides 2-3 (Problema/Contexto):** aprofundar a dor ou o contexto que torna o tema relevante agora.
- **Slides 4-7 (Desenvolvimento):** o valor real — técnico, honesto, específico. Cada slide = uma ideia.
- **Slide 8-9 (Virada/Solução):** o momento EGO — onde Essência, Generosidade ou Ousadia brilha mais.
- **Último slide (CTA):** ação específica conectada ao conteúdo.

### Passo 3 — Escrever a legenda
Criar a legenda completa do post (máx. 2200 caracteres):
- Primeira linha: reforça o gancho do slide 1 (aparece antes do "ver mais")
- Corpo: complementa o carousel com contexto ou bastidores
- Hashtags: 5-10 hashtags relevantes no nicho (não spam)
- CTA da legenda: pode ser diferente do CTA do último slide

---

## Output Format

```markdown
## Carousel — [Título do Ângulo]

### Slide 1 — Gancho
**Headline:** [texto]
**Subtexto:** [texto]
**Visual:** [descrição]
**Intenção:** [por que]

[... repetir para cada slide ...]

### Legenda
[texto completo da legenda]
[hashtags]
```

---

## Output Example

```markdown
## Carousel — "Os 3 números que todo guru de ML esconde de você"

### Slide 1 — Gancho
**Headline:** "R$10k em 30 dias no ML. A mentira que está te custando caro."
**Subtexto:** Esses 3 números que ninguém mostra mudam tudo.
**Visual:** Fundo escuro, texto em branco + vermelho, emoji de alerta
**Intenção:** Parar o scroll com contradição + promessa de exposição

### Slide 2 — Contexto (Problema)
**Headline:** "Todo mês um novo guru surge com essa promessa."
**Subtexto:** E todo mês mais gente entra no ML sem preparo, perde dinheiro e desiste.
**Visual:** Print estilizado de anúncio genérico de "curso de ML"
**Intenção:** Validar a dor do leitor — ele já viu isso, já desconfiou

### Slide 3 — Amplificação do Problema
**Headline:** "O problema não é o Mercado Livre."
**Subtexto:** É a informação incompleta que te faz tomar decisões erradas.
**Visual:** Gráfico de funil mostrando queda de 100% entrada → 20% sucesso
**Intenção:** Transferir a causa do problema para informação, não para a plataforma

### Slide 4 — Número 1 (G — Generosidade)
**Headline:** "Taxa de desistência: 73% em 6 meses."
**Subtexto:** De cada 10 vendedores novos no ML, 7 abandonam antes de 6 meses.
**Visual:** Ícone de 10 pessoas, 7 delas em cinza/riscadas
**Intenção:** Dado chocante mas real — gera reflexão e saves

### Slide 5 — Número 2
**Headline:** "Capital mínimo real: R$8.000 a R$15.000."
**Subtexto:** Não R$500. Para operar com estoque próprio e margem saudável.
**Visual:** Ícone de carteira com valor
**Intenção:** Quebrar o mito de "comece com R$200"

### Slide 6 — Número 3
**Headline:** "Tempo real até o primeiro lucro: 45 a 90 dias."
**Subtexto:** Não 30. E isso com produto validado, operação certa e sem erro grave.
**Visual:** Calendário com marcação de 45-90 dias
**Intenção:** Calibrar expectativa temporal realista

### Slide 7 — Essência (E)
**Headline:** "Eu já vendi essa ilusão também."
**Subtexto:** No início da minha carreira, prometia R$5k em 45 dias. Errei. Não faço mais isso.
**Visual:** Foto de Gabriel olhando diretamente para câmera, expressão séria
**Intenção:** Momento de Essência — vulnerabilidade que gera confiança máxima

### Slide 8 — Solução / Ousadia (O)
**Headline:** "Quem promete fácil, está mentindo ou não sabe o que faz."
**Subtexto:** O ML funciona. Mas exige operação séria, capital adequado e pelo menos 90 dias de foco.
**Visual:** Contraste visual: ícone de guru vs. ícone de profissional sério
**Intenção:** Posicionamento ousado que divide opiniões e gera comentários

### Slide 9 — CTA
**Headline:** "Salva esse post. Mostre pra quem está pensando em entrar no ML."
**Subtexto:** Ou me manda uma mensagem — te conto o que eu precisaria saber antes de começar.
**Visual:** Arrow apontando para o botão de salvar
**Intenção:** CTA duplo: save (alcance) + DM (lead)

### Legenda
A promessa de R$10k em 30 dias no Mercado Livre virou quase um meme — mas ainda tem destruído a vida financeira de muita gente séria que acreditou.

Nesse carousel eu mostro os 3 números que a maioria dos consultores omite quando te vendem essa ideia. Não porque o ML é ruim — é uma das melhores plataformas para construir renda real no Brasil. Mas porque omitir esses dados é desonesto com quem está tomando uma decisão importante.

Se você está avaliando entrar no ML, lê esse post antes de qualquer outra coisa.

#mercadolivre #vendernomercadolivre #ecommercebrasil #empreendedorismo #vendasonline #mlvendedor #negocioonline #rendareal #mercadolivrevendedor #empreender
```

---

## Quality Criteria

1. **Progressão narrativa**: cada slide deve criar curiosidade para o próximo — testar mentalmente se parar no slide N deixa o leitor querendo continuar
2. **Método EGO verificado**: ao menos um slide de Essência (vulnerabilidade), um de Generosidade (dado técnico) e um de Ousadia (posicionamento forte)
3. **CTA específico**: o último slide deve ter uma ação clara e conectada ao conteúdo — nunca "me siga" genérico

---

## Veto Conditions

1. **Carousel com menos de 8 slides**: qualquer carousel com menos de 8 slides sem justificativa clara é vetado — profundidade é o diferencial de Gabriel
2. **Ausência de dado técnico**: se o carousel não tem nenhum dado, número ou técnica específica do Mercado Livre, é vetado — conteúdo sem substância técnica não performa com o público de Gabriel
