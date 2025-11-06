# 🚀 DEPLOY PASSO A PASSO - DIGITAL OCEAN

## ✅ CÓDIGO JÁ ESTÁ NO GITHUB!

Repositório: https://github.com/zepedrascarneiro/nucleox-landing

---

## 📋 OPÇÃO MAIS FÁCIL: USAR DROPLET COM UPLOAD MANUAL

### **PASSO 1: Criar Droplet**

1. Acesse: https://cloud.digitalocean.com/droplets
2. Clique em **"Create Droplet"**
3. Configure:
   - **Image:** Ubuntu 24.04 LTS
   - **Plan:** Basic - $4/mês (Regular CPU)
   - **Datacenter:** São Paulo 1 (mais próximo do Brasil)
   - **Authentication:** Password
   - **Digite uma senha forte** (anote!)
   - **Hostname:** `nucleox-server`
4. Clique em **"Create Droplet"**
5. **AGUARDE 1-2 minutos** até o droplet ficar pronto
6. **ANOTE O IP** que aparece (ex: 164.90.123.45)

---

### **PASSO 2: Conectar ao Servidor**

Abra o Terminal no seu Mac e execute:

```bash
ssh root@SEU_IP_AQUI
```

**Exemplo:** `ssh root@164.90.123.45`

- Digite `yes` quando perguntar
- Digite a senha que você criou
- Você vai entrar no servidor! 🎉

---

### **PASSO 3: Instalar Nginx (Servidor Web)**

Cole estes comandos um por vez:

```bash
# 1. Atualizar sistema
apt update && apt upgrade -y

# 2. Instalar Nginx
apt install -y nginx

# 3. Instalar ferramentas SSL
apt install -y certbot python3-certbot-nginx

# 4. Iniciar Nginx
systemctl start nginx
systemctl enable nginx
```

**Teste:** Abra no navegador `http://SEU_IP` → Deve aparecer "Welcome to nginx"!

---

### **PASSO 4: Fazer Upload da Landing Page**

**No seu Mac, abra OUTRO terminal** (deixe o SSH aberto) e execute:

```bash
scp "/Users/josecarneiro/Desktop/NucleoX/landing-page/index.html" root@SEU_IP:/var/www/html/
```

**Exemplo:** `scp "/Users/josecarneiro/Desktop/NucleoX/landing-page/index.html" root@164.90.123.45:/var/www/html/`

Digite a senha quando pedir.

---

### **PASSO 5: Ajustar Permissões**

**Volte ao terminal SSH** (onde você está conectado ao servidor) e execute:

```bash
# Dar permissões corretas
chown -R www-data:www-data /var/www/html
chmod 644 /var/www/html/index.html

# Remover arquivo padrão do Nginx
rm /var/www/html/index.nginx-debian.html
```

---

### **PASSO 6: Testar!**

Abra no navegador: `http://SEU_IP`

✅ **Deve aparecer sua landing page do NUCLEOˣ!**

---

## 🔒 PASSO 7: ADICIONAR DOMÍNIO E SSL (OPCIONAL)

Se você tem um domínio (ex: `seudominio.com.br`):

### **1. Configurar DNS:**

No seu registrador de domínio (Registro.br, GoDaddy, etc):

**Criar registro A:**
- **Tipo:** A
- **Nome:** @ (ou deixe vazio)
- **Valor:** SEU_IP_DO_DROPLET
- **TTL:** 3600

**Criar registro A para www:**
- **Tipo:** A
- **Nome:** www
- **Valor:** SEU_IP_DO_DROPLET
- **TTL:** 3600

**AGUARDE 5-15 minutos** para DNS propagar.

### **2. Configurar Nginx:**

No terminal SSH do servidor:

```bash
nano /etc/nginx/sites-available/default
```

**Apague tudo** (Ctrl+K várias vezes) e **cole isto:**

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

**IMPORTANTE:** Substitua `seudominio.com.br` pelo seu domínio real!

**Salvar:** `Ctrl+X` → `Y` → `Enter`

```bash
# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx
```

### **3. Ativar SSL (HTTPS):**

```bash
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

Vai perguntar:
- **Email:** Digite seu email
- **Termos:** Digite `Y` (sim)
- **Compartilhar email:** Digite `N` (não)

✅ **PRONTO! SSL ativado!**

Agora acesse: `https://seudominio.com.br` 🔒

---

## 🎯 SE DER ERRO:

### **Página não abre:**
```bash
# Ver logs do Nginx
tail -f /var/log/nginx/error.log

# Verificar status
systemctl status nginx
```

### **SSL não funciona:**
```bash
# Verificar se DNS está correto
ping seudominio.com.br

# Se aparecer seu IP, está OK!
# Se não, aguarde mais tempo ou verifique DNS
```

### **Upload falhou:**
```bash
# Verificar se arquivo chegou
ls -la /var/www/html/

# Deve aparecer index.html
```

---

## 💰 CUSTOS:

- **Droplet Basic:** $4/mês
- **SSL (Let's Encrypt):** GRÁTIS
- **Tráfego:** 500GB/mês incluído

---

## 🆘 PRECISA DE AJUDA?

Me chame e eu te ajudo em cada passo!

---

## 🚀 RESULTADO FINAL:

- ✅ Landing page no ar
- ✅ HTTPS ativado (cadeado verde)
- ✅ Domínio personalizado (opcional)
- ✅ Servidor 100% seu

**BOA SORTE! 🎉**
