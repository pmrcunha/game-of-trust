# Conway's Game of Trust
## A Trustpilot flavored version of Conway's Game of Life


### How to play
##### Single player
Your goal is to get the highest review score possible, i.e. as many review stars as possible.

You can place 25 stars in the board, in 25 red stars (1 star review), 5 green stars (5 star review) or any combination in between. You click multiple times to cycle through the possible stars.

When you are satisfied with your pattern, click start.
The game ends after 1000 turns.

At each turn in the game, the following transitions occur:

-   Any review cell with fewer than two neighbor reviews becomes inactive, because no one cares about this company anymore.
-   Any review cell with two or three neighbor reviews is a solid review, and stays the same.
-   Any review cell with more than three neighbors decays one value, because there is always someone complaining when you have a lot of reviews.
-   Any inactive cell with exactly three neighbor reviews becomes a review cell, with the highest rating of the three or, if the three are the same, one value above, as if this review was affected by peer pressure.
