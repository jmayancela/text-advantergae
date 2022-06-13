const textElement = document.getElementById('text')

const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
//textNodes is an array of objects
//The find() method returns the value of the first element that passes a test.
//The find() method executes a function for each array element.

  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  console.log(optionButtonsElement.firstChild)
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: " Is a nice sunny day for a walk a women is thinking to go outside should she go to .",
    options: [
      {
        text: 'The park with her child ',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'The mall and get new clothes for her and her child',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: ' It hot outside should the women  .',
    options: [
      {
        text: ' walk',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Take a bus or a train ',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'uber',
        nextText: 3
        
      }
    ]
  },
  {
    id: 3,
    text: 'The women gets there  .',
    options: [
      {
        text: 'She thinks in buying clothes ',
        nextText: 4
      },
      {
        text: 'Check out thing for the house',
        nextText: 5
      },
      {
        text: 'Get some ice cream ',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Suddenly the women her a loud sound it like someone shooting she beings to panic .',
    options: [
      {
        text: 'Get the baby and run',
        nextText: -1
        },
      {
        text: 'Hide somewhere and call the police for help',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'The police comes and they helps   .',
    options: [
      {
        text: 'the people that was shoot',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Her daugther is crying but the mom gave ice cream now the girl want .',
    options: [
      {
        text: 'to play in swings ',
        nextText: 7
        },
      {
        text: 'She wants to get someting to eat like food',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While she trying to calm down she calls.',
    options: [
      {
        text: 'her husband ',
        nextText: 8
      },
      {
        text: 'Her mother ',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Her sister ',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'NObody ',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'The doctor say that she good and she asks if she could take the child home and the doctos .',
    options: [
      {
        text: 'yes ',
        nextText: -1
        
          text: 'Maybe wait one more day  ',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: ' She goes home and the next she has to go to work and she calls her mother .',
    options: [
      {
        text: 'leaves to go to work',
        nextText: -1

        text: 'go other day ',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The police found the guy they arrested him now she ',
    options: [
      {
        text: 'doesnt have to be worried ',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Now everything is back to normal .',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()