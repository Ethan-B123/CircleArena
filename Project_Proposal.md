# CircleArena

## Overview:

  CircleArena is a game about staying in the arena for as long as possible. Enemies will spawn at random positions around the player and try to hit the player out of the circle. At first, the player will have to ram into the enemies to knock them out of the circle, but as the game goes on the player can pick up powerups to blast the enemies back.

## Functionality & MVPs

In CircleArena users will be able to:

 * use the arrow keys to move around the arena
 * run into and bounce off enemies
 * get a shockwave powerup to knock back enemies
 * adjust difficulty
 * see the current score


## Wireframes

The page will include an HTML5 canvas for rendering the game, a button to start a new game, a footer that displays the user's current score and difficulty rating, and the title of the game that links to the GitHub repo.

![Wireframe](https://i.imgur.com/sXwAMHp.png)


## Architecture and Technologies

This project will be implemented with the following technologies:

* Vanilla JavaScript for overall structure and game logic
* HTML5 Canvas for rendering
* Webpack to bundle and serve up the various scripts.


## Implementation Timeline

**Over the weekend:**
* setup skeleton HTML page with canvas, CSS styling, and webpack

**Day 1:**
* create CollisionCircle class
  * `update()`
  * `render()`
  * `applyForce(x,y)` (used for movement, not collisions)
* get user input
* setup update loop

**Day 2:**
* create board class
  * `update()`
  * `spawnEnemy(n=1)`
* get collisions / bouncing working with immobile enemies

**Day 3:**
* create enemy AI
* style board
* create moving camera

**Day 4:**
* create powerup
* add difficulty levels
