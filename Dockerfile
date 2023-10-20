# Use uma imagem base leve, como o Nginx
FROM nginx:alpine

# Copie seus arquivos HTML para o diretório padrão do Nginx
COPY . /usr/share/nginx/html
