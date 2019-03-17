# Memory Game Project
This game uses HTML, CSS and Vanilla JavaScript.

## Table of Contents

- [Memory Game Project](#memory-game-project)
  - [Table of Contents](#table-of-contents)
  - [How to Play](#how-to-play)
  - [Instructions](#instructions)
  - [Interface Design](#interface-design)
  - [Documentation](#documentation)
  - [Contributing](#contributing)

## How to Play
1. Click on any card to reveal a symbol.
2. Click on another card to find the matching symbol.
3. Use your memory to remember what symbol shows up on which card.
4. You win the game when all 16 cards are matched!

## Instructions
Memory Game Logic - The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

Congratulations Popup - When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It also tell the user how much time it took to win the game, how many moves were taken and what the star rating was.

Restart Button - A restart button allows the player to reset the game board, the timer, and the star rating.

Star Rating - The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it displays at least 3 stars. After some number of moves, it changes to a lower star rating. After a few more moves, it changes to a even lower star rating (down to 1).

Timer - When the player starts a game, a displayed timer also starts. Once the player wins the game, the timer stops.

Move Counter - Game displays the current number of moves a user has made.

## Interface Design

Styling - Application uses CSS to style components for the game.

Usability - All application components are usable across modern desktop, tablet, and phone browsers.

## Documentation
Comments - Comments are present and effectively explain longer code procedure when necessary.

Code Quality - Code is formatted with consistent, logical, and easy-to-read formatting as described in the Udacity JavaScript Style Guide.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
