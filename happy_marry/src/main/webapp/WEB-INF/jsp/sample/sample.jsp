<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/component/include-header.jspf"%>
</head>
<body>
	<h1>Sample Page</h1>
	<table>
		<thead>
			<tr>
				<th>SQ</th>
				<th>EMAIL</th>
				<th>PWD</th>
			</tr>
		</thead>
		<tbody>
			<c:if test="${ fn:length(sampleList) > 0 }">
				<c:forEach var="sample" items="${ sampleList }">
					<tr>
						<td>${ sample.smpSq }</td>
						<td>${ sample.smpEmail }</td>
						<td>${ sample.smpPwd }</td>
					</tr>
				</c:forEach>
			</c:if>
			<c:if test="${ fn:length(sampleList) <= 0 }">
				<tr>
					<td colspan="3">조회 결과가 없습니다</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>