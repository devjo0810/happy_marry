var gfn_openFile = function(event,i) {
	
	if(i==null || i=='') {
		i = "";
	}
	
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var dataURL = reader.result;
		var output = document.getElementById('output'+i);
		output.src = dataURL;
	};
	reader.readAsDataURL(input.files[0]);
};

function gfn_isNull(str) {
	if (str == null) return true;
	if (str == "NaN") return true;
	if (new String(str).valueOf() == "undefined") return true;    
    var chkStr = new String(str);
    if( chkStr.valueOf() == "undefined" ) return true;
    if (chkStr == null) return true;    
    if (chkStr.toString().length == 0 ) return true;   
    return false; 
}

function gfn_emailVaild(str) {
	var email = str;
	var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	 
	if(regex.test(email) === false) {
		alert("잘못된 이메일 형식입니다.");
		return false;
	} else {
		return true;
	}
}

function gfn_onlyNumber(obj) {
    $(obj).keyup(function(){
         $(this).val($(this).val().replace(/[^0-9]/g,""));
    }); 
}

function gfn_overScore(obj, max) {
    $(obj).keyup(function(){
    	if($(this).val() > max)
         $(this).val(max);
    }); 
}

function gfn_autoHypenPhone(obj) {
	$(obj).keyup(function(){
		str = $(this).val().replace(/[^0-9]/g, '');
        var tmp = '';
        if(str.substr(0,2) == '02'){
            if( str.length < 4){
                return str;
            }else if(str.length < 6){
                tmp += str.substr(0, 2);
                tmp += '-';
                tmp += str.substr(2);
                return tmp;
            }else if(str.length < 10){
                tmp += str.substr(0, 2);
                tmp += '-';
                tmp += str.substr(2, 3);
                tmp += '-';
                tmp += str.substr(5, 4);
                return tmp;
            }else{              
                tmp += str.substr(0, 2);
                tmp += '-';
                tmp += str.substr(2, 4);
                tmp += '-';
                tmp += str.substr(6, 4);
                return tmp;
            }
        }else{
            if( str.length < 4){
                return str;
            }else if(str.length < 7){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3);
                return tmp;
            }else if(str.length < 11){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 3);
                tmp += '-';
                tmp += str.substr(6);
                return tmp;
            }else{              
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }
        }
        $(this).val(str);
	}); 
}

function showKeyCode(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) )
	{
		return;
	}
	else
	{
		return false;
	}
}

function ComSubmit(opt_formId) {
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.url = "";
	
	$("#commonForm")[0].reset();
	$("#commonForm").empty();
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.addParam = function addParam(key, value){
		$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
	};
	
	this.submit = function submit(){
		var frm = $("#"+this.formId)[0];
		frm.action = this.url;
		frm.method = "post";
		frm.submit();
	};
}

var msgCnt = 0;
var gfv_ajaxCallback = "";
var gv_errCd;
var gv_errMsg;
function ComAjax(opt_formId){
	
	this.url = "";		
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.param = "";
	
	$("#commonForm")[0].reset();
	$("#commonForm").empty();
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.setCallback = function setCallback(callBack){
		fv_ajaxCallback = callBack;
	};

	this.addParam = function addParam(key,value){ 
		this.param = this.param + "&" + key + "=" + value; 
	};
	
	this.ajax = function ajax(){
		
		if(this.formId != "commonForm"){
			this.param += "&" + $("#" + this.formId).serialize();
		}
		$.ajax({
			url : this.url,    
			type : "POST",   
			data : this.param,
			datatype : "json",
			async : false,
			beforeSend : function() {
				console.log("[ajax.beforeSend]");
			},
			success : function(data) {
				console.log("[ajax.success]");
				console.log(data);
				
				gv_errCd = data.errCd;
				gv_errMsg = data.errMsg;
				
				if(!gfn_isNull(gv_errCd)){
					gfn_moveErrorPage(gv_errCd, gv_errMsg);
					return false;
				}else{
					if(typeof(fv_ajaxCallback) == "function"){
						fv_ajaxCallback(data);
					}else {
						eval(fv_ajaxCallback + "(data);");
					}
				}
				
			},
			complete:function(){
				console.log("[ajax.complete]");
		    },
		    error:function(request,status,error){
		    	console.log("[ajax.error]");
		    	gv_errCd = "SYSTEM ERROR";
				gv_errMsg = "처리 도중 오류가 발생하였습니다. \n창을 닫고 다시 접속하세요.";
		    	gfn_moveErrorPage(gv_errCd, gv_errMsg);
		    	return false;
			}
		});
	};
}

function gfn_moveErrorPage(errCd, errMsg) {
	
	console.log("gfn_moveErrorPage.errCd =" + errCd);
	console.log("gfn_moveErrorPage.errMsg =" + errMsg);
	
	var comSubmit = new ComSubmit();
	comSubmit.setUrl("/sld/common/openPage.do");
	comSubmit.addParam("viewNm", "/comn/error/pages/comn_sys_error.jsp");
	comSubmit.addParam("errCd", errCd);
	comSubmit.addParam("errMsg", errMsg);
	comSubmit.submit();
}

function ComAjaxForm(opt_formId){
	this.url = "";		
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.param = "";
	
	$("#commonForm")[0].reset();
	$("#commonForm").empty();
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.setCallback = function setCallback(callBack){
		fv_ajaxCallback = callBack;
	};
	this.addParam = function addParam(key,value){ 
		$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
	};

	this.ajaxForm = function ajaxForm() {
		$("#" + this.formId).ajaxForm({
			url : this.url,
			type : "POST",
			enctype : "multipart/form-data",
			contentType : "application/json; charset=UTF-8",
			beforeSend : function() {
//				if($("#viewFileName").val() != "usr/stu/learning/cntnt/pages/scr_cntntDtl" && $("#viewFileName").val() != "usr/comn/main/pages/scr_main"){
////					$("#preloader").show();
//				}
			},
			uploadProgress: function(event, position, total, percentComplete) {
				console.log("## progress : " + percentComplete + "%");
//				$("#uploadNum").html(percentComplete + "%");
//				$("#uploadBarNum").css("width", percentComplete + "%" );
//				
//				if(percentComplete == 100){
//					$("#preloader").hide();
//				}
			},
			success : function(data) {
				if (typeof (fv_ajaxCallback) == "function") {
					fv_ajaxCallback(data);
				} else {
					eval(fv_ajaxCallback + "(data);");
				}
			},
			error : function(request, status, error) {
				alert("list search fail :: error code: "
						+ request.status + "\n"
						+ "error message: " + error + "\n");
			}
		}).submit();
	};
}

/*
*/
function gfn_renderPaging(params){
	
	var divId		= params.divId;
	var fnName		= params.fnName;
	var curPage     = params.curPage;
	var totPage     = params.totPage;
	var curBlock    = params.curBlock;
	var totBlock    = params.totBlock;
	var blockBegin  = params.blockBegin;
	var blockEnd    = params.blockEnd;
	var prevPage    = params.prevPage;
	var nextPage    = params.nextPage;
	
	$("#"+divId).empty();
	var pagerStr = "";
	
	if(curBlock > 1){	/*<!-- **처음페이지로 이동 : 현재 페이지가 1보다 크면  [처음]하이퍼링크를 화면에 출력-->*/
		//pagerStr += '<li><a href="javascript:' + fnName + '(1)">&#60;&#60;</a></li>';
		pagerStr += '<button onClick="' + fnName + '(1)">&#60;&#60;</button>';
	}
	if(curBlock > 1){	/*<!-- **이전페이지 블록으로 이동 : 현재 페이지 블럭이 1보다 크면 [이전]하이퍼링크를 화면에 출력 -->*/
		//pagerStr += '<li><a href="javascript:' + fnName + '('+prevPage+')">&#60;</a></li>';
		pagerStr += '<button class="btn_prev" onClick="' + fnName + '('+prevPage+')">&nbsp;</button>';
	}
	for(var i = blockBegin; i < blockEnd; i++){	/*<!-- **하나의 블럭에서 반복문 수행 시작페이지부터 끝페이지까지 -->*/
		if(i == curPage){	/*<!-- **현재페이지이면 하이퍼링크 제거 -->*/
			//pagerStr += '<li><a href="#" class="on">'+i+'</a></li>';
			pagerStr += '<button class="on">'+i+'</button>';
		}else{
			//pagerStr += '<li><a href="javascript:' + fnName + '('+i+')">'+i+'</a></li>';
			pagerStr += '<button onClick="' + fnName + '('+i+')">'+i+'</button>';
		}
	}
	if(curBlock < totBlock){	/*<!-- **다음페이지 블록으로 이동 : 현재 페이지 블럭이 전체 페이지 블럭보다 작거나 같으면 [다음]하이퍼링크를 화면에 출력 -->    && totPage > blockEnd*/
		//pagerStr += '<li><a href="javascript:' + fnName + '('+nextPage+')">&#62;</a></li>';
		pagerStr += '<button class="btn_next" onClick="' + fnName + '('+nextPage+')">&nbsp;</button>';
	}
	if(curPage < totPage && curBlock < totBlock){	/*<!-- **끝페이지로 이동 : 현재 페이지가 전체 페이지보다 작거나 같으면 [끝]하이퍼링크를 화면에 출력 -->   && totPage > blockEnd */
		//pagerStr += '<li><a href="javascript:' + fnName + '('+totPage+')">&#62;&#62;</a></li>';
		pagerStr += '<button onClick="' + fnName + '('+totPage+')">&#62;&#62;</button>';
	}
	
	$("#"+divId).html(pagerStr).trigger('create');
	
}

var gv_closePermit = true; // 레이어팝업 닫기 허용 여부

function gfn_layer_open(el,other){ 
	
	var temp = $('#' + el); 
	
	$('#wrap .layer').hide();
	$('#wrap .pop-layer').hide();
	$('#wrap .pop-wrap').hide();
	$('#wrap .pop-full').hide();
	
	temp.parent().fadeIn();
	temp.fadeIn();

	// 화면의 중앙에 레이어를 띄운다.
	/*if(temp.hasClass("pop-full")){
		temp.css('margin-top', '0px');
		temp.css('top', '0px');
		temp.css('margin-left', '0px');
		temp.css('left', '0px');
	}else{*/
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', (($(window).height()-temp.outerHeight())/2/*+$(window).scrollTop()*/)+"px");
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', (($(window).width()-temp.outerWidth())/2/*+$(window).scrollLeft()*/)+"px");
		else temp.css('left', '0px');
	/*}*/
	temp.find('#pop_btn_close').click(function(e){
		if(gv_closePermit == false){
			return false;
		}
		$('.layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		$("html").css("overflow","visible");
		//$("#wrap").off('scroll touchmove mousewheel');
		e.preventDefault();
	});
	
	$("html").css("overflow","hidden");
	/*$("#wrap").on('scroll touchmove mousewheel', function(event) {
		return false;
	});*/
}	

//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
 
//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function gfn_fileExtChk(cntntTyp, fileExt){
	
	var vdoExtArr = ["avi", "mp4", "mov"];
	var docExtArr = ["docx", "pdf"];
	var imgExtArr = ["gif", "png", "jpg", "jpeg"];
	var zipExtArr = ["zip", "docx", "pdf"];
	
	var extArr;
	var msg = "";
	
	if(cntntTyp == "VDO"){
		extArr = vdoExtArr;
		msg = "avi, mp4, mov 확장자만 업로드 가능합니다.";
	}else if(cntntTyp == "DOC"){
		extArr = docExtArr;
		msg = "docx, pdf 파일 확장자만 업로드 가능합니다.";
	}else if(cntntTyp == "IMG"){
		extArr = imgExtArr;
		msg = "gif, png, jpg, jpeg 파일 확장자만 업로드 가능합니다.";
	}else if(cntntTyp == "ZIP"){
		extArr = zipExtArr;
		msg = "ZIP, docx, pdf 파일 확장자만 업로드 가능합니다.";
	}else{
	} 
	
	if ($.inArray(fileExt, extArr) == -1) {
		alert(msg);
		return false;
	}else{
		return true;
	}
}


//0 좌측 채우기
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

//레이어 팝업 위치 조정
function resize_lp(el) {
	var temp = $('#' + el);
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');
}

/*
[연월일시 값 조회]
format : 
	YYYY-MM-DD hh:mm:ss.ms
	YYYYMMDD
	YYYYMMDDhhmmssms
 p.s 필요한 format 추가해서 사용바람
*/
function gfn_get_dateTime(date, format){
	
	var str = "";
	
	var d = date;
	var YYYY = d.getFullYear();
	var MM = d.getMonth() + 1;
	var DD = d.getDate();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();
	var ms = d.getMilliseconds();
	
	if(MM < 10){
		MM = "0"+ MM;
	}
	if(DD < 10){
		DD = "0"+ DD;
	}
	if(mm < 10){
		mm = "0"+ mm;
	}
	if(ss < 10){
		ss = "0"+ ss;
	}
	
	if(format == "YYYY-MM-DD hh:mm:ss.ms"){
		str = YYYY+"-"+MM+"-"+DD+" "+hh+":"+mm+":"+ss+"."+ms;
	}else if(format == "YYYY-MM-DD hh:mm:ss"){
		str = YYYY+"-"+MM+"-"+DD+" "+hh+":"+mm+":"+ss;
	}else if(format == "YYYYMMDD"){
		str = YYYY+""+MM+""+DD;
	}else if(format == "YYYYMMDDhhmmssms"){
		str = YYYY+""+MM+""+DD+""+hh+""+mm+""+ss+""+ms;
	}else{
	}
	
	return str;
}


/* gfn_tableRowspan
 * 테이블 중복항목 rowspan
 */
function gfn_tableRowspan(obj, colIdx){
	obj.each(function() {
		var table = this;
		$.each([colIdx] /* 합칠 칸 번호 */, function(c, v) {
			var tds = $('>tbody>tr>td:nth-child(' + v + ')', table).toArray(), i = 0, j = 0;
			for(j = 1; j < tds.length; j ++) {
				if(tds[i].innerHTML != tds[j].innerHTML) {
					$(tds[i]).attr('rowspan', j - i);
					i = j;
					continue;
				}
				$(tds[j]).hide();
			}
			j --;
			if(tds[i].innerHTML == tds[j].innerHTML) {
				$(tds[i]).attr('rowspan', j - i + 1);
			}
		});
	});
}


/* 초를 시분초로 변환
 * gfn_secToMin
 */
function gfn_secToMin(seconds) {
	if(gfn_isNull(seconds)){
		var result = "00:00:00";
	}else{
		var hour = parseInt(seconds/3600);
		var min = parseInt((seconds%3600)/60);
		var sec = seconds%60;

		var result = pad(hour, 2)+":"+pad(min, 2)+":" + pad(sec, 2);
	}
	
	
	return result;
}

/* 파일 처리 관련 - 시작  */

/* 파일 확장자 체크
 * gfn_fileExtChk2
 * type : 유효성 체크할 파일 타입 카테고리 (VOD, DOC, IMG, ZIP)
 * obj : 단일 파일 오브젝트
 */
function gfn_fileExtChk2(type, obj){
	
	var vdoExtArr = ["avi", "mp4", "mov"];
	var docExtArr = ["docx", "pdf"];
	var imgExtArr = ["gif", "png", "jpg", "jpeg"];
	var zipExtArr = ["zip", "docx", "pdf"];
	
	var fileNm = obj.files[0].name;
	var fileExt = fileNm.slice(fileNm.lastIndexOf(".") + 1).toLowerCase();
	var extArr;
	var msg = "";
	
	if(type == "VDO"){
		extArr = vdoExtArr;
		msg = "avi, mp4, mov 확장자만 업로드 가능합니다.";
	}else if(type == "DOC"){
		extArr = docExtArr;
		msg = "docx, pdf 파일 확장자만 업로드 가능합니다.";
	}else if(type == "IMG"){
		extArr = imgExtArr;
		msg = "gif, png, jpg, jpeg 파일 확장자만 업로드 가능합니다.";
	}else if(type == "ZIP"){
		extArr = zipExtArr;
		msg = "ZIP, docx, pdf 파일 확장자만 업로드 가능합니다.";
	}else{
	} 
	
	if ($.inArray(fileExt, extArr) == -1) {
		alert(msg);
		return false;
	}else{
		return true;
	}
}

/* 이미지 업로드 시 미리보기
 * gfn_changedImgPreview
 * objFile : 단일 파일 오브젝트
 * imgId : 변경할 이미지 태그의 ID
 * */
function gfn_changedImgPreview(objFile, imgId){
	
	var obj = $('#'+imgId);
	var reader = new FileReader();
	
	reader.onload = function (e) {
		obj.attr('src', e.target.result);
	}
	
	reader.readAsDataURL(objFile.files[0]);
}

/* 다중 이미지 업로드 시 미리보기
 * gfn_changedImgPreviewMulti
 * objFile : 멀티 파일 오브젝트
 * imgId : 변경할 이미지 상위 div 태그의 ID
 * */
function gfn_changedImgPreviewMulti(objFile, imgId){
	
	var obj = $('#'+imgId);
	obj.empty();
	$.each(fileChooserObj.files, function(i, file){
		var reader = new FileReader();
		reader.onload = function (e) {
			obj.append('<div><img src="'+e.target.result+'" alt="업로드 썸네일"><span>'+gv_fileLgclArr[i]+'</span></div>').trigger('create');
		}
		reader.readAsDataURL(objFile.files[i]);
	});
	
}

var fileObj = null;			//단일 파일 오브젝트
var gv_fileLgclNm = "";		//단일 파일 업로드 논리명(실제파일명)
var gv_filePhscNm = "";		//단일 파일 업로드 물리명(업로드파일명)
var gv_upldFileTcd = "";	//파일 업로드 파일 유형코드
var gv_upldUsrTcd = "";		//파일 업로드 사용자 유형코드
var gv_upldComp = true;		//파일 업로드 완료 여부

/* 파일 선택 시 이벤트
 * gfn_changedFileObj
 * obj : 단일 파일 오브젝트
 */
function gfn_changedFileObj(obj){
	
	fileObj = obj.files[0];            
	gv_fileLgclNm = ""; 
	gv_filePhscNm = ""; 
	
	gv_fileLgclNm = fileObj.name;
	gv_filePhscNm = gfn_get_dateTime("YYYYMMDDhhmmssms")+"."+ gv_fileLgclNm.split(".")[1];
	
	console.log("##  gv_fileLgclNm : " + gv_fileLgclNm);
	console.log("##  gv_filePhscNm : " + gv_filePhscNm);
}

/* 단일 S3 파일 업로드
 * gfn_s3Upload
 * fileObj : 단일 파일 오브젝트
 * filePhscNm : 단일 파일 업로드 물리명(업로드파일명)
 * fv_uploadCallback : 파일 업로드 완료 후 실행 할 콜백 함수명
 */
function gfn_s3Upload(fileObj, upldUsrTcd, usrId, upldFileTcd, filePhscNm, fv_uploadCallback, progressDiv){
	
	gv_upldUsrTcd = upldUsrTcd;
	gv_upldFileTcd = upldFileTcd;
	
	AWS.config.update({
	    accessKeyId : 'AKIAI3ZWXVNITEP44JFQ',
	    secretAccessKey : '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'
	});
	AWS.config.region = 'ap-northeast-2';
	var bucket = new AWS.S3({params: {Bucket: 'eduhash-upload'}});
	
	if(upldUsrTcd == "user"){

		var params = {Key: "upload" + "/" + upldUsrTcd +  "/" + upldFileTcd + "/" + filePhscNm.substr(0,8)  + "/" + filePhscNm, ContentType: fileObj.type, Body: fileObj, sq: filePhscNm, orgin_name: fileObj.name};
		
	}else if(upldUsrTcd == "partner"){

		var params = {Key: "upload" + "/" + upldUsrTcd +  "/" + usrId + "/" + upldFileTcd + "/" + filePhscNm, ContentType: fileObj.type, Body: fileObj, sq: filePhscNm, orgin_name: fileObj.name};
		
	}
	
	bucket.upload(params, function(err, data) {
		if(JSON.stringify(err) == "null"){
            console.log("=========================완료=========================");
            console.log("[" + params.sq + "] : " + params.orgin_name);
            console.log("=====================================================");
            
            eval(fv_uploadCallback + "('SUCC');");
            
        }else{
            console.log("=========================실패=========================");
            console.log("[" + params.sq + "] : " + params.orgin_name);
            console.log("[error] : " + JSON.stringify(err));
            console.log("=====================================================");
            
            eval(fv_uploadCallback + "('FAIL');");
        }
		
    }).on('httpUploadProgress', function(evt) { 
    	if(upldFileTcd == "VC"){
    		if(!gfn_isNull(progressDiv) && progressDiv != ""){
    			$("#"+progressDiv)[0].value = parseInt((evt.loaded * 100) / evt.total);
    			$("#"+progressDiv).next().html(parseInt((evt.loaded * 100) / evt.total)+"%");
    			/* 사용안함
    			if(parseInt((evt.loaded * 100) / evt.total) < 100){
    				$("#"+progressDiv).prev()[0].style.color = "#105AB5";
    			}else{
    				$("#"+progressDiv).prev()[0].style.color = "#FFFFFF";
    			}
    			*/
    		}else{
    			console.log("["+JSON.stringify(params.sq)+"] "+ params.orgin_name + "_" + parseInt((evt.loaded * 100) / evt.total)+"%");
    		}
    	}
    });
}

var fileChooserObj = null;			//멀티 파일 오브젝트
var gv_fileLgclArr = new Array();	//멀티 파일 업로드 논리명(실제파일명)
var gv_filePhscArr = new Array();	//멀티 파일 업로드 물리명(업로드파일명)

/* 멀티 파일 선택 시 이벤트
 * gfn_changedFileObjMulti
 * obj : 멀티 파일 오브젝트
 */
function gfn_changedFileObjMulti(obj){
	
	fileChooserObj = obj;            
	gv_fileLgclArr = new Array(); 
	gv_filePhscArr = new Array(); 
	
	$.each(fileChooserObj.files, function(i, file){
		if (file) {
			
			var lgcl_filenm = file.name;
			var phsc_filenm = gfn_get_dateTime("YYYYMMDDhhmmssms")+ '' + i;
			
			gv_fileLgclArr[i] = lgcl_filenm;
			gv_filePhscArr[i] = phsc_filenm;
		}
	});
	console.log("##  gv_fileLgclArr : " + gv_fileLgclArr);
	console.log("##  gv_filePhscArr : " + gv_filePhscArr);
}

/* 멀티 S3 파일 업로드
 * gfn_s3UploadMulti
 * fileObj : 단일 파일 오브젝트
 * filePhscNm : 단일 파일 업로드 물리명(업로드파일명)
 * fv_uploadCallback : 파일 업로드 완료 후 실행 할 콜백 함수명
 */
function gfn_s3UploadMulti(fileChooserObj, filePhscArr, fv_uploadCallback){
	
	var uploadCnt = 0;
	
	AWS.config.update({
	    accessKeyId : 'AKIAI3ZWXVNITEP44JFQ',
	    secretAccessKey : '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'
	});
	AWS.config.region = 'ap-northeast-2';
	var bucket = new AWS.S3({params: {Bucket: 'eduhash-upload'}});
	
	$.each(fileChooserObj.files, function(i, file){
		
		var params = {Key: "upload" + "/" + filePhscArr[i], ContentType: file.type, Body: file, sq: filePhscArr[i], orgin_name: file.name};
		
		bucket.upload(params, function(err, data) {
			if(JSON.stringify(err) == "null"){
				uploadCnt++;
                console.log("=========================완료=========================");
                console.log("[" + params.sq + "] : " + params.orgin_name);
                console.log("=====================================================");
            }else{
                console.log("=========================실패=========================");
                console.log("[" + params.sq + "] : " + params.orgin_name);
                console.log("[error] : " + JSON.stringify(err));
                console.log("=====================================================");
            }
			console.log("### 전체건=" + filePhscArr.length + "     진행건=" + uploadCnt);
			if(filePhscArr.length == uploadCnt){
				eval(fv_uploadCallback + "();");
			}
			
        }).on('httpUploadProgress', function(evt) {
        	console.log("["+JSON.stringify(params.sq)+"] "+ params.orgin_name + "_" + parseInt((evt.loaded * 100) / evt.total)+"%");
        });
	});
}
/* 파일 처리 관련 - 끝  */



/* 변경여부 처리 관련 - 시작 */
var resultArr_Start = new Array();
var resultArr_End = new Array();

function gfn_getArrParseFromElement(classNm){
	
	var dataArr = new Array();
	var resultArr = new Array();

	var list = $("."+classNm).get();
	
	for ( var i = 0; i < list.length; i++) {
		
		var dataObj = new Object();
		
		var tagName = $(list[i]).prop('tagName');
		var value;
		
		if(tagName == "SPAN"){
			value 	= $(list[i]).text();
		}else if(tagName == "TEXTAREA"){
			value 	= $(list[i]).text();
		}else if(tagName == "DIV"){
			value 	= $(list[i]).html();
		}else if(tagName == "TABLE"){
			value 	= $(list[i]).html();
		}else if(tagName == "VIDEO"){
			value 	= $(list[i]).attr("src");
		}else if(tagName == "IMG"){
			value 	= $(list[i]).attr("src");
		}else{
			value 	= $(list[i]).val();
		}
		
		dataObj.value = value;
		
		dataArr[i] = dataObj;
	}
	
	resultArr = dataArr;
	
	console.log(dataArr);
	
	return resultArr;
}

function gfn_getFormUpdtSts(){

	var formUpdtSts = false;
	
	for(var i = 0; i < resultArr_Start.length; i++){
		var beforeVal 	= resultArr_Start[i].value;
		var afterVal 	= resultArr_End[i].value;
		
		console.log("[before]"+ beforeVal + "\n[after ]" + afterVal);
		
		if(beforeVal != afterVal){
			formUpdtSts = true;
		}
	}
	
	resultArr_End = new Array();  
	
	return formUpdtSts;
}
/* 변경여부 처리 관련 - 끝  */

/* 더보기 페이징 start end 값 생성
 * fn_morePage
 * obj : 단일 파일 오브젝트
 * brdCnt : 페이지당 게시물 개수
 * 더보기 버튼에 data-num 기본값 1 필요
 */
function fn_morePage(obj,brdCnt) {
	var pageNum = parseInt(obj.data("num")); // 현재 페이지 수
	var nextPageNum = pageNum+1; // 다음 페이지 수
	
	nextPageNum * brdCnt
	var start = ((pageNum * brdCnt) - brdCnt) + 1;
	var end = pageNum * brdCnt;
	
	obj.data("num",nextPageNum); // 페이지 + 1
	
	var map = new HashMap();
	map.put("start",start);
	map.put("end",end);
	
	return map;
}

/* HashMap - 시작 */
HashMap = function(){   
    this.map = new Array(); 
};   
HashMap.prototype = {   
    put : function(key, value){   
        this.map[key] = value; 
    },   
    get : function(key){   
        return this.map[key]; 
    },   
    getAll : function(){   
        return this.map; 
    },   
    clear : function(){   
        this.map = new Array(); 
    },   
    isEmpty : function(){     
         return (this.map.size() == 0); 
    }, 
    remove : function(key){     
         delete this.map[key]; 
    }, 
    toString : function(){ 
        var temp = ''; 
        for(i in this.map){   
            temp = temp + ',' + i + ':' +  this.map[i]; 
        } 
        temp = temp.replace(',',''); 
          return temp; 
    }, 
    keySet : function(){   
        var keys = new Array();   
        for(i in this.map){   
            keys.push(i); 
        }   
        return keys; 
    } 
}; 
/* HashMap - 종료 */

/* date 타입 포멧 변환
 * getFormatDate
 * date : date type
 * formatStr : 구분자 ex) '-','/','.'
 * 더보기 버튼에 data-num 기본값 1 필요
 */
function getFormatDate(targetDate,formatStr){ 
	var date = new Date(targetDate);
	var year = date.getFullYear();	//yyyy 
	var month = (1 + date.getMonth());	//M 
	month = month >= 10 ? month : '0' + month;	// month 두자리로 저장 
	var day = date.getDate();	//d 
	day = day >= 10 ? day : '0' + day;	//day 두자리로 저장 
	return year + formatStr + month + formatStr + day; 
}
function getFormatTime(targetDate){
	var date = new Date(targetDate);
	var hour = date.getHours()>10 ? ""+date.getHours():"0"+date.getHours();
	var min = date.getMinutes()>10 ? ""+date.getMinutes():"0"+date.getMinutes();
	var second = date.getSeconds()>10 ? ""+date.getSeconds():"0"+date.getSeconds();
	
	return hour+":"+min+":"+second;
}

function decodeUTF8(str){
	// 특수문자도 포함할 경우  decodeURIComponent(str) 를 사용. 
	return decodeURIComponent(str); 
}
function encodeUTF8(str){
	// 특수문자도 포함할 경우  encodeURIComponent(str) 를 사용.
	return encodeURIComponent(str);
}

// 커스텀 셀렉트 박스 배경 클릭시 숨김
$(document).mouseup(function (e) {
	var container = $(".sel-box");
	if (!container.is(e.target) && container.has(e.target).length === 0){
		$(".sel-box ul").hide();
	}	
});

Date.prototype.format = function (f) {

    if (!this.valueOf()) return " ";



    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var d = this;



    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {

        switch ($1) {

            case "yyyy": return d.getFullYear(); // 년 (4자리)

            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)

            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)

            case "dd": return d.getDate().zf(2); // 일 (2자리)

            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)

            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)

            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)

            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)

            case "mm": return d.getMinutes().zf(2); // 분 (2자리)

            case "ss": return d.getSeconds().zf(2); // 초 (2자리)

            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

            default: return $1;

        }

    });

};
String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

/* 키오스크용 공통 submit 함수 */
function ComKioskSubmit(opt_formId) {
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.url = "";
	
	$("#commonForm")[0].reset();
	$("#commonForm").empty();
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.addParam = function addParam(key, value){
		$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
	};
	
	this.submit = function submit(){
		var frm = $("#"+this.formId)[0];
		frm.action = this.url;
		frm.method = "post";
		frm.submit();
	};
}

/* 키오스크용 공통 ajax 함수 */
function ComKioskAjax(opt_formId){
	
	this.url = "";		
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.param = "";
	
	$("#commonForm")[0].reset();
	$("#commonForm").empty();
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.setCallback = function setCallback(callBack){
		fv_ajaxCallback = callBack;
	};

	this.addParam = function addParam(key,value){ 
		this.param = this.param + "&" + key + "=" + value; 
	};
	
	this.ajax = function ajax(){
		
		if(this.formId != "commonForm"){
			this.param += "&" + $("#" + this.formId).serialize();
		}
		$.ajax({
			url : this.url,    
			type : "POST",    
			data : this.param,
			datatype : "json",
			async : false,
			beforeSend : function() {
				$.blockUI({
					message:"<img src=\"../../images/kiosk/loading.gif\">",
					css: {
						top:  ($(window).height() - 76) /2 + 'px',
						left: ($(window).width() - 76) /2 + 'px',
						width: '76px',
						backgroundColor: 'rgba(0,0,0,0.0)', //배경투명하게
						color: '#000000',
						border: '0px solid #a00' //테두리 없앰
						}
					});
				 
				console.log("[ajax.beforeSend]");
			},
			success : function(data) {
				console.log("[ajax.success]");
				if(typeof(fv_ajaxCallback) == "function"){
					fv_ajaxCallback(data);
				}else {
					eval(fv_ajaxCallback + "(data);");
				}
			},
			complete:function(){
				console.log("[ajax.complete]");
		    },
		    error:function(request,status,error){
		    	console.log("[ajax.error]");
			}
		});
	};
}

function gfn_screenResize(){
	console.log("########## screen.width : " + screen.width);
	
	if(screen.width > 1920){
		document.body.style.zoom = 120 + "%";
	}else if(screen.width > 1536 && screen.width <= 1920){
		document.body.style.zoom = 100 + "%";
	}else if(screen.width > 1280 && screen.width <= 1536) { /* do something */ 
		document.body.style.zoom = 80 + "%";
	}else if(screen.width > 720 && screen.width <= 1280) { /* do something */ 
		document.body.style.zoom = 67 + "%";
	}else if(screen.width <= 720) { /* do something */ 
		document.body.style.zoom = 37.5 + "%";
	}else {
		document.body.style.zoom = 100 + "%";
	}
}

//yyyy-MM-dd 변환 함수
function gfn_getFormatDate(date){
    var year = date.getFullYear();              // yyyy
    var month = (1 + date.getMonth());          // M
    month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
    var day = date.getDate();                   // d
    day = day >= 10 ? day : '0' + day;          // day 두자리로 저장
    
    return  year + '-' + month + '-' + day;
}

function gfn_getBetweenDay(startDt, endDt){
	
	
	var betweenDay = (new Date(endDt.getTime()) - new Date(startDt.getTime()))/1000/60/60/24; 

	return betweenDay;
}