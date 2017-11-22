package group1.toa.controller;

import group1.toa.domain.Toilet;
import group1.toa.repository.ToaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
=======
>>>>>>> 6eab621a51efca7d105b0ff417b98ad90eebda54
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import java.util.List;

@Controller
public class ToaController {

    @Autowired
    private ToaRepository toaRep;

    @GetMapping ("/")
    public ModelAndView listToilets(){
        return new ModelAndView("index")
                .addObject("allToilets", toaRep.getAllToilets())
                .addObject("handicapToilets", toaRep.getHandicapToilets())
                .addObject("changingTables", toaRep.getChangingTables())
                .addObject("freeToilets", toaRep.getFreeToilets());
    }

<<<<<<< HEAD
    @PostMapping("/")
    public ModelAndView submitForm(@RequestParam (defaultValue = "false") boolean hasChangingTable,
                                   @RequestParam (defaultValue = "false") boolean isHandicap,
                                   @RequestParam (defaultValue = "false") boolean isFree,
                                   @RequestParam (defaultValue = "false") boolean isOpen,
                                   @RequestParam String latitude,
                                   @RequestParam String longitude) {
        System.out.println(latitude + " " + longitude);
        return new ModelAndView("index")
                .addObject("allToilets", toaRep.getAllToilets())
                .addObject("handicapToilets", toaRep.getHandicapToilets())
                .addObject("changingTables", toaRep.getChangingTables())
                .addObject("freeToilets", toaRep.getFreeToilets());
    }
=======
>>>>>>> 6eab621a51efca7d105b0ff417b98ad90eebda54

    @RequestMapping(value = "/toilets", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Toilet> toiletObjects(){
        List<Toilet> toilets = toaRep.getAllToilets();
        return toilets;
    }

<<<<<<< HEAD
=======

>>>>>>> 6eab621a51efca7d105b0ff417b98ad90eebda54
}
