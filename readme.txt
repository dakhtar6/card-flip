A simple game that deals a deck of cards, done as part of a coding test. 

Thoughts for improvement...

Make the design responsive! Currently, its only intended for desktop. 

animate the cards sliding in one by one, as if they were being dealt in by hand

if you really wanted to maximize performance to the utmost one thing you could do is stipulate that the cards are inserted into the DOM all in one go (4 at a time) vs 1 at a time as they currently are. A negligible gain perhaps, but I suppose every ounce counts! 

for more precise control over the suit icons and how they center, use logic that identifies the number and places the suit accordingly. That way, a 10 doesn't share centering meant for a 2. 

use a templating system like hogan, jade, etc to do speedier rendering of the cards perhaps? 

and last but not least, everyone's favorite - unit tests!
