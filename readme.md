/* techdegree project 1 - Random Quote Generator */
/* November 16, 2018                             */
/*                                               */
/* Using HTML5, CSS, and Javascript to create a  */
/* webpage that randomly displays the contents   */
/* of an array on a page.                        */

#Extra Credit
1. Add more properties to the quote objects
  I added a 'citation' and 'year' property to all quote objects.
  I was able to find citation and year data for two of the objects.

2. Random background color
  I added a random color(hex) generator (line 121) and it is used 
  on line 114.

3. Auto-refresh the quote
  A global variable (line 8) is used to keep track of page refreshing.
  Everytime the quote is manually refreshed, the global timer is reset(line 97,98).
  This prevented multiple calls to 'setInterval()' from piling up and
  executing.
