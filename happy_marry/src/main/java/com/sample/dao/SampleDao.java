package com.sample.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sample.vo.SampleVo;

import common.dao.AbstractDAO;

@Repository("sampleDao")
public class SampleDao extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<SampleVo> selectSampleList() throws Exception{
		return (List<SampleVo>)selectList("sample.selectSampleList");
	}
	
}
