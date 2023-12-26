package com.example.todolistserver.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import com.example.todolistserver.generic.model.JpaEntity;
import com.example.todolistserver.project.model.Project;

import jakarta.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Collection;


@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class User extends JpaEntity implements UserDetails {
    private String name;
    private String surname;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;
    private String password;

    @JoinTable(
            name = "project_collaborators",
            joinColumns = @JoinColumn(name = "collaborator_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Project> projects;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
