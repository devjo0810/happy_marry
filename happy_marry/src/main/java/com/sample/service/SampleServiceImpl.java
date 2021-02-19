package com.sample.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.sample.dao.SampleDao;
import com.sample.vo.SampleVo;

@Service("sampleService")
public class SampleServiceImpl implements SampleService{
	
	Logger log = Logger.getLogger(this.getClass());

	@Resource(name="sampleDao")
	SampleDao sampleDao;

	@Override
	public List<SampleVo> selectSampleList() throws Exception{
		List<SampleVo> list = new ArrayList<SampleVo>();
		
		try {
			list = sampleDao.selectSampleList();
		}catch(Exception e) {
			log.debug("############## selectSampleList Failed!!! [" + e.getMessage() + "]");
		}
		
		return list;
	}
}
