package InoDev.RideMoto.Models;

import java.time.LocalDate;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter@Setter
@Table(name = "motos", uniqueConstraints = {
    @UniqueConstraint(columnNames = "placa")
})
public class MotosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String placa;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private Integer ano;

    @Column(nullable = false)
    private Integer quilometragem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusMoto status;

    @Column(name = "criado_em", nullable = false)
    private LocalDate criadoEm;


     public enum StatusMoto {
        DISPONIVEL, RESERVADA, INDISPONIVEL
    }
}
