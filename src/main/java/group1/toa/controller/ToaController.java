package group1.toa.controller;

import group1.toa.repository.ToaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

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
}
