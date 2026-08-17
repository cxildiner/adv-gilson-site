# Site — Gilson Santos Advocacia Trabalhista

Landing page estática de captação. Sem build, sem dependências, sem npm.
Abre direto no navegador e sobe em qualquer hospedagem.

```
site/
├── index.html          página inteira
├── css/
│   ├── tokens.css      cores, fontes e espaçamentos da marca
│   ├── base.css        reset, tipografia, botões, grades
│   └── sections.css    estilos de cada seção
├── js/
│   └── main.js         menu, FAQ, CTA fixo, link do formulário
└── assets/
    ├── brand/          SVGs oficiais da marca (não editar)
    └── img/            fotos do Dr. Gilson (a inserir)
```

---

## O que falta preencher

Está tudo marcado no código. Busque por estes termos:

| Buscar por | Onde | O que é |
|---|---|---|
| `OAB/SP 000.000` | `index.html` (3 lugares) | Número de inscrição real |
| `(12) 0000-0000` | rodapé + JSON-LD | Telefone do escritório |
| `contato@exemplo.com.br` | rodapé | E-mail |
| `[Endereço do escritório]` | rodapé + JSON-LD | Endereço completo |
| `[Espaço para a trajetória` | seção "O advogado" | Formação e experiência |
| `TROQUE AQUI PELA FOTO` | 2 comentários no HTML | Fotos do Dr. Gilson |
| `gilsonsantosadvocacia.com.br` | tag `canonical` + og | Domínio real |

### Fotos

Dois espaços reservados, ambos com instrução em comentário no HTML:

1. **Hero** — retrato do Dr. Gilson, proporção **4:5** (ex. 800 × 1000 px)
2. **Seção "O advogado"** — escritório ou atendimento, mesma proporção

Para inserir, troque o bloco `<div class="portrait__placeholder">…</div>` por:

```html
<img class="portrait__img" src="assets/img/dr-gilson.jpg"
     alt="Dr. Gilson Santos, advogado trabalhista"
     width="800" height="1000">
```

O layout não muda — o espaço já está dimensionado.

> Manual da marca: luz natural, ambiente real. **Não** usar foto de banco de
> imagens como se fosse o advogado, e **não** usar o clichê de braços cruzados
> em fundo escuro. O Provimento 205/2021 também veda ostentação de bens
> (carro, relógio, prédio imponente) na comunicação.

Falta também gerar `assets/img/og-image.jpg` (1200 × 630) — é a miniatura que
aparece quando o link é compartilhado no WhatsApp.

---

## Trocar o link do formulário

O endereço fica no `href` de cada botão, dentro do [index.html](index.html) —
são 6 ocorrências. Use "Localizar e substituir" no editor: procure por
`docs.google.com/forms` e troque a URL inteira.

O link mora no HTML de propósito, e não numa variável do JavaScript. Se ele
dependesse de script, uma falha de carregamento deixaria todos os botões do
site sem destino. Do jeito que está, os CTAs funcionam mesmo sem JavaScript.

Cada botão envia a origem do clique (`header`, `hero-primario`, `meio`,
`final`, `sticky-mobile`, `nav-mobile`) para o `dataLayer` do Google Tag
Manager ou para o `gtag`, caso você instale um deles depois. Assim dá para
saber qual CTA converte mais. Isso sim fica em [js/main.js](js/main.js).

### Regra ao editar

Nada essencial da página pode depender de JavaScript: nem o texto aparecer,
nem os botões terem destino. O script serve só para enfeite e medição —
animação de entrada, menu do celular, acordeão do FAQ e CTA fixo.

---

## Conformidade com a OAB — leia antes de alterar textos

O Provimento nº 205/2021 do CFOAB regula publicidade de advogado. A página foi
escrita dentro dele. **Não introduza** nos textos:

| Proibido | Base |
|---|---|
| Valores, honorários, parcelamento, desconto e **gratuidade** | Art. 3º, I |
| "Consulta grátis", "primeira consulta gratuita", "só paga se ganhar" | Art. 3º, I |
| Promessa ou garantia de resultado ("você vai receber", "garantimos") | Art. 6º |
| Citar valores de indenização ou casos ganhos | Art. 4º, §2º |
| Depoimento de cliente e caso concreto como oferta | Art. 6º |
| "O melhor", "líder", "nº 1", comparação com outros escritórios | Art. 3º, IV |
| "Especialista" sem título registrado | Art. 3º, III |
| Termos mercantis: "contrate", "oferta", "promoção", "pacote" | Art. 2º e 4º |
| Urgência artificial e sensacionalismo | Art. 3º |

Atenção especial: **"análise gratuita" e "consulta grátis" são vedadas** — a
regra alcança referência *direta ou indireta* a gratuidade. Por isso o CTA é
"Conte sua situação", e não "Análise gratuita do seu caso".

Substituições seguras já aplicadas na página:

- "Receba o que é seu" → "Entenda o que a lei prevê no seu caso"
- "Consulta grátis" → "Conte sua situação" / "Você não assume nenhum compromisso"
- "Ganhe sua causa" → "Seu caso é analisado por um advogado"

O rodapé traz o aviso de caráter informativo exigido. Não remova.

Fonte: <https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021>

---

## Conteúdo jurídico citado

Confira com o Dr. Gilson antes de publicar:

- **Prazo**: 2 anos após a saída, 5 anos retroativos (art. 7º, XXIX, CF)
- **Quitação na rescisão**: Súmula 330 do TST
- **Honorários na gratuidade**: ADI 5766 (STF)
- **Motorista de aplicativo**: o texto diz "pode existir vínculo", nunca
  afirma que existe — o Tema 1291 do STF ainda não foi concluído. Manter assim.

---

## Publicar

Não precisa de build. Suba a pasta `site/` inteira.

- **Netlify / Vercel** — arraste a pasta na interface. Leva um minuto.
- **Hostinger / cPanel** — envie o conteúdo para `public_html/` via FTP.
- **GitHub Pages** — commit da pasta e ative Pages nas configurações.

Depois de publicar: cadastre o domínio no Google Search Console e crie o perfil
no Google Meu Negócio. Avaliações do Google são a forma mais segura de prova
social para advogado, porque são conteúdo de terceiro — diferente de depoimento
publicado pelo escritório, que é vedado.

---

## Verificações já feitas

- HTML sem tags abertas ou aninhamento errado
- Dois blocos de dados estruturados (`LegalService` e `FAQPage`) válidos
- Contraste WCAG AA aprovado em toda a página
- Sem rolagem horizontal em 390 px
- Menu mobile abre e fecha pelo próprio botão, por Esc e por clique fora
- Todas as imagens com `alt`; um único `<h1>`; hierarquia de títulos sem saltos
- Zero erros de console
- `prefers-reduced-motion` respeitado (desliga as animações)
- Página testada **com o JavaScript desligado**: todo o conteúdo permanece
  visível e os 6 CTAs continuam levando ao formulário

### Ajuste de marca registrado

O manual define o latão `#C8A34A` para as legendas em caixa alta (*eyebrow*).
Sobre o fundo papel isso rende contraste de **2.04:1**, abaixo do mínimo de
4.5:1 exigido para texto pequeno. Foi criado o token `--latao-texto` (`#7A5E1B`,
5.2:1) **apenas para texto pequeno sobre fundo claro**. Réguas, ícones e botões
seguem com o latão original, e o teto de 10% de área da cor foi mantido.

Isso atende o princípio do próprio manual — "autoridade vem da clareza" e
"o público lê no celular, muitas vezes cansado". Se preferir o latão puro
mesmo assim, troque em `css/tokens.css`.
