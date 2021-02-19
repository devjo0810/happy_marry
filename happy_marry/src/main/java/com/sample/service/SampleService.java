package com.sample.service;

import java.util.List;

import com.sample.vo.SampleVo;

public interface SampleService {

	/**
	 * 샘플-목록 조회
	 * 
	 * @return List<SampleVo>
	 * @throws Exception
	 */
	List<SampleVo> selectSampleList() throws Exception;
}
