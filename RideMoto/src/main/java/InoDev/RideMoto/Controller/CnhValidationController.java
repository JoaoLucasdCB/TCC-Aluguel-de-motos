package InoDev.RideMoto.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/validar-cnh")
public class CnhValidationController {

    @PostMapping
    public ResponseEntity<Map<String, Boolean>> validarCnh(@RequestBody Map<String, String> body) {
        String cnh = body.get("cnh");
        boolean valida = isCnhValida(cnh);
        return ResponseEntity.ok(Map.of("valida", valida));
    }

    // Algoritmo oficial de validação de CNH (módulo 11)
    private boolean isCnhValida(String cnh) {
        if (cnh == null || !cnh.matches("\\d{11}")) return false;
        if (cnh.chars().distinct().count() == 1) return false;
        int[] v = new int[9];
        for (int i = 0; i < 9; i++) v[i] = cnh.charAt(i) - '0';
        int soma = 0;
        for (int i = 0, j = 9; i < 9; i++, j--) soma += v[i] * j;
        int dv1 = soma % 11;
        int dsc = 0;
        if (dv1 >= 10) { dv1 = 0; dsc = 2; }
        soma = 0;
        for (int i = 0, j = 1; i < 9; i++, j++) soma += v[i] * j;
        int dv2 = soma % 11;
        if (dv2 >= 10) dv2 = 0;
        if (dsc > 0) dv2 = dv2 - dsc < 0 ? 0 : dv2 - dsc;
        return dv1 == (cnh.charAt(9) - '0') && dv2 == (cnh.charAt(10) - '0');
    }
}
