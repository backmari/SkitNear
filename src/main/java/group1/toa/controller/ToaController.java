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

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ToaController {

    @Autowired
    private ToaRepository toaRep;

    //private List<Toilet> toilets = new ArrayList<>();

    @GetMapping("/toilets")
    @ResponseBody
    public List<Toilet> scriptReq(HttpSession session) {
        List<Toilet> toilets = (List<Toilet>) session.getAttribute("toilets");

        return toilets;
    }

    @GetMapping ("/")
    public String listToilets(HttpSession session){
        List<Toilet> toilets = toaRep.getAllToilets();
        session.setAttribute("toilets", toilets);
        return "index";
    }

    @PostMapping(value="/", params="search")
    public String submitForm(@RequestParam (defaultValue = "false") boolean hasChangingTable,
                                   @RequestParam (defaultValue = "false") boolean isHandicap,
                                   @RequestParam (defaultValue = "false") boolean isFree,
                                   @RequestParam (defaultValue = "false") boolean isOpen,
                                   @RequestParam String latitude,
                                   @RequestParam String longitude, HttpSession session) {
        List<Toilet> toilets = (List<Toilet>) session.getAttribute("toilets");
        if (toilets == null) {
            toilets = new ArrayList<>();
        }
        toilets = toaRep.getFiveClosestToilets(Double.parseDouble(latitude), Double.parseDouble(longitude),
                hasChangingTable, isHandicap, isFree, isOpen);
        session.setAttribute("toilets", toilets);
        return "index";
    }

    @PostMapping(value="/", params="reset")
    public String resetForm(HttpSession session) {
        List<Toilet> toilets = (List<Toilet>) session.getAttribute("toilets");
        if (toilets == null) {
            toilets = new ArrayList<>();
        }
        toilets = toaRep.getAllToilets();
        session.setAttribute("toilets", toilets);
        return "index";
    }
}
