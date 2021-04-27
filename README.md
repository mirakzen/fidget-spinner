# Fidget Spinner

A virtual fidget spinner made in pure Javascript (without jQuery).

This is modified fork of [Hackinet fidget spinner](https://github.com/Hackinet/fidget-spinner) with the following changes:
* Remove everytime rendering - now it requests animation frame rendering only then try to move spinner;
* Remove setting speed and spin-button;
* Limited maximum speed;
* Connected mouse move angle to spinner angle;
* Centered spinner on the page;
* Recolor background and spinner + modify spinner;
* Added image-link.

Planned improvements:
* Touch support (because original implementation doesn't work);
* Change drawing spinner on every frame to rotating svg spinner ([for example](https://thenounproject.com/term/fidget-spinner/1077097/));
* Changing colors support (maybe just for fun).
