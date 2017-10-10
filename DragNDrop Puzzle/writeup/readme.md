## Problems During Development

### Collision

Had this interesting issue, when the puzzle pieces had the default z-index value (not one specified by me), they would collide with one another. 

![f](https://imgur.com/6ZiIR9p.gif)

I didn't want this, so what I did was create a class named `.highZindexValue`


This class gives the piece a `z-index: 99` temporarily while it is selected. Once its dropped, it loses this class. This allows the select piece to always pass through other pieces. I would toggle the class on the puzzle piece as well.

![f](https://imgur.com/VqnaC6S.png)

### Fixed

![f](https://imgur.com/4qHkedt.gif)
