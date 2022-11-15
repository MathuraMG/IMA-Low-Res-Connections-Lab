window.addEventListener('load', () => {

  //Create a new bot object
  let bot = new RiveScript();

  //Load an individual file
  bot.loadFile("hello.rive").then(loading_done).catch(loading_error);

  //Run if file loads
  function loading_done() {
    console.log("Bot has finished loading!");

    //Sort bot replies
    bot.sortReplies();
  }

  //Log error if file doesn't load
  function loading_error(error, filename, lineno) {
    console.log("Error when loading files: " + error);
  }

  //Get user input & send a reply
  let txtButton = document.getElementById('submit');
  txtButton.addEventListener('click', () => {
    // RiveScript remembers user data by their username and can tell multiple users apart
    let username = "local-user";

    //Get input from the page
    let txt = document.getElementById('txt');
    let txtValue = txt.value;
    //Send a reply
    bot.reply(username, txtValue).then(function (reply) {
      console.log("The bot says: " + reply);
      txt.value = "";
    });
  });
});


