package com.sample.vo;

import common.base.vo.BaseVo;

public class SampleVo  extends BaseVo{
	long 	smpSq;
	String	smpEmail;
	String	smpPwd;
	public long getSmpSq() {
		return smpSq;
	}
	public void setSmpSq(long smpSq) {
		this.smpSq = smpSq;
	}
	public String getSmpEmail() {
		return smpEmail;
	}
	public void setSmpEmail(String smpEmail) {
		this.smpEmail = smpEmail;
	}
	public String getSmpPwd() {
		return smpPwd;
	}
	public void setSmpPwd(String smpPwd) {
		this.smpPwd = smpPwd;
	}
	
	
}
