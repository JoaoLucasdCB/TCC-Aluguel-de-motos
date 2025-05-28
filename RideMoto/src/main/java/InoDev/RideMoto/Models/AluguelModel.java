package InoDev.RideMoto.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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

    private LocalDateTime inicio;

    private LocalDateTime fim;

    @Enumerated(EnumType.STRING)
    private StatusAluguel status;

    @Column(name = "valor_total")
    private BigDecimal valorTotal;

    @Column(name = "contrato_pdf")
    private String contratoPdf;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();

    public enum StatusAluguel {
        ATIVO, ENCERRADO, ATRASADO
    }
}