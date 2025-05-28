package InoDev.RideMoto.Models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios")

public class UsuarioModel {
 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    private String telefone;

    @Column(name = "cnh_numero")
    private String cnhNumero;

    @Column(name = "cnh_validade")
    private LocalDate cnhValidade;

    @Enumerated(EnumType.STRING)
    private StatusUsuario status;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();


    public enum StatusUsuario {
        ATIVO, SUSPENSO, PENDENTE
    }


public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getNome() {
    return nome;
}

public void setNome(String nome) {
    this.nome = nome;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getSenhaHash() {
    return senhaHash;
}

public void setSenhaHash(String senhaHash) {
    this.senhaHash = senhaHash;
}

public String getTelefone() {
    return telefone;
}

public void setTelefone(String telefone) {
    this.telefone = telefone;
}

public String getCnhNumero() {
    return cnhNumero;
}

public void setCnhNumero(String cnhNumero) {
    this.cnhNumero = cnhNumero;
}

public LocalDate getCnhValidade() {
    return cnhValidade;
}

public void setCnhValidade(LocalDate cnhValidade) {
    this.cnhValidade = cnhValidade;
}

public StatusUsuario getStatus() {
    return status;
}

public void setStatus(StatusUsuario status) {
    this.status = status;
}

public LocalDateTime getCriadoEm() {
    return criadoEm;
}

public void setCriadoEm(LocalDateTime criadoEm) {
    this.criadoEm = criadoEm;
}
}