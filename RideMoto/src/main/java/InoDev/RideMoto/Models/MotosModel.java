package InoDev.RideMoto.Models;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

@Table(name = "motos")

public class MotosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "modelo", nullable = false)
    private String modelo;

    @Column(name = "cilindrada", nullable = false)
    private String cilindrada;

    @Column(name = "placa", nullable = false, unique = true)
    private String placa;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusMoto status;

    @Column(name = "ano", nullable = false)
    private Integer ano;
    
    @Column(name = "quilometragem", nullable = true)
    private Integer quilometragem;

    @Column(name = "imagem", nullable = true)
    private String imagem;

    @ManyToMany(mappedBy = "motos")
    @JsonBackReference
    private Set<PlanosModel> planos;

    @OneToMany(mappedBy = "moto")
    private List<ReservasModel> reservas;

    @OneToMany(mappedBy = "moto")
    private List<AluguelModel> alugueis;

    public enum StatusMoto {
        DISPONIVEL, RESERVADA, ALUGADA, MANUTENCAO
    }
}
