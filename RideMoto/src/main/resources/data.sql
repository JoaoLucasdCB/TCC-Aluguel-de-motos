INSERT INTO usuarios (nome, email, senha, cpf, tipo_suario, status)
VALUES (
  'Administrador',
  'admin@admin.com',
  'admin123',
  '96999324069',
  'ADMIN',
  'ATIVO'
); 

INSERT INTO localizacao (estado, cidade, endereco_completo, horario_funcionamento) VALUES
('MG', 'Belo Horizonte', 'Av. Afonso Pena, 1000, Centro', 'Seg-Sex 08:00-18:00'),
('SP', 'São Paulo', 'Rua Augusta, 1500, Consolação', 'Seg-Sab 09:00-19:00'),
('RJ', 'Rio de Janeiro', 'Av. Atlântica, 2000, Copacabana', 'Todos os dias 07:00-22:00');

-- Tabela de Usuários
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tipo_usuario VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL
);

-- Tabela de Admins
CREATE TABLE admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL UNIQUE,
    permissoes VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de Motos
CREATE TABLE motos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    cilindrada VARCHAR(20) NOT NULL,
    placa VARCHAR(20) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL,
    ano INT NOT NULL,
    quilometragem INT,
    imagem VARCHAR(255)
);

-- Tabela de Planos
CREATE TABLE planos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome_plano VARCHAR(100) NOT NULL,
    duracao INT NOT NULL,
    beneficios VARCHAR(255) NOT NULL
);

-- Tabela de Relacionamento Plano-Moto (ManyToMany)
CREATE TABLE plano_moto (
    plano_id BIGINT NOT NULL,
    moto_id BIGINT NOT NULL,
    PRIMARY KEY (plano_id, moto_id),
    FOREIGN KEY (plano_id) REFERENCES planos(id),
    FOREIGN KEY (moto_id) REFERENCES motos(id)
);

-- Tabela de Reservas
CREATE TABLE reservas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    moto_id BIGINT NOT NULL,
    plano_id BIGINT NOT NULL,
    data_reserva DATE NOT NULL,
    data_retirada DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (moto_id) REFERENCES motos(id),
    FOREIGN KEY (plano_id) REFERENCES planos(id)
);

-- Tabela de Aluguel
CREATE TABLE aluguel (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reserva_id BIGINT NOT NULL UNIQUE,
    valor_total DECIMAL(10,2),
    usuario_id BIGINT NOT NULL,
    moto_id BIGINT NOT NULL,
    status VARCHAR(20),
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (moto_id) REFERENCES motos(id)
);

-- Tabela de Localização
CREATE TABLE localizacao (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(2) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    endereco_completo VARCHAR(255) NOT NULL,
    horario_funcionamento VARCHAR(100)
);