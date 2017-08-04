var chessGame = {}

$('document').ready(function() {
    getCurrentPlayer();
    initBoard();
    enablePieces();
})

function getCurrentPlayer() {
    if (chessGame.hasOwnProperty('currentPlayer')) {
        currentPlayer = chessGame.currentPlayer;
    } else {
        var currentPlayer = getCookie('current-player');
        if (currentPlayer == '') {
            currentPlayer = 'white';
            setCookie('current-player', currentPlayer);
        }
        chessGame.currentPlayer = currentPlayer;
    }
    return currentPlayer;
}

function initBoard() {
    var piecePlaces = getPiecePositions();
    getPlaces(piecePlaces);
    initBoardLayout();
}

function initBoardLayout() {
    setBoardLayout();
    $( window ).resize( function() {
        setBoardLayout();
    });
}

function setBoardLayout() {
    var vp = getViewportDimensions();
    if (vp.width > vp.height) {
        var gameArea = vp.height;
        var boardSize = gameArea * 0.9;
        var squareSize = boardSize / 8;
        var cssMargin = ((boardSize * 0.1) / 2) + 'px auto';
    } else {
        var gameArea = vp.width;
        var boardSize = gameArea * 0.9;
        var squareSize = boardSize / 8;
        var cssMargin = 'auto ' + ((boardSize * 0.1) / 2) + 'px';
    }

    // board dimensions
    $('#board').css('margin', cssMargin);
    $('#board').css('width', boardSize + 'px').css('height', boardSize + 'px');
    $('#board .square').css('width', squareSize + 'px').css('height', squareSize + 'px');

    // chess piece positioning
    var pieceDimensions = squareSize / 3;
    $('#board .chess-piece')
        .css('width', pieceDimensions + 'px')
        .css('height', pieceDimensions + 'px')
        .css('top', pieceDimensions + 'px')
        .css('left', pieceDimensions + 'px');
}

function getPiecePositions() {
    var piecePositions = {};
    if (chessGame.hasOwnProperty('piecePositions')) {
        piecePositions = chessGame.piecePositions;
    } else {
        var jsonPiecePositions = getCookie('piece-positions');
        if (jsonPiecePositions != '') {
            piecePositions = JSON.parse(jsonPiecePositions);
        } else {
            piecePositions = startingPiecePostitions();
            setCookie('piece-positions', JSON.stringify(piecePositions));
        }
        chessGame.piecePositions = piecePositions;
    }
    return {'white': piecePositions.white, 'black': piecePositions.black};
}

function getPlaces(piecePlaces) {
    var white = piecePlaces.white;
    $.each(white, function(piece, postition) {
        getPlace(piece, postition, 'white')
    });
    var black = piecePlaces.black;
    $.each(black, function(piece, postition) {
        getPlace(piece, postition, 'black')
    });
}

function getPlace(piece, postition, colour) {
    var chessPiece = placePiece(piece, colour);
    $('#' + postition.col + ' .' + postition.row ).html(chessPiece);
}

function placePiece(piece, colour) {
    var chessPiece = '<div class="chess-piece ' + piece + ' ' + colour + '" data-piece="' + piece + '">' + piece + '</div>';
    return chessPiece;
}

function startingPiecePostitions(piecePlaces) {
    var white = {
        'p1' : {'col':'b', 'row': 'sq-1'},
        'p2' : {'col':'b', 'row': 'sq-2'},
        'p3' : {'col':'b', 'row': 'sq-3'},
        'p4' : {'col':'b', 'row': 'sq-4'},
        'p5' : {'col':'b', 'row': 'sq-5'},
        'p6' : {'col':'b', 'row': 'sq-6'},
        'p7' : {'col':'b', 'row': 'sq-7'},
        'p8' : {'col':'b', 'row': 'sq-8'},
        'qr' : {'col':'a', 'row': 'sq-1'},
        'kr' : {'col':'a', 'row': 'sq-8'},
        'qk' : {'col':'a', 'row': 'sq-2'},
        'kk' : {'col':'a', 'row': 'sq-7'},
        'qb' : {'col':'a', 'row': 'sq-3'},
        'kb' : {'col':'a', 'row': 'sq-6'},
        'qu' : {'col':'a', 'row': 'sq-4'},
        'ki' : {'col':'a', 'row': 'sq-5'}
    };
    var black  = {
        'p1' : {'col':'g', 'row': 'sq-1'},
        'p2' : {'col':'g', 'row': 'sq-2'},
        'p3' : {'col':'g', 'row': 'sq-3'},
        'p4' : {'col':'g', 'row': 'sq-4'},
        'p5' : {'col':'g', 'row': 'sq-5'},
        'p6' : {'col':'g', 'row': 'sq-6'},
        'p7' : {'col':'g', 'row': 'sq-7'},
        'p8' : {'col':'g', 'row': 'sq-8'},
        'qr' : {'col':'h', 'row': 'sq-1'},
        'kr' : {'col':'h', 'row': 'sq-8'},
        'qk' : {'col':'h', 'row': 'sq-2'},
        'kk' : {'col':'h', 'row': 'sq-7'},
        'qb' : {'col':'h', 'row': 'sq-3'},
        'kb' : {'col':'h', 'row': 'sq-6'},
        'qu' : {'col':'h', 'row': 'sq-4'},
        'ki' : {'col':'h', 'row': 'sq-5'}
    };
    return {'white': white, 'black': black};
}

function enablePieces() {
    if (chessGame.currentPlayer == 'white') {
        $('chess-piece.whote').removeClass('disabled');
        $('chess-piece.black').addClass('disabled');
    }
    setActivePieces(chessGame.currentPlayer);
}

function setActivePieces() {
    $('chess-piece').removeClass('active');
    $('.chess-piece').each(function() {
        if (! $(this).hasClass('disabled')) {
            // get position
            var col = $(this).parents('.square:first').data('col');
            var row = $(this).parents('.row:first').data('row');
            // get piece
            var chessPiece = translateCPCode($(this).data('piece'));
            if (canMove(chessPiece, col, row)) {
                $(this).addClass('active');
            }
        }
    });
}

function translateCPCode(cpCode) {
    chessPiece = '';
    if (cpCode[0] == 'p') {
            chessPiece = 'pawn';
    } else {
        switch (cpCode[1]) {
            case 'r':
                chessPiece = 'rook';
                break;
            case 'k':
                chessPiece = 'knight';
                break;
            case 'b':
                chessPiece = 'bishop';
                break;
            case 'u':
                chessPiece = 'queen';
                break;
            case 'i':
                chessPiece = 'king';
                break;
        }
    }
    return chessPiece;
}

function canMove(chessPiece, col, row) {

}

/*
p1
p2
p3
p4
p5
p6
p7
p8
qr
qk
qb
qu
ki
kb
kk
kr
*/