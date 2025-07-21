package InoDev.RideMoto.DTO;

import InoDev.RideMoto.Models.MotosModel;

public class MotosDTO {
    public Long id;
    public String nome;
    public String marca;
    public String modelo;
    public String cilindrada;
    public String placa;
    public String status;
    public Integer ano;
    public Integer quilometragem;
    public String imagem;

    public MotosDTO(MotosModel moto) {
        this.id = moto.getId();
        this.nome = moto.getNome();
        this.marca = moto.getMarca();
        this.modelo = moto.getModelo();
        this.cilindrada = moto.getCilindrada();
        this.placa = moto.getPlaca();
        this.status = moto.getStatus().name();
        this.ano = moto.getAno();
        this.quilometragem = moto.getQuilometragem();
        this.imagem = moto.getImagem();
    }
}
