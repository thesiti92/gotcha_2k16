# Milton Academy Gotcha 2016

Every year, my high school plays an all-school game of tag called Gotcha (some other places call it Ninja or Assassin). In short, if Bob has Jack as a target and Jack has Jim, then if Bob tags Jack, then Bob gets Jim as a target and gains one tag. My website tracks the targets and tags for each player as well as showing some leaderboards for the state of the game. Everyone in my school takes the game really seriously, so my reputation was entirely on the line. This was my only project I QA tested and deployed to a thousand people. Ultimately, the game went over smoothly although a few of my hairs fell out that week...

The addition of Firebase Cloud Functions fundamentally alters how I would create the site now. At the time, I jumped through a lot of loops to use Firebase so I wouldn't have to make my own webserver. 

Stack:
* [Firebase](https://www.firebase.google.com)
* [React](https://reactjs.org/?utm_source=feedly)
* [Material UI](https://www.material-ui.com/#/)
* [Plotly.js](https://plot.ly/plotly-js-scientific-d3-charting-library/)
* [React-PlotlyJS](https://github.com/benjeffery/react-plotlyjs)
* [ReactFire](https://github.com/firebase/reactfire) -- Now deprecated with React 16
