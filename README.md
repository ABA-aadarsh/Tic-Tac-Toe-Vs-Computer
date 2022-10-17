# Tic-Tac-Toe-Vs-Computer

At first it may seem that to make an unbeatable Tic Tac Toe program you need to consider thousands of possibilities and program it mentioning all those thousands of possibilities.

But actually there are fewer points to consider and more importantly a simple logic making system.

The logic system I used for computer to choose position on the Tic Tac Toe board can be simplified as

  (1) Check Attack Possibility
    =>if there is a chance that computer can win in just one move then it will do that, else it goes to (2)
    
  (2) Check Defense Possibility
    =>if the player can win in next move then computer will select position such to defend it, else it goes to (3)
    
  (3) Choose appropriate Position
    =>if above (1) and (2) returns false then computer will select a position such that it has higher possibility for (1) to return true next time,
    and if there are no such position then a random position will be selected

This is the basic logic system here. Besides these there are few extra conditions mentioned while making first choice and second choice, this is to prevent traps and also to set up traps.
