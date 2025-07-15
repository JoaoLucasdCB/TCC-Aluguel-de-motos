package InoDev.RideMoto.DTO;

public class ReservaInputDTO {
    private String dataInicio;
    private String status;
    private Long usuarioId;
    private Long planoId;
    private Long motoId;

    private String dataFim;

    public String getDataFim() { return dataFim; }
    public void setDataFim(String dataFim) { this.dataFim = dataFim; }

    public String getDataInicio() { return dataInicio; }
    public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getPlanoId() { return planoId; }
    public void setPlanoId(Long planoId) { this.planoId = planoId; }
    public Long getMotoId() { return motoId; }
    public void setMotoId(Long motoId) { this.motoId = motoId; }
}
