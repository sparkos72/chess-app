$('document').ready(function()
{
	initBoard();
})

function initBoard()
{
	setBoardLayout();
	var piecesData 								= getPiecePostitions();
	positionPieces();
}

function setBoardLayout()
{
	var vp										= getViewportDimensions();
	if (vp.width > vp.height)
	{
		var gameArea							= vp.height;
		var boardSize							= gameArea * 0.9;
		var squareSize							= boardSize / 8;
		var cssMargin							= ((boardSize * 0.1) / 2) + 'px auto';
	}
	else
	{
		var gameArea							= vp.width;
		var boardSize							= gameArea * 0.9;
		var squareSize							= boardSize / 8;
		var cssMargin							= 'auto ' + ((boardSize * 0.1) / 2) + 'px';
	}

	$('#board').css('margin', cssMargin);
	$('#board').css('width', boardSize + 'px').css('height', boardSize + 'px');
	$('#board .square').css('width', squareSize + 'px').css('height', squareSize + 'px');
}

function getPiecePostitions(piecesData)
{
	var white {'p1':,'p2':,'p3':,'p4':,'p5':,'p6':,'p7':,'p8':,'qr':,'kr':,'qk':,'kk':,'qb':,'kb':,'q':,'k':};
	var black {'p1':,'p2':,'p3':,'p4':,'p5':,'p6':,'p7':,'p8':,'qr':,'kr':,'qk':,'kk':,'qb':,'kb':,'q':,'k':};
	return {'white': white, 'black': black};
}

function setPiecePostitions(piecesData)
{

}