
package InoDev.RideMoto.DTO;

public class ReservaInputDTO {
    private String dataInicio;
    public String getDataInicio() { return dataInicio; }
    public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }
    private String dataRetirada;
    private String status;
    private Long usuarioId;
    private Long planoId;
    private Long motoId;
    private Long localRetiradaId;

    public String getDataRetirada() { return dataRetirada; }
    public void setDataRetirada(String dataRetirada) { this.dataRetirada = dataRetirada; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getPlanoId() { return planoId; }
    public void setPlanoId(Long planoId) { this.planoId = planoId; }
    public Long getMotoId() { return motoId; }
    public void setMotoId(Long motoId) { this.motoId = motoId; }
    public Long getLocalRetiradaId() { return localRetiradaId; }
    public void setLocalRetiradaId(Long localRetiradaId) { this.localRetiradaId = localRetiradaId; }
}
