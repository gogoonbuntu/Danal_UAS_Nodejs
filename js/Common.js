<!--

fontsize = 0;

document.onmousedown=function(e)
{
	if( typeof(e)!="undefined" )
	{
		click(e);
	}
	else
	{
		click();
	}
}

document.onkeydown=function(e)
{
	if( typeof(e)!="undefined" )
	{
		keypressed(e);
	}
	else
	{
		keypressed();
	}
}

function click(e)
{
	if(e==null)
	{
		if( (event.button==2) || (event.button==3) )
		{
			alert("오른쪽 버튼은 사용하실 수없습니다");
		}
	}
	else
	{
		if( (e.button==2) || (e.button==3) )
		{
			alert("오른쪽 버튼은 사용하실 수없습니다");
		}
	}
}

function changeFontSize()
{
	var elem_id = new Array('.header01 ul li h1', '.step ul li', '.notice li', '.field', '.value', '.refresh', '#okay', '#cancel', '.box_style03 p');

	$('.btn_plus').click(function(){
		for(i=0; i<elem_id.length; i++)
		{
			var curSize = parseInt($(elem_id[i]).css('font-size')) + 1;
			if(fontsize < 2)
				$(elem_id[i]).css('font-size', curSize);
		}

		if(fontsize < 2)
			fontsize++;
		});

	$('.btn_minus').click(function(){
		for(i=0; i<elem_id.length; i++)
		{
			var curSize = parseInt($(elem_id[i]).css('font-size')) - 1;
			if(fontsize > 0)
				$(elem_id[i]).css('font-size', curSize);
		}

		if(fontsize > 0)
			fontsize--;
	});
}
	
function keypressed(e)
{
	if(e==null)
	{
		if( event.keyCode == 123 || event.keyCode == 17 )
		{
			event.returnValue = false;
		}
	}
	else
	{
		if( e.which == 17 )
		{
			e.returnValue = false;
		}
	}
}
-->
