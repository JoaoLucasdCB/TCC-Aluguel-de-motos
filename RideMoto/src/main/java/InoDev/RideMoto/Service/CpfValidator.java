package InoDev.RideMoto.Service;

public class CpfValidator {
    private CpfValidator() { }

    public static boolean isValidCPF(String cpf) {
        if (cpf == null) return false;
        cpf = cpf.replaceAll("\\D", ""); // remove tudo que não for dígito
        if (cpf.length() != 11 || cpf.matches("^(\\d)\\1{10}$")) return false;
        try {
            int sum = 0;
            int weight = 10;
            for (int i = 0; i < 9; i++) {
                sum += (cpf.charAt(i) - '0') * weight;
                weight--;
            }
            int digit1 = 11 - (sum % 11);
            if (digit1 > 9) digit1 = 0;
            if (digit1 != (cpf.charAt(9) - '0')) return false;
            sum = 0;
            weight = 11;
            for (int i = 0; i < 10; i++) {
                sum += (cpf.charAt(i) - '0') * weight;
                weight--;
            }
            int digit2 = 11 - (sum % 11);
            if (digit2 > 9) digit2 = 0;
            return digit2 == (cpf.charAt(10) - '0');
        } catch (Exception e) {
            return false;
        }
    }
}
