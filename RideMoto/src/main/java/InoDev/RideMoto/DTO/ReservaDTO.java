package InoDev.RideMoto.DTO;

public class ReservaDTO {
    private Long id;
    private String dataInicio;
    private String status;
    private String nomePlano;
    private String nomeUsuario;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDataInicio() { return dataInicio; }
    public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNomePlano() { return nomePlano; }
    public void setNomePlano(String nomePlano) { this.nomePlano = nomePlano; }
    public String getNomeUsuario() { return nomeUsuario; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }
}
