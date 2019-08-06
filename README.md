# ![Knight](https://image.flaticon.com/icons/png/128/1964/1964610.png) Knight

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lucaspbordignon/knight/blob/master/LICENCE.md)

Knight is an app that calculates all possible moves for a Knight in a chess board,
given a number of turns. It's available under [knightapp.ml](https://knightapp.ml).

The application was developed in Typescript, using Node and React. A
[boilerplate](https://github.com/agencyenterprise/aeboilerplate) project,
from [AE.Studio](https://ae.studio/) was used, in order to accelerate
the development process. It has a code structure that splits the entire
app in two core components, called `Client` and `Api`.

## Algorithm

The board of the chess game was represented through a Bitmap (or bitboard).
A Bitmap is a representation of an 8x8 chess board using a single UInt64.
As this data type has the exact number of bits as the number of houses
in an 8x8 chessboard, we can use each bit to represent whether a given
piece is present in a specific position.

With that representation, it's possible to simple map patterns of
each piece of a chess match (as a knight) and, applying bit shifts and
clippings, find the possible movements from a specific position on the board.

Further explanations can be found
[here](http://pages.cs.wisc.edu/~psilord/blog/data/chess-pages/whiteknightvalid.html).

## Project Structure

The project architecture is based on the boilerplate
project. Few changes and additions has been made to better fit this project
needs.

- Client

  - Api methods: `client/src/api/chess/`
  - Redux methods: `client/src/redux/ducks/chess.ts`
  - Components: `client/src/containers/chess/`
  - Main Container: `client/src/containers/home/`
  - Custom Assets: `client/src/assets/`

- Api
  - Endpoints: `api/src/api/chess/`
  - Services: `api/src/services/chess/`
  - Tests: `api/spec/`

## Screenshot

![Screenshot](./screenshot.png)

## Running

### Development server

To run the development server you must have the following resources:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node 8+](https://nodejs.org/en/)
- [Docker 18+](https://docs.docker.com/install/)
- [Docker Compose 1.21+](https://docs.docker.com/compose/install/)
- [Yarn](https://yarnpkg.com/en/)

After that, you must be able to execute the following command on the root
of the project

```bash
yarn dev
```

### Running tests

Inside the `client/` folder

```bash
yarn client-test
```

Inside the `api/` folder

```bash
yarn api-test-watch
```

## Contributing

As Knight is an open-source project, all help is welcome. If you're
interested in helping growing the project, please read the
[contribution guidelines](https://github.com/lucaspbordignon/knight/blob/master/docs/CONTRIBUTING.md)
as the first step.

As the project was bootstraped by [AE.Studio boilerplate](https://github.com/agencyenterprise/aeboilerplate),
the contribution guidelines are very similir between each other. If you're
interested, complementary information can be found
[here](https://github.com/agencyenterprise/aeboilerplate/blob/master/docs/documentation.md).

## License

This project is licensed under the [MIT License](https://github.com/lucaspbordignon/knight/blob/master/LICENCE.md).

## References and Credits

- [Bitmaps](https://www.chessprogramming.org/Bitboards)
- [Knight Movement over Bitmaps](http://pages.cs.wisc.edu/~psilord/blog/data/chess-pages/nonsliding.html)
- [AE.Studio](https://ae.studio)
- Icons and assets from [flaticon](https://www.flaticon.com/)
