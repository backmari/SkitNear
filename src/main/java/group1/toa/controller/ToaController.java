package group1.toa.controller;

import group1.toa.domain.Toilet;
import group1.toa.repository.ToaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ToaController {

    @Autowired
    private ToaRepository toaRep;

    private List<Toilet> toilets = new ArrayList<>();

    @GetMapping("/toilets")
    @ResponseBody
    public List<Toilet> scriptReq() {
        return toilets;
    }

    @GetMapping ("/")
    public ModelAndView listToilets(){
        toilets = toaRep.getAllToilets();
        return new ModelAndView("index");
    }

    @PostMapping(value="/", params="search")
    public ModelAndView submitForm(@RequestParam (defaultValue = "false") boolean hasChangingTable,
                                   @RequestParam (defaultValue = "false") boolean isHandicap,
                                   @RequestParam (defaultValue = "false") boolean isFree,
                                   @RequestParam (defaultValue = "false") boolean isOpen,
                                   @RequestParam String latitude,
                                   @RequestParam String longitude) {
        toilets = toaRep.getFiveClosestToilets(Double.parseDouble(latitude), Double.parseDouble(longitude),
                hasChangingTable, isHandicap, isFree, isOpen);
        return new ModelAndView("index");
    }

    @PostMapping(value="/", params="reset")
    public ModelAndView resetForm() {
        toilets = toaRep.getAllToilets();
        return new ModelAndView("index");
    }
}
