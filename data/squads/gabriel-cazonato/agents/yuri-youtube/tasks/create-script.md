---
task: create-script
order: 1
agent: yuri-youtube
input: squads/gabriel-cazonato/output/angles.md + tema/ângulo selecionado
output: squads/gabriel-cazonato/output/youtube-content.md (roteiro principal)
---

# Task: Criar Roteiro YouTube Completo

## Objetivo
Criar o roteiro completo de um vídeo para o canal @gabrielcazonato no YouTube, incluindo título SEO-otimizado, conceito de thumbnail, hook dos primeiros 60 segundos, desenvolvimento em 3 atos com open loops e pattern interrupts, e CTA em camadas. Duração alvo: 17-35 minutos para tutoriais, 20-45 minutos para vlogs.

---

## Process

### Passo 1 — Definir título, thumbnail e promessa
Antes de escrever uma linha do roteiro, definir:

**Título:** deve ter palavra-chave de busca + elemento emocional. Estruturas que funcionam bem para Gabriel:
- "[Número] [coisa] que [resultado]" — ex: "Os 3 erros que destroem sua reputação no Mercado Livre"
- "Como [fazer X] no Mercado Livre [em Y tempo / sem Z problema]" — ex: "Como vencer o Buy Box sem destruir sua margem"
- "[Afirmação ousada] — [prova/contexto]" — ex: "Saí do zero a R$80k/mês no ML — o que ninguém te conta"

**Conceito de thumbnail:** descrever o visual em detalhes:
- Expressão facial de Gabriel (surpresa, seriedade, "te conto um segredo")
- Texto na thumbnail (máx. 4 palavras em destaque)
- Elementos visuais de suporte (ícones, dados, cores)

**Promessa central:** em uma frase, o que o espectador vai saber/poder fazer ao final do vídeo que não sabia/podia antes.

### Passo 2 — Roteirizar em 3 Atos com marcações de tempo
Escrever o roteiro completo com marcações de tempo estimado e anotações de produção:

**ATO 1 — ABERTURA (0:00 - ~10% do vídeo):**
- Cold open: começa no meio de uma cena ou revelação, sem introdução
- Hook principal: por que assistir ESTE vídeo AGORA
- Apresentação pessoal mínima (Gabriel não precisa de apresentação longa no próprio canal)
- Loop aberto #1: anunciar algo que será revelado no meio/fim do vídeo

**ATO 2 — DESENVOLVIMENTO (~10% - 85%):**
- Dividir em seções temáticas (futuras chapters)
- Cada seção: contexto → conteúdo técnico → exemplo real / caso pessoal de Gabriel
- Pattern interrupt a cada 4-6 minutos: corte, dado visual, mudança de cena, pergunta direta
- Loop aberto #2 e #3 ao longo do desenvolvimento
- Momento de Essência: Gabriel admite algo difícil ou vulnerável

**ATO 3 — FECHAMENTO (~85% - 100%):**
- Resolução de todos os open loops
- Síntese dos aprendizados (3 pontos máximo)
- CTA de engajamento: pedir comentário com resposta específica
- CTA de conversão: mentoria ou próximo vídeo
- Agradecimento autêntico (não performático)

### Passo 3 — Adicionar notas de produção
Para cada bloco do roteiro, adicionar:
- [CÂMERA]: indicação de ângulo/estilo
- [B-ROLL]: sugestão de imagens de cobertura
- [TELA]: indicação quando mostrar tela do computador
- [IMPROVISO]: blocos onde Gabriel deve falar livremente dentro do tema
- [PAUSA]: onde fazer uma pausa dramática para ênfase

---

## Output Format

```markdown
# Roteiro YouTube — [Título]

## Metadados
- **Título:** [título SEO]
- **Duração estimada:** [X] minutos
- **Formato:** tutorial | vlog | híbrido
- **Thumbnail:** [descrição detalhada]
- **Promessa central:** [frase]

## ATO 1 — ABERTURA [0:00-X:XX]

### Cold Open [0:00-0:30]
[roteiro]

### Hook Principal [0:30-2:00]
[roteiro]

## ATO 2 — DESENVOLVIMENTO [X:XX-X:XX]

### Seção 1: [nome] [X:XX-X:XX]
[roteiro]

[...]

## ATO 3 — FECHAMENTO [X:XX-fim]
[roteiro]
```

---

## Output Example

```markdown
# Roteiro YouTube — Como Vencer o Buy Box no Mercado Livre Sem Destruir Sua Margem

## Metadados
- **Título:** Como Vencer o Buy Box no Mercado Livre Sem Destruir Sua Margem
- **Duração estimada:** 28 minutos
- **Formato:** tutorial com elementos de vlog
- **Thumbnail:** Gabriel com expressão de "segredo revelado", mão na frente da boca. Texto: "BUY BOX REVELADO". Fundo vermelho escuro com ícone do ML ao lado.
- **Promessa central:** O espectador vai entender como o algoritmo do Buy Box funciona e como configurar preço + frete + reputação para vencer sem precisar ser o mais barato.

---

## ATO 1 — ABERTURA [0:00-2:30]

### Cold Open [0:00-0:45]
[CÂMERA: close, tom sério, já no assunto]

"Em 2023, eu perdi o Buy Box em trinta e sete anúncios em um único dia. Trezentos e doze reais de queda de faturamento em vinte e quatro horas. E eu não entendia o porquê."

[PAUSA de 2 segundos]

"Hoje eu vou te explicar tudo que aprendi naquela semana mais difícil da minha operação no Mercado Livre."

[CORTE]

### Hook Principal [0:45-2:30]
[CÂMERA: médio, energia mais alta]
[IMPROVISO] Apresentação do que o vídeo vai cobrir — Gabriel fala livremente sobre a relevância do Buy Box para vendedores em 2025.

[ÂNCORA]: Mencionar que aos 18 minutos vai mostrar a planilha de precificação que usa na prática.

[Loop Aberto #1]: "E antes de fechar o vídeo, vou te contar um erro de precificação que me custou R$8.400 em um único mês. Você provavelmente está cometendo o mesmo erro agora."

---

## ATO 2 — DESENVOLVIMENTO [2:30-24:00]

### Seção 1: O que é o Buy Box e por que importa [2:30-7:00]
[CÂMERA: médio]
[TELA: mostrar exemplo de anúncio no ML com Buy Box destacado]

"O Buy Box é basicamente o botão 'Comprar' no anúncio. Quando você tem mais de um vendedor com o mesmo produto, o Mercado Livre decide quem fica com esse botão. E quem fica com o botão, fica com a venda."

[IMPROVISO: Gabriel explica com as palavras dele, baseado nessa âncora]

[TELA: dados de conversão Buy Box vs. sem Buy Box]
"A diferença de conversão entre ter e não ter o Buy Box no mesmo produto pode ser de setenta a noventa por cento. É a diferença entre vender e não vender."

[Pattern Interrupt — dado visual em tela]: mostrar gráfico de CTR com/sem Buy Box

### Seção 2: Os 5 fatores que o algoritmo considera [7:00-14:00]
[CÂMERA: médio]
[TELA: planilha ou slide com os 5 fatores]

Loop Aberto #2: "O fator número 4 vai te surpreender — e é o que a maioria dos vendedores ignora completamente."

1. Preço (não precisa ser o menor — precisa ser competitivo dentro de uma faixa)
2. Reputação (verde, com histórico sólido)
3. Tipo de envio (Full tem vantagem sobre Clássico)
4. [FATOR SURPRESA]: tempo de resposta a perguntas do comprador — Gabriel explica com exemplo pessoal
5. Estoque disponível (anúncios com estoque crítico perdem posição)

[ESSÊNCIA — momento de vulnerabilidade]:
"Quando eu entendi o fator 4, fiquei com raiva de mim mesmo. Eu estava respondendo perguntas dois dias depois. Achava que não impactava as vendas. Estava errado."

[Pattern Interrupt]: Gabriel vai buscar algo fora de câmera e volta — quebra de ritmo intencional

### Seção 3: A estratégia de precificação sem destruir margem [14:00-21:00]
[CÂMERA: perto do computador]
[TELA: planilha de precificação ao vivo]

"Agora vou te mostrar a planilha que uso com todos os meus alunos de mentoria. Não vou vender essa planilha — ela está aqui, na descrição, de graça."

[IMPROVISO com âncoras]: Gabriel explica a planilha campo por campo, mostrando como calcular margem mínima para competir pelo Buy Box sem operar no prejuízo.

Loop Aberto #3: "Daqui a pouco vou te mostrar um exemplo real com números da minha operação em 2024."

---

## ATO 3 — FECHAMENTO [24:00-28:00]

### Resolução dos Open Loops [24:00-26:30]
[CÂMERA: médio, mais relaxado]

Resolução do Loop #1 — O erro de R$8.400:
"Voltando ao erro que mencionei no início. Eu estava precificando para ganhar o Buy Box em 12 produtos ao mesmo tempo, sem verificar se cada um tinha margem positiva. Resultado: faturamento subiu, lucro despencou. Fiquei 6 semanas corrigindo isso."

[PAUSA]

"O Buy Box não vale nada se você vender no prejuízo para consegui-lo."

### CTA em Camadas [26:30-28:00]
[CÂMERA: close, tom pessoal]

CTA de engajamento: "Me conta nos comentários: você já perdeu o Buy Box e não entendia por quê? Marca o produto na categoria que aconteceu — quero entender o padrão dos vendedores que me assistem."

CTA de conversão: "Se você quer ir mais fundo nisso — estruturar uma operação profissional com acompanhamento semanal — eu tenho a mentoria individual. Link na descrição. São poucas vagas por trimestre, e o processo de seleção começa por lá."

[IMPROVISO]: agradecimento genuíno, menção ao próximo vídeo.
```

---

## Quality Criteria

1. **Promessa cumprida**: o roteiro deve entregar exatamente o que o título promete — nenhum click bait sem sustância no desenvolvimento
2. **3 open loops mínimos**: o espectador deve ter razões específicas para continuar assistindo além do interesse no tema principal
3. **Momento de Essência obrigatório**: ao menos um momento em que Gabriel admite erro, falha ou aprendizado doloroso — é o que diferencia o canal

---

## Veto Conditions

1. **Introdução acima de 3 minutos**: introductions longas destroem retenção no YouTube para este nicho — vetar e recortar
2. **Ausência de exemplo real**: roteiro sem nenhum caso real ou número real de Gabriel é vetado — conteúdo 100% teórico não converte audiência em leads de mentoria
