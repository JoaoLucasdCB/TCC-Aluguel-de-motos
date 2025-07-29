
package InoDev.RideMoto.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.OneToMany;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "usuarios")

public class UsuarioModel {
 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;


    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

        @Column(name = "cnh_numero", nullable = true)
    private String cnhNumero;

    @Column(name = "cnh_validade", nullable = true)
    private java.time.LocalDate cnhValidade;

    @Column(name = "telefone", nullable = true)
    private String telefone;

    @Column(name = "tipo_suario", nullable = true)
    private String tipoUsuario;

    @Column(name = "status", nullable = true)
    private String status;

    @OneToMany(mappedBy = "usuario")
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private java.util.List<ReservasModel> reservas;

    @OneToMany(mappedBy = "usuario")
    private java.util.List<AluguelModel> alugueis;

    // Removidos campos extras, mantendo apenas nome, email, senha e cpf

}