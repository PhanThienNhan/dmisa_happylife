package com.example.happylife.backendhappylife.service.implement;

import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaCreateDTO;
import com.example.happylife.backendhappylife.DTO.StatistaDTO.StatistaDashboardResDTO;
import com.example.happylife.backendhappylife.entity.Statista;
import com.example.happylife.backendhappylife.exception.UserCreationException;
import com.example.happylife.backendhappylife.repo.StatistaRepo;
import com.example.happylife.backendhappylife.service.StatistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;

@Service
public class StatistaServiceImpl implements StatistaService {

    @Autowired
    private StatistaRepo statistaRepo;
    @Override
    public StatistaDashboardResDTO getStatistaInDashboardByYear(Integer year) {
        StatistaDashboardResDTO statistaDashboardResDTO;
        Statista statista;

        try {
            if(year!=null) statista = statistaRepo.findByYear(year);
            else {
                Year currentYear = Year.now();

                statista = statistaRepo.findByYear(currentYear.getValue());
            }
            return statista.convertToDashboardResDTO();

        } catch (Exception e) {
            throw new RuntimeException("Error find Statista of this year.");
        }
    }

    @Override
    public StatistaDashboardResDTO createStatista(StatistaCreateDTO statistaCreateDTO) {
        Statista statista = new Statista().convertCreToEntity(statistaCreateDTO);
        if(statistaCreateDTO.getYear()== null) {
            throw new UserCreationException("Year is required");
        }
        return statistaRepo.save(statista).convertToDashboardResDTO();
    }
}
