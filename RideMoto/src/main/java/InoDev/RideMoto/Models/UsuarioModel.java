
package InoDev.RideMoto.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "google_id", nullable = true, unique = true)
    private String googleId;

    @Column(name = "auth_provider", nullable = true)
    private String authProvider;

    @Column(name = "picture_url", nullable = true)
    private String pictureUrl;

    @OneToMany(mappedBy = "usuario")
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private java.util.List<ReservasModel> reservas;

    @OneToMany(mappedBy = "usuario")
    private java.util.List<AluguelModel> alugueis;

    // Removidos campos extras, mantendo apenas nome, email, senha e cpf

}