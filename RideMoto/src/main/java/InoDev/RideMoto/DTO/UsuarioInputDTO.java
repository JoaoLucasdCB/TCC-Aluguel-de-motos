package InoDev.RideMoto.DTO;

public class UsuarioInputDTO {
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String cnhNumero;
    private String cnhValidade;
    private String telefone;
    private String tipoUsuario;
    private String status;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getCnhNumero() { return cnhNumero; }
    public void setCnhNumero(String cnhNumero) { this.cnhNumero = cnhNumero; }
    public String getCnhValidade() { return cnhValidade; }
    public void setCnhValidade(String cnhValidade) { this.cnhValidade = cnhValidade; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
