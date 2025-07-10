package InoDev.RideMoto.DTO;

import InoDev.RideMoto.Models.MotosModel.StatusMoto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MotosInputDTO {
    private String nome;
    private String marca;
    private String modelo;
    private String cilindrada;
    private String placa;
    private StatusMoto status;
    private Integer ano;
    private Integer quilometragem;
    private String imagem;
}
