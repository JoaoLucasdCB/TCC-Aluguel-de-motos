package InoDev.RideMoto.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
}