# 🔧 CONFIGURAÇÕES E VARIÁVEIS - NUCLEOˣ

## 📋 INFORMAÇÕES DO PROJETO

```
Nome do Projeto: NUCLEOˣ — The Geometry of Thought
Tipo: Landing page de vendas (e-book digital)
Preço: R$ 29,90
Produto: E-book bilíngue (PT-BR + EN) em 3 formatos (PDF, DOCX, HTML)
```

---

## 🌐 CONFIGURAÇÕES DE DOMÍNIO

```
Domínio principal: [PREENCHER - ex: casademar.com.br]
Subdomínio sugerido: nucleox.casademar.com.br
URL final: https://nucleox.casademar.com.br

SSL: Obrigatório (Let's Encrypt gratuito)
Servidor: [PREENCHER - ex: AWS, GoDaddy, Hostinger]
```

---

## 💳 CONFIGURAÇÕES DE PAGAMENTO

### STRIPE (Opção recomendada)

```
URL de criação de conta: https://stripe.com/br

Configurações do Produto:
- Nome: NUCLEOˣ — The Geometry of Thought [E-book]
- Descrição: E-book de 147 páginas + protocolo de 21 dias
- Preço: R$ 29,90 BRL
- Tipo: One-time payment (pagamento único)
- Imagem do produto: [Adicionar logo NUCLEOˣ]

Webhook URL: https://nucleox.seudominio.com.br/webhook
Eventos para escutar:
- checkout.session.completed
- payment_intent.succeeded

Chaves API (guardar em segredo):
- STRIPE_PUBLIC_KEY: pk_live_XXXXXXXXXX
- STRIPE_SECRET_KEY: sk_live_XXXXXXXXXX (NUNCA compartilhar)
```

### GUMROAD (Alternativa rápida)

```
URL de criação: https://gumroad.com

Configurações:
- Product name: NUCLEOˣ — The Geometry of Thought
- Price: R$ 29,90 (ou $5.90 USD se não aceitar BRL)
- Product type: Digital product
- Files: Upload dos 6 arquivos (3 PT + 3 EN)
- Custom domain: Conectar nucleox.seudominio.com.br

URL do produto: https://gumroad.com/l/CODIGO_GERADO
```

---

## 📧 CONFIGURAÇÕES DE E-MAIL

### SendGrid (para envio automático)

```
Criar conta: https://sendgrid.com

API Key: SG.XXXXXXXXXXXXXXXXXXXXXXXXXX

Template do e-mail:
- Subject: ⚛️ Bem-vindo à Sociedade NUCLEOˣ — Seus e-books estão aqui
- From: suporte@seudominio.com.br
- From Name: NUCLEOˣ
- Attachments: 6 arquivos (links ou anexos diretos)

Limite gratuito: 100 e-mails/dia (suficiente para começar)
```

### Alternativa: Gmail SMTP (mais simples)

```
SMTP Server: smtp.gmail.com
Port: 587
Username: seu-email@gmail.com
Password: [senha de app - gerar em conta Google]
TLS: Habilitado
```

---

## 📊 CONFIGURAÇÕES DE ANALYTICS

### Google Analytics 4

```
1. Criar conta: https://analytics.google.com
2. Criar propriedade: "NUCLEOˣ Landing Page"
3. Copiar Measurement ID: G-XXXXXXXXXX

Código para adicionar no HTML (antes do </head>):

<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

Eventos customizados (já preparados no código):
- cta_click (clique em botões)
- scroll_depth (profundidade de scroll)
- time_on_page (tempo na página)
```

### Meta Pixel (Facebook) - Opcional

```
1. Criar em: https://business.facebook.com/events_manager
2. Criar Pixel: NUCLEOˣ Conversions
3. Copiar Pixel ID: XXXXXXXXXXXXXXX

Código para adicionar no HTML (antes do </head>):

<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
  fbq('track', 'ViewContent');
</script>

Eventos de conversão:
- AddToCart (clique no CTA)
- Purchase (pagamento confirmado)
```

---

## 🗂️ ESTRUTURA DE ARQUIVOS NO SERVIDOR

```
/public_html/nucleox/
├── index.html (landing page principal)
├── assets/
│   ├── og-image.png (1200x630px - criar)
│   └── favicon.ico (opcional)
├── ebooks/
│   ├── NUCLEOX-EBOOK-PT.pdf
│   ├── NUCLEOX-EBOOK-PT.docx
│   ├── NUCLEOX-EBOOK-PT.html
│   ├── NUCLEOX-EBOOK-EN.pdf
│   ├── NUCLEOX-EBOOK-EN.docx
│   └── NUCLEOX-EBOOK-EN.html
├── thank-you.html (página pós-compra - criar)
└── webhook/ (se usar Stripe)
    └── index.php ou index.js
```

---

## 🖼️ ASSETS NECESSÁRIOS

### OG Image (Open Graph - para redes sociais)

```
Tamanho: 1200 x 630 pixels
Formato: PNG ou JPG
Conteúdo sugerido:
- Logo NUCLEOˣ (grande, centralizado)
- Texto: "A Geometria do Pensamento"
- Fundo: Branco ou preto minimalista
- Órbitas atômicas sutis (opcional)

Upload: /assets/og-image.png
URL completa: https://nucleox.seudominio.com.br/assets/og-image.png

Adicionar no HTML:
<meta property="og:image" content="https://nucleox.seudominio.com.br/assets/og-image.png">
```

### Favicon (ícone do site)

```
Tamanho: 32 x 32 pixels
Formato: .ico ou .png
Design: Logo NUCLEOˣ simplificado ou apenas o "X"

Upload: /favicon.ico
```

---

## 🔗 LINKS PARA ATUALIZAR NO HTML

### CTAs principais (substituir `#oferta` ou `#comprar`):

```html
<!-- Hero CTA -->
<a href="[STRIPE_PAYMENT_LINK_OU_GUMROAD_LINK]" class="cta-primary">
    Desenhar minha mente agora
</a>

<!-- CTA secundário -->
<a href="#preview" class="cta-secondary">Ver o método</a>

<!-- Oferta CTA -->
<a href="[STRIPE_PAYMENT_LINK_OU_GUMROAD_LINK]" class="cta-primary">
    Entrar na Sociedade NUCLEOˣ →
</a>

<!-- Comunidade CTA -->
<a href="[STRIPE_PAYMENT_LINK_OU_GUMROAD_LINK]" class="cta-primary">
    Quero pensar com estrutura →
</a>

<!-- Fechamento CTA -->
<a href="[STRIPE_PAYMENT_LINK_OU_GUMROAD_LINK]" class="cta-primary">
    Desenhar minha mente agora →
</a>
```

### Links do footer:

```html
<div class="footer-links">
    <a href="/politica-privacidade">Política de Privacidade</a>
    <a href="/termos-servico">Termos de Serviço</a>
    <a href="mailto:suporte@seudominio.com.br">Contato</a>
</div>
```

---

## 🧪 VARIÁVEIS DE TESTE

### Para testar pagamento Stripe:

```
Cartão de teste: 4242 4242 4242 4242
Validade: Qualquer data futura
CVV: Qualquer 3 dígitos
CEP: Qualquer

Resultado: Pagamento aprovado (modo teste)
```

### Para testar webhook:

```
Use Stripe CLI: https://stripe.com/docs/stripe-cli
Comando: stripe listen --forward-to localhost:3000/webhook

Ou use RequestBin para testar: https://requestbin.com
```

---

## 🌍 VARIÁVEIS DE AMBIENTE (.env)

```bash
# Stripe
STRIPE_PUBLIC_KEY=pk_live_XXXXXXXXXX
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXX

# SendGrid
SENDGRID_API_KEY=SG.XXXXXXXXXXXXXXXXXXXXXXXXXX
FROM_EMAIL=suporte@seudominio.com.br
FROM_NAME=NUCLEOˣ

# URLs
BASE_URL=https://nucleox.seudominio.com.br
DOWNLOAD_URL=https://nucleox.seudominio.com.br/ebooks/

# Analytics
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
FB_PIXEL_ID=XXXXXXXXXXXXXXX

# E-books (paths no servidor)
EBOOK_PT_PDF=/ebooks/NUCLEOX-EBOOK-PT.pdf
EBOOK_PT_DOCX=/ebooks/NUCLEOX-EBOOK-PT.docx
EBOOK_PT_HTML=/ebooks/NUCLEOX-EBOOK-PT.html
EBOOK_EN_PDF=/ebooks/NUCLEOX-EBOOK-EN.pdf
EBOOK_EN_DOCX=/ebooks/NUCLEOX-EBOOK-EN.docx
EBOOK_EN_HTML=/ebooks/NUCLEOX-EBOOK-EN.html
```

---

## 📝 TEXTO PARA COPIAR/COLAR

### Descrição do produto (para Stripe/Gumroad):

```
NUCLEOˣ — The Geometry of Thought

E-book de 147 páginas que ensina o sistema de pensamento estruturado usado por mentes exponenciais.

Inclui:
• Sistema completo de 7 pilares (N-Ú-C-L-E-O-X)
• 50+ estudos de neurociência aplicada
• 20+ casos práticos
• Protocolo de implementação de 21 dias
• Versões em Português e Inglês
• 3 formatos: PDF, DOCX, HTML
• Garantia incondicional de 30 dias
```

### Assunto do e-mail de entrega:

```
⚛️ Bem-vindo à Sociedade NUCLEOˣ — Seus e-books estão aqui
```

---

## 🔐 SEGURANÇA

```
✅ HTTPS obrigatório (SSL)
✅ Nunca expor chaves secretas (STRIPE_SECRET_KEY)
✅ Validar webhooks com assinatura
✅ Limitar taxa de requisições (rate limiting)
✅ Backup diário do código
✅ Manter logs de transações
```

---

## 📞 SUPORTE TÉCNICO

```
Stripe Support: https://support.stripe.com
SendGrid Support: https://support.sendgrid.com
Google Analytics Help: https://support.google.com/analytics

Documentação oficial:
- Stripe: https://stripe.com/docs
- SendGrid: https://docs.sendgrid.com
- GA4: https://developers.google.com/analytics
```

---

## ✅ PRÓXIMOS PASSOS

1. [ ] Preencher todas as variáveis marcadas com [PREENCHER]
2. [ ] Criar conta Stripe ou Gumroad
3. [ ] Gerar chaves API
4. [ ] Criar imagem OG (1200x630px)
5. [ ] Configurar domínio e SSL
6. [ ] Upload dos arquivos
7. [ ] Testar pagamento
8. [ ] Lançar 🚀

---

**Última atualização:** 4 de novembro de 2025  
**Versão:** 1.0
