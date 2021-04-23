import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let time = 0;
setInterval(() => {
  time += 3;
  $('#main').html(`You've been on this page for ${time} seconds`);
}, 3000);
