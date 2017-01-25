$('document').ready(function()
{
	initBoard();
})

function initBoard()
{
	initBoardLayout();

	var piecesData 								= getPiecePostitions();
	setPiecePositions(piecesData);
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
		'p1'									: {'col':'b', 'row': 'sq-1'},
		'p2'									: {'col':'b', 'row': 'sq-2'},
		'p3'									: {'col':'b', 'row': 'sq-3'},
		'p4'									: {'col':'b', 'row': 'sq-4'},
		'p5'									: {'col':'b', 'row': 'sq-5'},
		'p6'									: {'col':'b', 'row': 'sq-6'},
		'p7'									: {'col':'b', 'row': 'sq-7'},
		'p8'									: {'col':'b', 'row': 'sq-8'},
		'qr'									: {'col':'a', 'row': 'sq-1'},
		'kr'									: {'col':'a', 'row': 'sq-8'},
		'qk'									: {'col':'a', 'row': 'sq-2'},
		'kk'									: {'col':'a', 'row': 'sq-7'},
		'qb'									: {'col':'a', 'row': 'sq-3'},
		'kb'									: {'col':'a', 'row': 'sq-6'},
		'q'										: {'col':'a', 'row': 'sq-4'},
		'k'										: {'col':'a', 'row': 'sq-5'}
	};
	var black 									= {
		'p1'									: {'col':'g', 'row': 'sq-1'},
		'p2'									: {'col':'g', 'row': 'sq-2'},
		'p3'									: {'col':'g', 'row': 'sq-3'},
		'p4'									: {'col':'g', 'row': 'sq-4'},
		'p5'									: {'col':'g', 'row': 'sq-5'},
		'p6'									: {'col':'g', 'row': 'sq-6'},
		'p7'									: {'col':'g', 'row': 'sq-7'},
		'p8'									: {'col':'g', 'row': 'sq-8'},
		'qr'									: {'col':'h', 'row': 'sq-1'},
		'kr'									: {'col':'h', 'row': 'sq-8'},
		'qk'									: {'col':'h', 'row': 'sq-2'},
		'kk'									: {'col':'h', 'row': 'sq-7'},
		'qb'									: {'col':'h', 'row': 'sq-3'},
		'kb'									: {'col':'h', 'row': 'sq-6'},
		'q'										: {'col':'h', 'row': 'sq-4'},
		'k'										: {'col':'h', 'row': 'sq-5'}
	};
	return {'white': white, 'black': black};
}

function setPiecePositions(piecesData)
{
	// set whites
	var white									= piecesData.white;
	$.each(white, function(piece, postition)
	{
		setPiecePosition(piece, postition, 'white')
	});

	// set blacks
	var black									= piecesData.black;
	$.each(black, function(piece, postition)
	{
		setPiecePosition(piece, postition, 'black')
	});
}

function setPiecePosition(piece, postition, colour)
{
	$('#' + postition.col + ' .' + postition.row ).html(piece);
}