-- Script para adicionar colunas necessárias para autenticação OAuth
-- Execute este script no seu banco de dados MySQL

ALTER TABLE usuarios 
ADD COLUMN google_id VARCHAR(255) UNIQUE,
ADD COLUMN auth_provider VARCHAR(50),
ADD COLUMN picture_url TEXT;

-- Criar índice para melhor performance
CREATE INDEX idx_google_id ON usuarios(google_id);
CREATE INDEX idx_auth_provider ON usuarios(auth_provider); 