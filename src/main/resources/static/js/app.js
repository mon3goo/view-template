/**
 * 
 */

var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/view.template/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

var url="";

var reportName="";
var reportDesc="";
var reportShortDesc="";
var fieldToSave= new Array();
var candidateProjects = new Array();
var selectedReports = new Array();
var fieldId="";
var iconpickerValue="";
var condFormatDefaultButton="<button th:id='fieldPlusButton'" +
"class='roundbtn btn-sm' data-toggle='tooltip'" +
"title='Adicionar' th:onclick='javascript:addConditionalFormat(\" teste + \")'> " +
"<i th:id='fieldPlusIcon_' class='fas fa-plus'></i></button>"
var isBarExpanded=true;
var data = new FormData();

jQuery(document).ready(function(){
	$("#processMessage2").hide();
});

$(document).ready(function(){
//	$('[data-toggle="tooltip"]').tooltip(); 

	url="checkNavBarInfo";
	invokeAjax(function( returnedJson ) {
		if (returnedJson==false)
		{
			$("#mySidenav").removeClass("sidenav").addClass("sidenav minimized_sidenav");
			$(".menuLabel").removeClass("menuLabel").addClass("menuLabel display_none");
			$(".container").removeClass("sidenav_container").addClass("minimized_sidenav_container");
			$(".vertIcon").removeClass("vertIcon").addClass("vertIcon minimized_vertIcon");
			$(".sidenav li").removeClass("sidenav_li").addClass("sidenav_li minimized_sidenav_li");
			document.getElementById("closebtn").className = "closebtn right40 fas fa-arrow-right mainBackColor";
			isBarExpanded=false;
		} else {
			$("#mySidenav").removeClass("minimized_sidenav").addClass("sidenav");
			$(".menuLabel").removeClass("menuLabel display_none").addClass("menuLabel");
			$(".container").removeClass("minimized_sidenav_container").addClass("sidenav_container");
			$(".vertIcon").removeClass("vertIcon minimized_vertIcon").addClass("vertIcon");
			$(".sidenav li").removeClass("sidenav_li minimized_sidenav_li").addClass("sidenav_li");
			document.getElementById("closebtn").className = "closebtn right50 fas fa-arrow-left";
			isBarExpanded=true;		
		}
	});	

});

function exportDataFromTable()
{
	var table = $('#reports_tbl').DataTable();
	data = new FormData();
	data = table.buttons.exportData();

}

function addConditionalFormat (fieldId)
{

	this.fieldId=fieldId;

	this.getFieldContext(fieldId);

	$("#fieldModal").modal();


}


//AJAX invocation
function getFieldContext (fieldId)
{

//	$( "#progressbar" ).progressbar({
//	value: false
//	});

	$( "#progressbar" ).show();
	$( "#dataZone" ).hide();

	data = new FormData();

	data.append("fieldId", fieldId);

//	alert (data);
//	alert (JSON.stringify(data));

	$.ajax({
		url:'/tuleap.plugins/getFieldContext',
		data: data,
		type: 'POST',
		dataType: 'html',
		cache: false,
		processData: false, // Don't process the files
		contentType: false,
		success:
			function(returnObject)
			{
//			alert(returnObject);
			var returnObjectJSON = JSON.parse(returnObject);

//			alert(returnObjectJSON.id);
//			alert(returnObjectJSON.type);
//			$( ".fieldLabel" ).text( returnObjectJSON.id );
			$( "#fieldLabel" ).text( returnObjectJSON.label );
			if (returnObjectJSON.type=="string")
			{
				$( "#conditionalSelectFieldDiv").hide();
				$( "#conditionalNumericField" ).hide();
				$( "#conditionalTextFieldDiv" ).show();
			}
			if (returnObjectJSON.type=="sb")
			{
				var selectedFieldList = $("#conditionalSelectField");
//				$.each(returnObjectJSON.listValues, function(item) {
//				alert(item);
//				optionsValues += '<option value="' + item + '">' + item + '</option>';
//				});
//				selectedFieldList.
				selectedFieldList.find('option').remove();

				$.each(returnObjectJSON.listValues, function(key, val) {
					selectedFieldList.append(new Option(val, key));
				});
				$( "#conditionalSelectFieldDiv").show();
				$( "#conditionalNumericField" ).hide();
				$( "#conditionalTextFieldDiv" ).hide();
			}
//			alert("a sair");
			$("#progressbar").hide();
			$("#dataZone").show();
			}
	});		
}

//AJAX invocation
function saveConditionalFormat ()
{
	$( "#progressbar" ).show();
	$( "#dataZone" ).hide();

	data = new FormData();

//	alert(this.iconpickerValue);
	data.append("fieldId", this.fieldId);
	data.append("fieldValue", $( "#conditionalTextField" ).val().concat($( "#conditionalNumericField" ).val()).concat($( "#conditionalSelectField option:selected" ).text()));
	data.append("fieldOperator", $( "#conditionalSelectOperator" ).val());
	data.append("fieldIcon", $( "#iconPickerValue" ).val());
	data.append("fieldColor", $( "#inputFieldColor" ).val());

	$.ajax({
		url:'/tuleap.plugins/saveConditionalFormat',
		data: data,
		type: 'POST',
		dataType: 'html',
		cache: false,
		processData: false, // Don't process the files
		contentType: false,
		success:
			function(returnObject)
			{
//			alert(returnObject);
			var returnObjectJSON = JSON.parse(returnObject);

//			alert(returnObjectJSON.id);
//			alert(returnObjectJSON.type);
//			$( ".fieldLabel" ).text( returnObjectJSON.id );
			$( "#fieldLabel" ).text( returnObjectJSON.label );
			if (returnObjectJSON.type=="string")
			{
				$( "#conditionalSelectFieldDiv").hide();
				$( "#conditionalNumericField" ).hide();
				$( "#conditionalTextFieldDiv" ).show();
			}
			if (returnObjectJSON.type=="sb")
			{
				var selectedFieldList = $("#conditionalSelectField");
//				$.each(returnObjectJSON.listValues, function(item) {
//				alert(item);
//				optionsValues += '<option value="' + item + '">' + item + '</option>';
//				});
//				selectedFieldList.
				selectedFieldList.find('option').remove();

				$.each(returnObjectJSON.listValues, function(key, val) {
					selectedFieldList.append(new Option(val, key));
				});
				$( "#conditionalSelectFieldDiv").show();
				$( "#conditionalNumericField" ).hide();
				$( "#conditionalTextFieldDiv" ).hide();
			}
//			alert("a sair");
			$("#progressbar").hide();
			$("#dataZone").show();
			}
	});

}

/*navbar*/
//function openNav() {
//document.getElementById("mySidenav").style.width = "3%";
//document.getElementById("main").style.marginLeft = "3%";
////document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
//}

function manageNav() {
//	alert("entrei");

	if(isBarExpanded)
	{
		$("#mySidenav").removeClass("sidenav").addClass("sidenav minimized_sidenav");
		$(".menuLabel").removeClass("menuLabel").addClass("menuLabel display_none");
		$(".container").removeClass("sidenav_container").addClass("minimized_sidenav_container");
		$(".vertIcon").removeClass("vertIcon").addClass("vertIcon minimized_vertIcon");
		$(".sidenav li").removeClass("sidenav_li").addClass("sidenav_li minimized_sidenav_li");
		document.getElementById("closebtn").className = "closebtn right40 fas fa-arrow-right mainBackColor";
		isBarExpanded=false;
	} else {
		$("#mySidenav").removeClass("minimized_sidenav").addClass("sidenav");
		$(".menuLabel").removeClass("menuLabel display_none").addClass("menuLabel");
		$(".container").removeClass("minimized_sidenav_container").addClass("sidenav_container");
		$(".vertIcon").removeClass("vertIcon minimized_vertIcon").addClass("vertIcon");
		$(".sidenav li").removeClass("sidenav_li minimized_sidenav_li").addClass("sidenav_li");
		document.getElementById("closebtn").className = "closebtn right50 fas fa-arrow-left";
		isBarExpanded=true;	
	}

	updateNavBarInfo ();

}

function invokeAjax (returnedJson) {
	$('.container').append('<div id="processMessage2" class="processMessage processMessage2 processingcard"><i class="fa fa-spinner fa-spin fa-3x fa-fw faama"></i><label>Em processamento no servidor...</label></div>');
	$("#processMessage2").show();
	$.ajax({
		url : '/view.template/'+url,
		type : 'GET',
		async: false,
		datatype : 'json',
		beforeSend: function ( xhr ) {    
//			$('#processMessage').show();
			$("#processMessage2").show();
//			alert ("hello2");
		},
		success : returnedJson,
//		success : function(returnedJson)
//		{
//		$("#processMessage").hide();
//		return returnedJson;
//		},
		complete : $("#processMessage2").hide()
	});
	
	$(".processMessage2").hide();
//	$(".processMessage").hide();
	
}

function invokePostAjax (returnedJson) {
	$.ajax({
		url:'/view.template/'+url,
//		url: url,
		data: data,
		type: 'POST',
		async: true,
//		dataType: 'html',
		dataType: 'json',
		success : returnedJson,
		cache: false,
		processData: false, // Don't process the files
		contentType: false
	});	

}

function updateNavBarInfo ()
{
//
//	data = new FormData();
//	data.append("isBarExpanded", isBarExpanded);
//	url="report/updateNavBarInfo";
//	invokePostAjax();

}

function addRemoveProject (projectId) {

//	alert ("entrou addRemoveProject - " + projectId);
//	alert ("entrou candidateProjects - " + candidateProjects);
//	alert ("document.getElementById(chkProj_ + projectId).checked" + document.getElementById("chkProj_" + projectId).checked);

	fLen = candidateProjects.length;

	if (document.getElementById("chkProj_" + projectId).checked==true)
	{
		candidateProjects.push(projectId);
	}
	else
	{
		for (i = 0; i < fLen; i++) {
			if (candidateProjects[i]==projectId)
			{
				delete candidateProjects[i];
				break;
			}
		}
	}

//	alert ("sai candidateProjects - " + candidateProjects);
}

function showProjects (showDiv) {

	if (showDiv=='true')
	{
		$("#cadidateProjectsDiv").show();
	}
	else
	{
		$("#cadidateProjectsDiv").hide();
		document.getElementById('chkAllProjectsReport').checked==true;
		updateAllProjects();
	}
}

function resetReport(){
	reportName="";
	reportDesc="";
	reportShortDesc="";
	fieldToSave= new Array();
	candidateProjects = new Array();
//	$('#search-jstree-project').jstree("destroy");
}

function updateAllProjects() {
//	alert ("updateAllProjects");
//	document.getElementsByName('chkChildProj').click();
	checkboxes = document.getElementsByName('chkChildProj');
//	alert("document.getElementById('chkAllProjectsReport') - " + document.getElementById('chkAllProjectsReport').checked);
	for(var i=0, n=checkboxes.length;i<n;i++) {
		if (document.getElementById('chkAllProjectsReport').checked==true)
		{
			checkboxes[i].checked = true;
//			alert ("true");
		}
		else
		{
			checkboxes[i].checked = false;
//			alert ("falso");
		}
//		alert ("checkboxes[i].id.substring(8)" + checkboxes[i].id.substring(8));
		addRemoveProject(checkboxes[i].id.substring(8));
	}
}


//var condFormatDefaultButton="<button th:id='fieldPlusButton'" +
//"class='roundbtn btn-sm' data-toggle='tooltip'" +
//"title='Adicionar' th:onclick='javascript:addConditionalFormat(\" teste + \")'> " +
//"<i th:id='fieldPlusIcon_' class='fas fa-plus'></i></button>"

var condFieldList="";

function returnConditionalFormatDTField (conditionalFormatRow)
{
	var labelToInsert="";
	condFieldList="";
	presentationName=conditionalFormatRow.presentationName;
//	var data = new FormData();
//	alert(JSON.stringify(conditionalFormatRow.conditionalFormatting));
	if (conditionalFormatRow.conditionalFormatting!="")
	{
		conditionalFormatRow.conditionalFormatting.forEach(formatCond);
//		labelToInsert=labelToInsert;
	}
//	else
//	{
	return condFieldList + condFormatDefaultButton;
//	}
}

var presentationName="";

function formatCond (item, index) {
//	alert (JSON.stringify(item));
	var labelToInsert="<label class='condFormatLabel'>";
	labelToInsert=labelToInsert + presentationName + ' ' + item.fieldOperator + ' ' + item.valueCondition 
	+ ' </label><i class="' + item.icon + '" style="font-size:'+ item.font +'; color:' + item.color + ';" ></i> <br>';
	condFieldList=condFieldList+labelToInsert;
}

function associateExistingProject (projectId)
{
//	var data = new FormData();
//	alert(conditionalFormatRow.id);
	return condFormatDefaultButton;
}
