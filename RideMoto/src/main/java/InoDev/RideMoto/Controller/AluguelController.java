package InoDev.RideMoto.Controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import InoDev.RideMoto.Models.MotosModel;
import InoDev.RideMoto.Models.UsuarioModel;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

public class AluguelController {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "moto_id", nullable = false)
    private MotosModel moto;

    @Column(nullable = false)
    private LocalDateTime inicio;

    @Column
    private LocalDateTime fim;

    @Column(nullable = false)
    private String status;

    @Column(name = "valor_total", precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @Column(name = "contrato_pdf")
    private String contratoPdf;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    protected void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}
