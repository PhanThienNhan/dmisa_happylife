package com.example.happylife.backendhappylife.service;

import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanBasicDTO;
import com.example.happylife.backendhappylife.DTO.PlanDTO.PlanResDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegisCreateDTO;
import com.example.happylife.backendhappylife.DTO.RegistrationDTO.RegistrationDTO;
import com.example.happylife.backendhappylife.DTO.UserResDTO;
import com.example.happylife.backendhappylife.entity.Registration;
import org.bson.types.ObjectId;

import java.util.List;
public interface RegistrationService {
    public List<Registration> getRegistrations(UserResDTO user);
    public Registration addRegistration(UserResDTO authUser, UserResDTO registerUser, PlanBasicDTO plan);



    public Registration updateRegisStatus(UserResDTO user, ObjectId regisId, String status, String message);
}