
      let score = JSON.parse(localStorage.getItem('score')) || {
       wins : 0, losses : 0, ties : 0
      };

      updateScoreElement();

      function pickComputerMove() {

      let computerMove = '';

      const randomNumber = Math.random();

      if(randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
      }

      else if(randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
      }
       
      else {
        computerMove = 'scissors';
      }

      return computerMove;

      }

      function playGame(userMove) {

         let computerMove = pickComputerMove();
         
         let result = '';

         if (userMove === computerMove) {
            result = 'Tie';
            score.ties += 1;

         } 

         else if (
         (userMove === 'rock' && computerMove === 'scissors') ||
         (userMove === 'paper' && computerMove === 'rock') ||
         (userMove === 'scissors' && computerMove === 'paper')
         ) {
           result = 'You win';
           score.wins += 1;
         } 

         else {
          result = 'You lose';
          score.losses += 1;
         }

         localStorage.setItem('score', JSON.stringify(score));
         updateScoreElement();

         document.querySelector('.js-result').innerHTML = result;
         document.querySelector('.js-moves').innerHTML = `You <img src="/images/${userMove}-emoji.png" class="move-icon"> <img src="/images/${computerMove}-emoji.png" class="move-icon"> Computer`;

        }

        function updateScoreElement() {

          document.querySelector('.js-score').innerHTML = `Wins : ${score.wins} , Losses: ${score.losses}, Ties: ${score.ties}`;
            
        }
