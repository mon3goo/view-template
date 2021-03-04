package mon3goo.web.view.template.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import mon3goo.web.generics.jpa.entities.MenuOption;
import mon3goo.web.generics.jpa.repositories.MenuOptionsRepo;

@Controller
public class TemplateBaseController {

	private final Logger logger = LoggerFactory.getLogger(TemplateBaseController.class);
	
	@Autowired
	MenuOptionsRepo menuRepo;

//	@Autowired
	@Qualifier("isBarExpanded")
	protected Boolean isBarExpanded=true;
	
	@ModelAttribute(value="isBarExpanded")
	public Boolean isBarExpanded() {
	    return isBarExpanded;
	}

	@RequestMapping("/")
	public String viewConfigurationPanel(HttpServletRequest request,
			HttpServletResponse response,Model model) throws Exception {

		//fetches the horizontal navbar options
		List<MenuOption> horizontalNavBar=menuRepo.findByScopeAndDirection("home","h");	

		//fetches the horizontal navbar options
		List<MenuOption> verticalNavBar=menuRepo.findByScopeAndDirection("home","v");
		
		model.addAttribute("horizontalNavBar", horizontalNavBar);
		model.addAttribute("verticalNavBar", verticalNavBar);
		model.addAttribute("isBarExpanded", true);
		
		return "layout";
	}

	@RequestMapping(value="/checkNavBarInfo")
	@ResponseBody
	public Boolean CheckNavBarInfo() throws Exception {
		return this.isBarExpanded;
	}
	
//	@RequestMapping("/layout")
//	public String returnLayout(HttpServletRequest request,
//			HttpServletResponse response,Model model) throws Exception {
//
//		this.preRender(request, response, model);
//		
//		return "/layout";
//	}
	
//	@RequestMapping("/header")
//	public String returnHeader(HttpServletRequest request,
//			HttpServletResponse response,Model model) throws Exception {
//
//		return "/header";
//	}

}