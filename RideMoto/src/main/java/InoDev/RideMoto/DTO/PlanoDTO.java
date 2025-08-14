package InoDev.RideMoto.DTO;

public class PlanoDTO {
    private Long id;
    private String nomePlano;
    private Integer duracao;
    private String beneficios;


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNomePlano() { return nomePlano; }
    public void setNomePlano(String nomePlano) { this.nomePlano = nomePlano; }
    public Integer getDuracao() { return duracao; }
    public void setDuracao(Integer duracao) { this.duracao = duracao; }
    public String getBeneficios() { return beneficios; }
    public void setBeneficios(String beneficios) { this.beneficios = beneficios; }
}
