<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"   "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@include file="header.jsp"%>

<div id="layout">
	<!-- 	<div id="server_message_outer"> -->
	<!-- 		<div id='processMessage' class='processMessage'></div> -->
	<!-- 	</div> -->

	<!-- Just an image -->
	<nav class="navbar navbar-light bg-light"> <a
		class="navbar-brand" href="#"> <img
		src="/view.template/images/logo.svg">
	</a>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item active"><a class="nav-link" href="#">Home
					<span class="sr-only">(current)</span>
			</a></li>
			<li class="nav-item"><a class="nav-link" href="#"><label>Features</label></a></li>
			<li class="nav-item"><a class="nav-link" href="#"><label>Pricing</label></a></li>
			<li class="nav-item"><a class="nav-link disabled" href="#"><label>Disabled</label></a>
			</li>
		</ul>
	</div>
	</nav>

	<div id="mySidenav"
		class="${isBarExpanded ? 'sidenav' : 'sidenav minimized_sidenav'}">
		<a href="javascript:manageNav()"> <i id="closebtn" class="${isBarExpanded ? 'closebtn right50 fas fa-arrow-left' : 'closebtn right40 fas fa-arrow-right mainBackColor'}"></i></a>
		<ul>
			<c:forEach var="option" items="${verticalNavBar}">
				<li
					class="${isBarExpanded ? 'sidenav_li' : 'sidenav_li minimized_sidenav_li'}"><a
					href="${option.uri}"> <i
						class="${isBarExpanded ?'vertIcon '.concat(option.icon) : 'vertIcon minimized_vertIcon '.concat(option.icon)}"></i>
						<label
						class="${isBarExpanded ? 'menuLabel' : 'menuLabel display_none'}">${option.label}</label>
				</a></li>
			</c:forEach>
		</ul>
	</div>
</div>