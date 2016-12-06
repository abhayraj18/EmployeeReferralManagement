<html>
<body>
Hi $mailDetail.candidateName,<br/>
#if($mailDetail.role)
	This is an interview call letter for the position of <b>$mailDetail.role</b> from Tavant Technologies.<br/><br/>
#else
	This is an interview call letter from Tavant Technologies.<br/><br/>
#end
<b>Date:</b> $mailDetail.date<br/>
<b>Venue:</b> $mailDetail.location<br/>
<br/>

Please Carry below documents when you come for interview:<br/>
1. Latest Resume<br/>
2. Any Government ID proof<br/>
3. Hard copy of this email<br/>
<br/>
Regards,<br/>
$mailDetail.senderName<br/>
$mailDetail.senderDesignation<br/>
Tavant Technologies<br/>
Ph: $mailDetail.phone<br/>
</body>
</html>