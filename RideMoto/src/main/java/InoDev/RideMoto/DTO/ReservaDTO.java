
package InoDev.RideMoto.DTO;

public class ReservaDTO {
    private Long id;
    private String dataRetirada;
    private String status;
    private String nomePlano;
    private String nomeUsuario;

    // Moto
    private Long motoId;
    private String motoNome;
    private String motoPlaca;
    private String motoMarca;
    private String motoModelo;
    private Integer motoCilindrada;

    // Plano
    private Long planoId;
    private Integer planoDuracao;
    private String planoBeneficios;

    // Usuário
    private Long usuarioId;
    private String usuarioNome;

    public Long getMotoId() { return motoId; }
    public void setMotoId(Long motoId) { this.motoId = motoId; }
    public String getMotoNome() { return motoNome; }
    public void setMotoNome(String motoNome) { this.motoNome = motoNome; }
    public String getMotoPlaca() { return motoPlaca; }
    public void setMotoPlaca(String motoPlaca) { this.motoPlaca = motoPlaca; }
    public String getMotoMarca() { return motoMarca; }
    public void setMotoMarca(String motoMarca) { this.motoMarca = motoMarca; }
    public String getMotoModelo() { return motoModelo; }
    public void setMotoModelo(String motoModelo) { this.motoModelo = motoModelo; }
    public Integer getMotoCilindrada() { return motoCilindrada; }
    public void setMotoCilindrada(Integer motoCilindrada) { this.motoCilindrada = motoCilindrada; }
    public Long getPlanoId() { return planoId; }
    public void setPlanoId(Long planoId) { this.planoId = planoId; }
    public Integer getPlanoDuracao() { return planoDuracao; }
    public void setPlanoDuracao(Integer planoDuracao) { this.planoDuracao = planoDuracao; }
    public String getPlanoBeneficios() { return planoBeneficios; }
    public void setPlanoBeneficios(String planoBeneficios) { this.planoBeneficios = planoBeneficios; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public String getUsuarioNome() { return usuarioNome; }
    public void setUsuarioNome(String usuarioNome) { this.usuarioNome = usuarioNome; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDataRetirada() { return dataRetirada; }
    public void setDataRetirada(String dataRetirada) { this.dataRetirada = dataRetirada; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNomePlano() { return nomePlano; }
    public void setNomePlano(String nomePlano) { this.nomePlano = nomePlano; }
    public String getNomeUsuario() { return nomeUsuario; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }
}
