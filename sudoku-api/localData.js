const createPuzzleObj = (puzzle, solution, id) => {
    return {
        puzzle: { S: puzzle },
        solution: { S: solution },
        id: { S: id },
    };
};

const localData = {
    puzzlesResponse: {
        Items: [
            createPuzzleObj(
                '[[null,7,null,null,null,8,null,null,2],[null,3,5,7,1,null,9,4,8],[8,1,2,3,null,null,null,7,null],[null,5,6,null,null,null,8,null,1],[3,9,null,null,8,null,null,null,7],[null,null,null,1,null,null,null,null,4],[null,null,null,null,8,5,null,null,null],[null,5,null,null,6,3,1,7,4],[7,null,null,null,null,null,5,3,null]]',
                '[[9,7,4,5,6,8,3,1,2],[6,3,5,7,1,2,9,4,8],[8,1,2,3,4,9,6,7,5],[4,5,6,2,9,7,8,3,1],[3,9,1,4,8,6,5,2,7],[2,8,7,1,5,3,9,6,4],[1,4,3,7,8,5,6,2,9],[8,5,9,2,6,3,1,7,4],[7,2,6,4,9,1,5,3,8]]',
                '2187',
            ),
            createPuzzleObj(
                '[[4,null,null,7,null,null,3,null,null],[null,null,1,4,5,null,8,7,null],[null,null,null,3,null,8,null,4,2],[9,4,2,1,null,null,6,7,null],[null,6,null,null,null,5,null,3,null],[7,3,5,null,2,4,null,9,null],[null,9,7,null,1,null,null,3,4],[null,null,null,9,8,null,null,null,7],[null,null,null,null,null,null,5,null,9]]',
                '[[4,6,8,7,2,1,3,5,9],[3,2,1,4,5,9,8,7,6],[9,5,7,3,6,8,1,4,2],[9,4,2,1,8,3,6,7,5],[1,6,8,7,9,5,2,3,4],[7,3,5,6,2,4,8,9,1],[8,9,7,5,1,6,2,3,4],[5,4,3,9,8,2,6,1,7],[2,1,6,4,7,3,5,8,9]]',
                '6470',
            ),
            createPuzzleObj(
                '[[null,1,null,2,null,null,8,4,5],[2,9,null,1,8,null,7,6,3],[null,null,5,6,7,4,null,null,2],[null,null,null,null,null,null,null,null,2],[null,null,8,5,4,2,3,null,6],[null,6,3,null,1,8,null,4,9],[3,6,null,null,2,9,4,5,8],[null,null,null,null,null,null,6,3,7],[null,5,7,null,8,6,null,null,null]]',
                '[[6,1,7,2,9,3,8,4,5],[2,9,4,1,8,5,7,6,3],[8,3,5,6,7,4,1,9,2],[5,7,4,9,3,6,1,8,2],[9,1,8,5,4,2,3,7,6],[2,6,3,7,1,8,5,4,9],[3,6,1,7,2,9,4,5,8],[8,2,9,4,5,1,6,3,7],[4,5,7,3,8,6,9,2,1]]',
                '4610',
            ),
            createPuzzleObj(
                '[[null,6,null,null,null,null,null,null,7],[5,7,2,null,8,null,1,null,6],[null,8,null,null,null,7,null,null,9],[null,1,null,null,null,null,null,null,2],[null,9,7,2,null,null,null,6,1],[2,null,8,9,null,null,null,null,4],[7,null,8,6,null,3,2,5,null],[null,null,null,null,null,null,7,null,null],[null,3,5,8,null,2,null,9,null]]',
                '[[4,6,9,1,2,5,3,8,7],[5,7,2,9,8,3,1,4,6],[3,8,1,6,4,7,5,2,9],[5,1,4,8,7,6,9,3,2],[3,9,7,2,5,4,8,6,1],[2,6,8,9,1,3,7,5,4],[7,4,8,6,9,3,2,5,1],[6,2,9,4,1,5,7,3,8],[1,3,5,8,7,2,4,9,6]]',
                '2166',
            ),
            createPuzzleObj(
                '[[4,9,null,5,6,null,null,8,null],[3,null,1,null,7,null,null,null,null],[7,8,6,null,null,9,4,null,3],[null,5,1,null,4,6,8,null,9],[null,4,2,null,null,null,6,null,null],[6,null,null,9,null,5,null,null,null],[6,7,null,3,null,null,null,null,null],[null,2,null,null,9,4,1,null,6],[null,9,1,5,null,null,null,null,4]]',
                '[[4,9,2,5,6,3,1,8,7],[3,5,1,4,7,8,2,6,9],[7,8,6,1,2,9,4,5,3],[7,5,1,2,4,6,8,3,9],[9,4,2,8,3,7,6,1,5],[6,3,8,9,1,5,2,4,7],[6,7,4,3,1,8,9,2,5],[5,2,3,7,9,4,1,8,6],[8,9,1,5,6,2,3,7,4]]',
                '1925',
            ),
        ],
    },
    infoResponse: {
        Table: { ItemCount: 12345 },
    },
};

module.exports = localData;
