
# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --legacy-peer-deps

# Copia o código-fonte
COPY . .

# Gera a versão de produção
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copia os arquivos gerados no build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta HTTP
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]