# ⚡ CHECKLIST RÁPIDO - DESENVOLVEDOR

## 🎯 OBJETIVO
Colocar no ar: nucleox.seudominio.com.br

---

## ✅ FASE 1: BÁSICO (1 dia)
- [ ] Criar subdomínio `nucleox.seudominio.com.br`
- [ ] Ativar SSL (HTTPS)
- [ ] Upload `ebook-sales-pro.html` → renomear para `index.html`
- [ ] Testar em Chrome, Safari, Firefox
- [ ] Testar em mobile (iOS + Android)

---

## ✅ FASE 2: PAGAMENTO (2-3 dias)

### Opção A: STRIPE (Recomendado)
- [ ] Criar conta: https://stripe.com/br
- [ ] Criar produto: R$ 29,90
- [ ] Gerar Payment Link
- [ ] Substituir todos os CTAs por: `href="https://buy.stripe.com/SEU_LINK"`
- [ ] Configurar webhook para entrega

### Opção B: GUMROAD (Mais rápido)
- [ ] Criar conta: https://gumroad.com
- [ ] Upload dos 6 PDFs
- [ ] Preço: R$ 29,90
- [ ] Substituir CTAs por: `href="https://gumroad.com/l/CODIGO"`

---

## ✅ FASE 3: ENTREGA AUTOMÁTICA (1 dia)

### Se STRIPE:
- [ ] Zapier: Stripe → SendGrid
- [ ] Anexar 6 arquivos (3 PT + 3 EN)
- [ ] Template do e-mail (ver `template-email-entrega.html`)

### Se GUMROAD:
- [ ] Upload dos PDFs no próprio Gumroad (já entrega automaticamente)

---

## ✅ FASE 4: ANALYTICS (1 dia)
- [ ] Google Analytics 4: Criar propriedade
- [ ] Copiar código GA4
- [ ] Adicionar antes do `</head>`
- [ ] Testar se está trackando

---

## ✅ FASE 5: TESTES (1 dia)
- [ ] Compra de teste com cartão real
- [ ] Verificar se e-mail chegou
- [ ] Verificar se PDFs abrem
- [ ] Testar em mobile
- [ ] PageSpeed >90

---

## ✅ FASE 6: LANÇAMENTO 🚀
- [ ] Enviar URL final para cliente
- [ ] Enviar login Stripe/Gumroad
- [ ] Enviar login Google Analytics
- [ ] Documentar como editar preço

---

## 📱 CONTATOS IMPORTANTES

**Cliente:** José Felipe Carneiro  
**E-mail:** [PREENCHER]  
**Tel:** [PREENCHER]

---

## 🔗 LINKS ÚTEIS

- Stripe Docs: https://stripe.com/docs
- Gumroad Help: https://help.gumroad.com
- Google Analytics: https://analytics.google.com
- PageSpeed Test: https://pagespeed.web.dev

---

## 💾 ARQUIVOS NECESSÁRIOS

1. ✅ `ebook-sales-pro.html` (landing page)
2. ✅ `BRIEFING-DESENVOLVEDOR.md` (instruções completas)
3. ⚠️ `og-image.png` (criar: 1200x630px com logo)
4. ⚠️ E-books para entrega (6 arquivos na pasta `/ebook/`)

---

## 🚨 IMPORTANTE

- **HTTPS é obrigatório** (Stripe não funciona sem)
- **Testar pagamento com cartão real** antes de lançar
- **Backup** da página antes de qualquer mudança
- **Mobile first** - 70% dos acessos serão mobile

---

**Prazo total:** 7 dias  
**Lançamento:** Dia 8

🚀 **LET'S GO!**
