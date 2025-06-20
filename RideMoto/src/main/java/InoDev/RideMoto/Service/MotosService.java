package InoDev.RideMoto.Service;

import InoDev.RideMoto.Models.MotosModel;
import InoDev.RideMoto.Repository.MotosRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotosService {

    @Autowired
    private MotosRepository motosRepository; 

    public List<MotosModel> listarTodas() {
        return motosRepository.findAll();
    }

    /**
     * @param id 
     * @return 
     */
    public Optional<MotosModel> buscarPorId(Long id) {
        return motosRepository.findById(id);
    }

    public MotosModel salvar(MotosModel moto) {
        return motosRepository.save(moto);
    }

    // Deleta uma moto pelo ID
    public void deletar(Long id) {
        motosRepository.deleteById(id);
    }

    /**
     * 
     * @param placa 
     * @return 
     */
    public Optional<MotosModel> buscarPorPlaca(String placa) {
        return motosRepository.findByPlaca(placa);
    }

    public MotosRepository getMotosRepository() {
        return motosRepository;
    }

    public void setMotosRepository(MotosRepository motosRepository) {
        this.motosRepository = motosRepository;
    }}