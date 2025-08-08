package InoDev.RideMoto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import InoDev.RideMoto.Repository.MotosRepository;
import InoDev.RideMoto.Repository.ReservasRepository;
import InoDev.RideMoto.Repository.UsuarioRepository;
import InoDev.RideMoto.Repository.PlanosRepository;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.EntityManager;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    @GetMapping("/grafico")
    public ResponseEntity<Map<String, Object>> getGrafico() {
        Map<String, Object> grafico = new HashMap<>();
        String[] meses = {"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"};
        int[] alugueisPorMes = new int[12];
        int[] motosPorMes = new int[12];

        // Reservas por mês
        List<Object[]> reservas = entityManager.createQuery(
            "SELECT MONTH(r.dataReserva), COUNT(r.id) FROM ReservasModel r GROUP BY MONTH(r.dataReserva)", Object[].class
        ).getResultList();
        for (Object[] row : reservas) {
            int mes = ((Number)row[0]).intValue();
            int count = ((Number)row[1]).intValue();
            if (mes >= 1 && mes <= 12) alugueisPorMes[mes-1] = count;
        }

        // Motos cadastradas por mês (descomente e ajuste se tiver campo dataCadastro em MotosModel)
        // List<Object[]> motos = entityManager.createQuery(
        //     "SELECT MONTH(m.dataCadastro), COUNT(m.id) FROM MotosModel m GROUP BY MONTH(m.dataCadastro)", Object[].class
        // ).getResultList();
        // for (Object[] row : motos) {
        //     int mes = ((Number)row[0]).intValue();
        //     int count = ((Number)row[1]).intValue();
        //     if (mes >= 1 && mes <= 12) motosPorMes[mes-1] = count;
        // }

        grafico.put("meses", meses);
        grafico.put("alugueis", alugueisPorMes);
        grafico.put("cadastradas", motosPorMes);
        return ResponseEntity.ok(grafico);
    }
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private MotosRepository motosRepository;
    @Autowired
    private ReservasRepository reservasRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PlanosRepository planosRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("motosCadastradas", motosRepository.count());
        stats.put("motosAlugadas", reservasRepository.count());
        stats.put("usuariosConectados", usuarioRepository.count());

        // Buscar o plano mais alugado via JPQL
        String planoMaisAlugado = "-";
        try {
            Object result = entityManager.createQuery(
                "SELECT p.nomePlano FROM ReservasModel r JOIN r.plano p GROUP BY p.nomePlano ORDER BY COUNT(r.id) DESC"
            ).setMaxResults(1).getSingleResult();
            if (result != null) planoMaisAlugado = result.toString();
        } catch (Exception e) {
            planoMaisAlugado = "-";
        }
        stats.put("planoMaisAlugado", planoMaisAlugado);

        // Buscar a moto mais alugada via JPQL
        String motoMaisAlugada = "-";
        try {
            Object result = entityManager.createQuery(
                "SELECT m.nome FROM ReservasModel r JOIN r.moto m GROUP BY m.nome ORDER BY COUNT(r.id) DESC"
            ).setMaxResults(1).getSingleResult();
            if (result != null) motoMaisAlugada = result.toString();
        } catch (Exception e) {
            motoMaisAlugada = "-";
        }
        stats.put("motoMaisAlugada", motoMaisAlugada);

        return ResponseEntity.ok(stats);
    }

    // Endpoint do gráfico pode ser implementado depois, removido para evitar erro de método inexistente
}
