$('document').ready(function()
{
	initBoard();
})

function initBoard()
{
	initBoardLayout();

	var piecesData 								= getPiecePostitions();
	positionPieces();
}


function initBoardLayout()
{
	setBoardLayout();
	$( window ).resize( function()
	{
		setBoardLayout();
	});
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
	var white 									= {
		'p1'									: 'b1',
		'p2'									: 'b2',
		'p3'									: 'b3',
		'p4'									: 'b4',
		'p5'									: 'b5',
		'p6'									: 'b6',
		'p7'									: 'b7',
		'p8'									: 'b8',
		'qr'									: 'a1',
		'kr'									: 'a8',
		'qk'									: 'a2',
		'kk'									: 'a7',
		'qb'									: 'a3',
		'kb'									: 'a6',
		'q'										: 'a4',
		'k'										: 'a5'
	};
	var black 									= {
		'p1'									: 'b1',
		'p2'									: 'b2',
		'p3'									: 'b3',
		'p4'									: 'b4',
		'p5'									: 'b5',
		'p6'									: 'b6',
		'p7'									: 'b7',
		'p8'									: 'b8',
		'qr'									: 'a1',
		'kr'									: 'a8',
		'qk'									: 'a2',
		'kk'									: 'a7',
		'qb'									: 'a3',
		'kb'									: 'a6',
		'q'										: 'a4',
		'k'										: 'a5'
	};
	return {'white': white, 'black': black};
}

function setPiecePostitions(piecesData)
{

}