package InoDev.RideMoto;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import InoDev.RideMoto.Config.JwtRequestFilter;
import org.springframework.http.HttpMethod;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors()
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/validar-cnh").permitAll()
                .requestMatchers(HttpMethod.GET, "/dashboard/stats").permitAll()
                .requestMatchers(HttpMethod.GET, "/dashboard/grafico").permitAll()
                    .requestMatchers("/usuarios/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/reservas", "/reservas/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/reservas/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/reservas/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/localizacoes", "/localizacoes/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/reservas").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/motos").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/motos", "/api/motos/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/planos").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/planos", "/planos/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/planos/**").hasRole("ADMIN")
                .requestMatchers("/img/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
