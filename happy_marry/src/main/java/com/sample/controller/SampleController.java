package com.sample.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.sample.service.SampleService;
import com.sample.vo.SampleVo;

import common.base.controller.BaseController;

@Controller
public class SampleController extends BaseController {
	
	@Resource(name = "sampleService")
	SampleService sampleService;
	
	@RequestMapping("/sample/openSamplePage.do")
	public ModelAndView openSamplePage(HttpServletRequest request) throws Exception {
		ModelAndView mv = new ModelAndView("sample/sample");
		
		List<SampleVo> list = sampleService.selectSampleList();
		
		mv.addObject("sampleList", list);
		return mv;
	}
}
