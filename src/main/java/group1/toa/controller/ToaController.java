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

    @GetMapping("/")
    public String listToilets() {
        toilets = toaRep.getAllToilets();
        return "index";
    }

    @PostMapping(value = "/", params = "search")
    public String submitForm(@RequestParam(defaultValue = "false") Boolean hasChangingTable,
                             @RequestParam(defaultValue = "false") Boolean isHandicap,
                             @RequestParam(defaultValue = "false") Boolean isFree,
                             @RequestParam(defaultValue = "false") Boolean isOpen,
                             @RequestParam String latitude,
                             @RequestParam String longitude) {
        toilets = toaRep.getFiveClosestToilets(Double.parseDouble(latitude), Double.parseDouble(longitude),
                hasChangingTable, isHandicap, isFree, isOpen);
        return "index";
    }

    @GetMapping(value = "/filter", params = "search")
    @ResponseBody
    public List<Toilet> getFiltered(@RequestParam(defaultValue = "false") String hasChangingTable,
                                    @RequestParam(defaultValue = "false") String isHandicap,
                                    @RequestParam(defaultValue = "false") String isFree,
                                    @RequestParam(defaultValue = "false") String isOpen,
                                    @RequestParam String latitude,
                                    @RequestParam String longitude) {

        return toaRep.getFiveClosestToilets(Double.parseDouble(latitude), Double.parseDouble(longitude),
                Boolean.parseBoolean(hasChangingTable), Boolean.parseBoolean(isHandicap), Boolean.parseBoolean(isFree), Boolean.parseBoolean(isOpen));
    }

    @PostMapping(value = "/", params = "reset")
    public String resetForm() {
        toilets = toaRep.getAllToilets();
        return "index";
    }
}
