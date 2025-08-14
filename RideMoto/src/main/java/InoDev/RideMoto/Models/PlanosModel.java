package InoDev.RideMoto.Models;

import java.util.Set;
import java.util.List;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "planos")
    public class PlanosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_plano", nullable = false)
    private String nomePlano;

    @Column(name = "duracao", nullable = false)
    private Integer duracao; 

     @Column(name = "beneficios", nullable = false)
    private String beneficios;


    @ManyToMany
    @JoinTable(
        name = "plano_moto",
        joinColumns = @JoinColumn(name = "plano_id"),
        inverseJoinColumns = @JoinColumn(name = "moto_id")
    )
    private Set<MotosModel> motos;

    @OneToMany(mappedBy = "plano", cascade = jakarta.persistence.CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<ReservasModel> reservas;

}

