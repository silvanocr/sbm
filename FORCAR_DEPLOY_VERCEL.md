# 🔄 Forçar Deploy no Vercel - Passo a Passo

## ⚠️ Site Não Atualizou?

Se o site ainda não atualizou após o push, siga estes passos:

---

## 🔄 Método 1: Redeploy Manual (Recomendado)

1. **Acesse:** https://vercel.com
2. **Login** com sua conta
3. **Abra seu projeto** (sbm ou similar)
4. Vá na aba **"Deployments"**
5. Encontre o **último deploy** (deve estar no topo)
6. Clique nos **3 pontos** (⋯) no canto direito do card do deploy
7. Selecione **"Redeploy"**
8. Confirme clicando em **"Redeploy"** novamente
9. ⏳ **Aguarde 2-5 minutos** para o build completar

---

## 🔍 Método 2: Verificar Status do Deploy

1. No Vercel, vá em **"Deployments"**
2. Verifique se há um deploy **"Building"** ou **"Ready"**
3. Se houver erro, clique no deploy para ver os **"Build Logs"**

---

## 🧹 Método 3: Limpar Cache do Navegador

O navegador pode estar mostrando uma versão em cache:

### Chrome/Edge:
- Pressione: `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
- Ou: `Ctrl + F5`

### Firefox:
- Pressione: `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)

### Safari:
- Pressione: `Cmd + Option + R`

### Modo Anônimo:
- Abra uma **janela anônima/privada**
- Acesse o site novamente

---

## 🔧 Método 4: Verificar Build Logs

Se o deploy falhar:

1. No Vercel: **Deployments** → Clique no deploy com erro
2. Vá em **"Build Logs"**
3. Procure por erros (geralmente em vermelho)
4. Me envie os erros para eu ajudar a corrigir

---

## ✅ Verificar se Código Está no GitHub

Execute no PowerShell:

```powershell
cd c:\sul-brasileiro-motovelocidade
git log --oneline -3
```

Você deve ver commits recentes com as alterações da logo.

---

## 🚀 Método 5: Fazer Push Novamente (Forçar)

Se nada funcionar, faça um commit vazio para forçar:

```powershell
cd c:\sul-brasileiro-motovelocidade
git commit --allow-empty -m "Trigger redeploy"
git push
```

Isso forçará o Vercel a fazer um novo deploy.

---

## 📋 Checklist de Verificação

- [ ] Código está no GitHub? (verifique: https://github.com/silvanocr/sbm)
- [ ] Vercel está conectado ao repositório?
- [ ] Há um deploy em andamento no Vercel?
- [ ] Limpou o cache do navegador?
- [ ] Tentou abrir em modo anônimo?

---

## 🆘 Se Nada Funcionar

1. **Verifique os logs do Vercel** para erros
2. **Teste localmente:** `npm run build` (veja se há erros)
3. **Me envie os erros** que aparecem nos logs

---

**Tente o Método 1 primeiro (Redeploy Manual)! 🚀**
