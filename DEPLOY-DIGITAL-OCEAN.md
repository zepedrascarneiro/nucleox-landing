# 🚀 DEPLOY NA DIGITAL OCEAN - GUIA RÁPIDO

## ✅ LANDING PAGE PRONTA!

O arquivo **ebook-sales-pro.html** está 100% pronto para colocar no ar.

---

## 🌊 OPÇÕES DE DEPLOY NA DIGITAL OCEAN

### **OPÇÃO 1: App Platform (MAIS FÁCIL - RECOMENDADO)** ⭐

#### 1. Criar repositório GitHub (privado ou público)
```bash
cd "/Users/josecarneiro/Desktop/Casa Mar/landing-page"
git init
git add ebook-sales-pro.html
git commit -m "Landing page NUCLEOˣ"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/nucleox-landing.git
git push -u origin main
```

#### 2. No painel Digital Ocean:
1. Acesse: https://cloud.digitalocean.com/apps
2. Clique em **"Create App"**
3. Conecte seu GitHub
4. Selecione o repositório **nucleox-landing**
5. Configure:
   - **Type:** Static Site
   - **Build Command:** (deixe vazio)
   - **Output Directory:** `/`
   - **Index Document:** `ebook-sales-pro.html`
6. Escolha o plano **Starter** (GRÁTIS - 3 sites estáticos)
7. Clique em **"Launch App"**

✅ **Pronto!** URL gerada automaticamente: `https://nucleox-landing-xxxxx.ondigitalocean.app`

#### 3. Domínio personalizado (opcional):
1. No painel do App, vá em **Settings > Domains**
2. Adicione seu domínio (ex: `nucleox.seudominio.com.br`)
3. Configure DNS no seu registrador:
   - **CNAME:** `nucleox` → `nucleox-landing-xxxxx.ondigitalocean.app`
4. SSL automático ativado! 🔒

---

### **OPÇÃO 2: Droplet + Nginx (MAIS CONTROLE)**

#### 1. Criar Droplet:
1. Acesse: https://cloud.digitalocean.com/droplets
2. **Create Droplet**
3. Configure:
   - **Image:** Ubuntu 24.04 LTS
   - **Plan:** Basic ($4/mês)
   - **Datacenter:** São Paulo 1 (melhor latência Brasil)
   - **Authentication:** SSH Key (recomendado) ou senha
4. Clique em **Create Droplet**

#### 2. Conectar via SSH:
```bash
ssh root@SEU_IP_DO_DROPLET
```

#### 3. Instalar Nginx:
```bash
apt update
apt install -y nginx certbot python3-certbot-nginx
```

#### 4. Upload da landing page:
```bash
# No seu Mac (outro terminal):
scp "/Users/josecarneiro/Desktop/Casa Mar/landing-page/ebook-sales-pro.html" root@SEU_IP:/var/www/html/index.html
```

#### 5. Configurar Nginx:
```bash
# No servidor (SSH):
nano /etc/nginx/sites-available/default
```

Cole esta configuração:
```nginx
server {
    listen 80;
    server_name SEU_DOMINIO.com.br;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Salve: `Ctrl+X` → `Y` → `Enter`

#### 6. Reiniciar Nginx:
```bash
systemctl restart nginx
```

#### 7. SSL (HTTPS) gratuito:
```bash
certbot --nginx -d SEU_DOMINIO.com.br
```

✅ **Pronto!** Acesse: `https://SEU_DOMINIO.com.br`

---

### **OPÇÃO 3: Spaces (CDN - SUPER RÁPIDO)** ⚡

#### 1. Criar Space:
1. Acesse: https://cloud.digitalocean.com/spaces
2. **Create Space**
3. Configure:
   - **Datacenter:** NYC3 ou AMS3
   - **Enable CDN:** ✅ SIM
   - **Restrict File Listing:** ✅ SIM
4. Nome do Space: `nucleox-landing`

#### 2. Upload via interface:
1. Entre no Space criado
2. Clique em **"Upload Files"**
3. Arraste `ebook-sales-pro.html`
4. Renomeie para `index.html`
5. Clique com direito → **Manage** → **Make Public**

#### 3. URL pública:
```
https://nucleox-landing.nyc3.cdn.digitaloceanspaces.com/index.html
```

#### 4. Domínio personalizado (opcional):
- Settings → Add Custom Domain
- Configure CNAME no seu DNS

---

## 📋 CHECKLIST ANTES DO DEPLOY

- [x] Landing page sem referências à Mitra
- [x] Assinatura limpa: "Arquiteto do NUCLEOˣ"
- [x] Preço R$ 29,90 com anchoring de R$ 49,90
- [x] CTAs funcionais (#oferta, #comprar)
- [ ] Substituir links dos CTAs pelo link de pagamento (Stripe/Gumroad)
- [ ] Criar imagem OG 1200x630px
- [ ] Configurar analytics (opcional)

---

## 🔗 PRÓXIMO PASSO: PAGAMENTO

Depois do site no ar, você precisa:

1. **Criar conta Stripe** ou **Gumroad**
2. **Configurar produto** R$ 29,90
3. **Gerar Payment Link**
4. **Substituir nos CTAs:**

Abra `ebook-sales-pro.html` e substitua:
```html
<!-- Procure por: -->
href="#comprar"

<!-- Substitua por: -->
href="https://buy.stripe.com/SEU_LINK_AQUI"
```

---

## 💰 CUSTOS DIGITAL OCEAN

| Opção | Custo/mês | Velocidade | SSL | Facilidade |
|-------|-----------|------------|-----|------------|
| **App Platform** | GRÁTIS (3 sites) | ⚡⚡⚡ | ✅ Auto | ⭐⭐⭐⭐⭐ |
| **Droplet** | $4 | ⚡⚡ | ✅ Certbot | ⭐⭐⭐ |
| **Spaces + CDN** | $5 | ⚡⚡⚡⚡ | ✅ Auto | ⭐⭐⭐⭐ |

**Recomendação:** Use **App Platform** (grátis e simples!)

---

## 🆘 TROUBLESHOOTING

### Página não abre:
```bash
# Verificar status Nginx:
systemctl status nginx

# Ver logs:
tail -f /var/log/nginx/error.log
```

### SSL não funciona:
```bash
# Renovar certificado:
certbot renew

# Verificar config:
nginx -t
```

### Upload falhou:
```bash
# Verificar permissões:
chown -R www-data:www-data /var/www/html
chmod 644 /var/www/html/index.html
```

---

## 📞 SUPORTE DIGITAL OCEAN

- Docs: https://docs.digitalocean.com
- Community: https://www.digitalocean.com/community
- Suporte: https://cloud.digitalocean.com/support

---

## ✅ PRONTO PARA LANÇAR! 🚀

Escolha a **Opção 1 (App Platform)** para deploy em 5 minutos!

Boa sorte com o lançamento! 💰
