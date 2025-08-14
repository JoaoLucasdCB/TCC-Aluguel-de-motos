--Dados para o banco de dados RideMoto
INSERT INTO usuarios (id, cnh_numero, cnh_validade, cpf, email, nome, senha, status, telefone, tipo_suario, tipo_usuario) VALUES
(8, NULL, NULL, '96999324069', 'adm@admin.com', 'Administrador', 'admin123', 'ATIVO', '31993289423', 'admin', NULL),
(9, '85242089926', NULL, '51874331057', 'bra@bra.com', 'Bernardo', '123456', 'ATIVO', '(65) 87777-7708', 'cliente', NULL),
(10, '85242089926', NULL, '71071057014', 'jajao@jajao.com', 'Joao Fedor', '123456', 'ATIVO', '(34) 65786-9090', 'cliente', NULL);



INSERT INTO motos (id, cilindrada, imagem, marca, modelo, nome, placa, quilometragem, status, ano, data_fabricacao, preco) VALUES
(15, '160', 'https://motociclismoonline.com.br/wp-content/uploads/2020/10/nxr-160-bros-vermelha-1.png', 'Honda', 'Bros 160', 'Honda Nxr Bros 160', 'HBM0840', 43312, 'DISPONIVEL', 2020, NULL, NULL),
(16, '190', 'https://www.honda.com.br/motos/sites/hda/files/2025-04/Imagem%20Home%20Moto%20Honda%20XRE%20190%20%20Azul%20Met%C3%A1lico%20%E2%80%93%20Mat%20Noturno%20Blue%20Metallic.webp', 'Honda', 'Xre 190', 'Honda Xre 190', 'HGC1090', 23044, 'DISPONIVEL', 2023, NULL, NULL),
(17, '160', 'https://www.honda.com.br/motos/sites/hda/files/2024-10/imagem-home-honda-cg-160-titan-preto.webp', 'Honda', 'CG 160', 'Honda CG 160', 'OLT212', 45789, 'DISPONIVEL', 2023, NULL, NULL);



INSERT INTO planos (id, beneficios, duracao, nome_plano) VALUES
(7, 'Ideal para viagens rápidas, Sem compromisso, Seguro incluso, Suporte 24h', 1, 'Diário'),
(8, 'Economia de 28%, Perfeito para férias, Seguro incluso, Suporte 24h', 7, 'Semanal'),
(9, 'Economia de 50%, Ideal para trabalho, Seguro incluso, Suporte 24h', 30, 'Mensal');



INSERT INTO localizacao (estado, cidade, endereco_completo, horario_funcionamento) VALUES
('MG', 'Belo Horizonte', 'Av. Afonso Pena, 1000, Centro', 'Seg-Sex 08:00-18:00'),
('SP', 'São Paulo', 'Rua Augusta, 1500, Consolação', 'Seg-Sab 09:00-19:00'),
('RJ', 'Rio de Janeiro', 'Av. Atlântica, 2000, Copacabana', 'Todos os dias 07:00-22:00');



--Banco de dados 
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tipo_suario VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    cnh_numero VARCHAR(20),
    cnh_validade DATE,
    tipo_usuario VARCHAR(20)
);

CREATE TABLE admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL UNIQUE,
    permissoes VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

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
    imagem VARCHAR(255),
    data_fabricacao DATE,
    preco DECIMAL(10,2)
);

CREATE TABLE planos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome_plano VARCHAR(100) NOT NULL,
    duracao INT NOT NULL,
    beneficios VARCHAR(255) NOT NULL
);

CREATE TABLE plano_moto (
    plano_id BIGINT NOT NULL,
    moto_id BIGINT NOT NULL,
    PRIMARY KEY (plano_id, moto_id),
    FOREIGN KEY (plano_id) REFERENCES planos(id),
    FOREIGN KEY (moto_id) REFERENCES motos(id)
);

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

CREATE TABLE localizacao (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(2) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    endereco_completo VARCHAR(255) NOT NULL,
    horario_funcionamento VARCHAR(100)
);