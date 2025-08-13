package InoDev.RideMoto.Models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import java.time.LocalDate;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "reservas")
public class ReservasModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Removido campo dataInicio

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private UsuarioModel usuario;

    @ManyToOne
    @JoinColumn(name = "moto_id", nullable = false)
    private MotosModel moto;

    @ManyToOne
    @JoinColumn(name = "plano_id", nullable = false)
    @JsonBackReference
    private PlanosModel plano;

    @Column(name = "data_reserva", nullable = false)
    private LocalDate dataReserva;

    @Column(name = "data_retirada", nullable = false)
    private LocalDate dataRetirada;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusReserva status;


    @ManyToOne
    @JoinColumn(name = "local_retirada_id", nullable = false)
    private LocalizacaoModel localRetirada;

    @OneToOne(mappedBy = "reserva")
    private AluguelModel aluguel;

    public enum StatusReserva {
        PENDENTE, CONFIRMADA, CONCLUIDA, CANCELADA
    }
}