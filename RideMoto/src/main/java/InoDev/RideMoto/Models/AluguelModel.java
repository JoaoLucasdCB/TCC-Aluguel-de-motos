package InoDev.RideMoto.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "aluguel")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class AluguelModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    @ManyToOne
    @JoinColumn(name = "moto_id", nullable = false)
    private MotosModel moto;

    @Column(name = "data_inicio", nullable = false)
    private LocalDateTime inicio;
    
    @Column(name = "data_fim", nullable = false)
    private LocalDateTime fim;

    @Enumerated(EnumType.STRING)
    private StatusAluguel status;

    @Column(name = "valor_total")
    private BigDecimal valorTotal;

    public enum StatusAluguel {
        EM_ANDAMENTO, ATIVO, ENCERRADO, ATRASADO
    }
}


//id_reserva: referência à reserva correspondente




