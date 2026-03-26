# Anti-Patterns: Influencer Hub

Erros documentados que destroem o desempenho de conteúdo e campanhas.
Todos os agentes do squad devem verificar esta lista antes de entregar qualquer output.

---

## Anti-Padrões de Conteúdo Instagram

### NUNCA FAÇA

1. **Hook genérico ou apresentação**: "Olá pessoal, hoje vou falar sobre..." — causa drop imediato nos primeiros 3 segundos. O algoritmo penaliza queda de retenção precoce reduzindo a distribuição.

2. **Mais de 1 ideia por slide de carrossel**: Sobrecarga cognitiva leva o usuário a parar de deslizar. Cada slide deve comunicar exatamente um conceito com clareza total.

3. **CTA passivo ou genérico**: "Curta se gostou" ou "Se inscreva e ative o sininho" são sinais de conteúdo amador que não geram ação real. CTAs específicos ("Comenta o número do erro que você cometeu") têm até 5x mais interação.

4. **Bloco de texto em legenda sem quebras**: Taxa de leitura cai >60% em legendas sem parágrafos. Máximo 2-3 linhas por parágrafo.

5. **Hashtags no meio do texto**: Interrompe o fluxo de leitura sem nenhum benefício algorítmico. Sempre ao final, 3-5 relevantes.

6. **Watermark do TikTok em Reels do Instagram**: Meta reduz ativamente a distribuição orgânica de conteúdo com marca d'água de concorrente.

7. **Sem identidade visual**: Posts sem padrão de cor, fonte ou estilo não constroem reconhecimento de marca. O usuário não associa o post ao criador quando vê no Explore.

8. **Carrossel com menos de 6 slides**: Perde o benefício algorítmico de re-servir o carrossel para quem não deslizou. Mínimo 7, ideal 8-10.

9. **Thumbnail de Reel com texto >5 palavras**: Ilegível em miniatura mobile. Tela de capa deve ter 1-3 palavras no máximo + visual forte.

10. **Copiar formato idêntico de concorrente direto**: Audiência percebe, engajamento é menor pois não há diferenciação. Analisar referências para inspiração, não cópia.

### SEMPRE FAÇA

1. **Hook nos primeiros 3 segundos visuais**: Seja em Reel (narração + texto na tela) ou carrossel (Slide 1 com título forte), a promessa de valor deve ser imediata.

2. **Design de loop em Reels**: Final do Reel deve conectar visualmente ou narrativamente ao início. Re-assistências são um dos sinais mais fortes para o algoritmo distribuir.

3. **Legenda com hook acima do fold**: Primeiros 125 caracteres devem conter o hook — única parte visível antes de "mais". Se o hook não estiver aqui, a maioria não lerá a legenda.

4. **CTA único e específico por peça**: Nunca dois CTAs conflitantes. Escolha: comentar OU salvar OU compartilhar OU seguir — não todos ao mesmo tempo.

5. **Slide de salvamento**: Todo carrossel educativo deve ter um slide "Salva para não esquecer" ou equivalente. Saves são o sinal de maior valor para o algoritmo de feed.

---

## Anti-Padrões de YouTube

### NUNCA FAÇA

1. **Abertura sem hook** — "Olá, seja bem-vindo ao canal, não esquece de se inscrever..." mata a retenção nos primeiros 30 segundos. O algoritmo usa AVD nos primeiros 30s como sinal forte.

2. **Thumbnail com bordas de fogo, estrelas ou efeitos amadores**: Sinais visuais de clickbait que reduzem a confiança e CTR de audiência qualificada.

3. **Título com mais de 100 caracteres ou menos de 40**: Títulos longos são truncados; muito curtos perdem keywords. Ideal: 50-70 caracteres.

4. **Vídeo sem chapters/timestamps na descrição**: Reduz watch time (usuários saem para buscar a parte que querem) e prejudica o SEO do YouTube.

5. **5 CTAs diferentes no final do vídeo**: "Curte, comenta, compartilha, se inscreve, ativa o sininho, acessa o link..." — o usuário não faz nada. Um CTA principal, máximo dois.

6. **Upload sem consistência de schedule**: O algoritmo penaliza canais com intervalos irregulares. Melhor 1 vídeo/semana consistente do que 3 seguidos e depois 3 semanas de pausa.

### SEMPRE FAÇA

1. **Thumbnail antes do script**: O conceito de thumbnail define o título e o hook. Se não der para criar uma thumbnail compelling, repense o tema.

2. **Spoiler do payoff nos primeiros 30 segundos**: Mostrar o resultado antes do processo mantém o espectador comprometido.

3. **Pattern interrupt a cada 30-60 segundos**: Corte para B-roll, gráfico, zoom, texto na tela, ou mudança de cena. Monotonia causa drop de retenção.

4. **Descrição com hook nos primeiros 2 linhas**: As únicas linhas visíveis antes de "mostrar mais" — devem conter keywords + motivo para assistir.

---

## Anti-Padrões de Tráfego Pago

### NUNCA FAÇA

1. **Escalar budget mais de 30-50% em um dia**: Reinicia a fase de aprendizado do algoritmo Meta, desperdiçando dados acumulados. Aumentar 20-30% máximo a cada 2-3 dias.

2. **Criar novo ad set em vez de duplicar**: Perde dados históricos de otimização. Sempre duplicar o ad set existente e editar o que precisa mudar.

3. **Usar apenas 1 criativo por campanha**: Sem dados comparativos é impossível identificar o que funciona e escalar. Mínimo 3 criativos com hooks diferentes.

4. **Audience <50k pessoas**: CPM elevado, frequência excessiva em poucos dias, saturação rápida. Públicos de teste devem ter mínimo 200k.

5. **Não instalar Pixel + Conversions API (CAPI)**: Sem esses dois, os dados de conversão chegam incompletos e o algoritmo não consegue otimizar corretamente. CAPI é obrigatório desde iOS 14.5.

6. **Interromper campanha antes de 50 eventos de otimização**: O algoritmo Meta precisa de ~50 eventos do objetivo escolhido para sair da fase de aprendizado. Pausar antes disso desperdiça todo o aprendizado.

7. **Rodar objetivo de conversão para audiência fria**: Audiência fria precisa de objetivo de awareness/alcance. Conversão é para retargeting e audiências quentes.

### SEMPRE FAÇA

1. **Testar orgânico antes de impulsionar**: Publicar, aguardar 24-48h de dados orgânicos. Apenas conteúdo com ER >2x a média merece budget pago.

2. **Definir threshold de pausa antes de subir campanha**: CPM máximo aceitável, Hook Rate mínimo, CTR mínimo. Sem critérios pré-definidos, decisões são emocionais e caras.

3. **Usar UTMs em todos os links**: Sem UTM é impossível atribuir vendas ao canal, criativo ou audience correto. Sem atribuição, não há otimização possível.

4. **Trocar criativo quando CTR cair >20%**: Sinal de creative fatigue. Não esperar — substituir proativamente antes de o CPM subir junto.

5. **Registrar resultados de cada teste**: Documentar qual audience, criativo e objetivo gerou qual resultado. Base para decisões futuras e squad memory.

---

## Sinais de Alerta Globais

| Sinal | O que fazer |
|---|---|
| Hook rate de Reel <20% | Reescrever hook — é o único problema |
| Swipe-through rate de carrossel <40% | Slide 1 ou 2 está fraco — revisar |
| CTR de anúncio <1% após R$200 gastos | Pausar ad set, revisar criativo |
| CPM subindo >40% sem aumento de budget | Saturação de audience — expandir segmentação |
| 3 rodadas de revisão no mesmo conteúdo | Escalar para Pedro, não continuar no loop |
