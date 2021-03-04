/**
 * 
 */
var isBarExpanded=true;
var urlGlobal="";
var dataGlobal;

$(document).ready(function(){
	spinnerOff();
});

function spinnerOn() {
	$("#processingSpinner").removeClass("displayNone").addClass("d-flex");
	$("#processingSpinner").addClass("align-items-center");
	$("#processingSpinner").addClass("right50");
	$("#processingSpinner").addClass("zindex1");
}

function spinnerOff() {
	$("#processingSpinner").removeClass("d-flex align-items-center right50 zindex1").addClass("displayNone");
}

function invokeSynchAjax(returnedJson) {
	
	spinnerOn();

	$.ajax({
		url : urlGlobal,
		type : 'GET',
		async: false,
		datatype : 'json',
		success : returnedJson
	});

	spinnerOff();

}

function invokeAjax (returnedJson) {
	
	spinnerOn();

	$.ajax({
		url : urlGlobal,
		type : 'GET',
		contentType : "application/json",
		datatype : 'json',
		success : returnedJson
	});

	spinnerOff();

}

function invokePostAjax () {

	spinnerOn();

	$.ajax({
       type : "POST",
       contentType : "application/json",
       url : urlGlobal,
       data : JSON.stringify(dataGlobal),
       dataType : 'json',
       async: false,
       cache : false,
       timeout : 600000
	});
	
	spinnerOff();
}

function showOptionUrl(url) {
	urlGlobal=url;
	$("#work_area").remove();
	invokeSynchAjax(function(returnedJson) {
		$("#inner_area").append(returnedJson);
	});
}

function manageNav() {

	if(isBarExpanded)
	{
		$("#sidenav").removeClass("sidenav").addClass("sidenav minimized_sidenav");
		$(".menuLabel").removeClass("menuLabel").addClass("menuLabel display_none");
		$(".container").removeClass("sidenav_container").addClass("minimized_sidenav_container");
		$(".vertIcon").removeClass("vertIcon").addClass("vertIcon minimized_vertIcon");
		$(".sidenav li").removeClass("sidenav_li").addClass("sidenav_li minimized_sidenav_li");
		document.getElementById("closebtn").className = "closebtn right40 fas fa-arrow-right mainBackColor";
		isBarExpanded=false;
	} else {
		$("#sidenav").removeClass("minimized_sidenav").addClass("sidenav");
		$(".menuLabel").removeClass("menuLabel display_none").addClass("menuLabel");
		$(".container").removeClass("minimized_sidenav_container").addClass("sidenav_container");
		$(".vertIcon").removeClass("vertIcon minimized_vertIcon").addClass("vertIcon");
		$(".sidenav li").removeClass("sidenav_li minimized_sidenav_li").addClass("sidenav_li");
		document.getElementById("closebtn").className = "closebtn right50 fas fa-arrow-left";
		isBarExpanded=true;	
	}

}